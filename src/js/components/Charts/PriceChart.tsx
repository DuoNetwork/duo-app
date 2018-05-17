import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import { ITimeSeries, ITimeSeriesData } from '../../types';

const marginP = { top: 40, right: 26, bottom: 25, left: 36 };

const create = (
	el: Element,
	windowHeight: number,
	name: string,
	timeseries: ITimeSeries[]
) => {
	if (!timeseries.length) return;

	const width = 475.2 - marginP.left - marginP.right;
	const height = windowHeight - marginP.top - marginP.bottom;

	d3.selectAll('#chart-' + name).remove();
	d3.selectAll('.info-bar-' + name).remove();
	d3
		.select(el)
		.append('svg')
		.attr('id', 'chart-' + name)
		.attr('width', width + marginP.left + marginP.right)
		.attr('height', height + marginP.top + marginP.bottom);
	// Zoom step
	const zoomStep = 8.64e7;
	const zoomFormat = date => {
		return d3.timeFormat('%b %d')(date);
	};

	// Date range
	let minDate = timeseries[0].data[0].datetime;
	let maxDate = timeseries[0].data[0].datetime;
	timeseries.forEach(ts => {
		minDate = d3.min([minDate, d3.min(ts.data, d => d.datetime) || 0]) || 0;
		maxDate = d3.max([maxDate, d3.max(ts.data, d => d.datetime) || 0]) || 0;
	});

	const currentDate = moment(minDate);
	// const allDates: Array<{x: number, y: number}> = [];
	const allDates: number[] = [];
	do {
		// allDates.push({x: currentDate.valueOf(), y: 0});
		allDates.push(currentDate.valueOf());
		currentDate.add(1, 'd');
	} while (currentDate.valueOf() <= maxDate);

	const start = new Date(minDate || 0 - zoomStep * 2);
	const end = new Date(maxDate || 0 + zoomStep * 2);

	// Scales
	const xScale = d3
		.scaleTime()
		.domain([start, end])
		.range([0, width]);
	const backrectWidth = xScale(new Date('2000-01-02')) - xScale(new Date('2000-01-01'));

	let lyMin = 0;
	let lyMax = 0;
	let ryMin = 0;
	let ryMax = 0;
	let hasRightAxis = false;
	timeseries.forEach(ts => {
		if (!ts.rightAxis) {
			lyMin = d3.min([lyMin, d3.min(ts.data, d => d.value) || 0]) || 0;
			lyMax = d3.max([lyMax, d3.max(ts.data, d => d.value) || 0]) || 0;
		} else {
			hasRightAxis = true;
			ryMin = d3.min([ryMin, d3.min(ts.data, d => d.value) || 0]) || 0;
			ryMax = d3.max([ryMax, d3.max(ts.data, d => d.value) || 0]) || 0;
		}
	});

	const lyRange = lyMax - lyMin || lyMin * 0.2;
	const ryRange = ryMax - ryMin || ryMin * 0.2;
	const nslyMax = lyMax + lyRange / 2;
	const nslyMin = lyMin - lyRange / 2 > 0 ? lyMin - lyRange / 2 : 0;
	const nslyRange = lyRange * 2;
	// Line
	const lineLeft = d3
		.line<ITimeSeriesData>()
		.x(d => xScale(new Date(d.datetime)))
		.y(d => ly(d.value));
	const lineRight = d3
		.line<ITimeSeriesData>()
		.x(d => xScale(new Date(d.datetime)))
		.y(d => ry(d.value));

	const ly = d3
		.scaleLinear()
		.domain([
			nslyMin - 0.2 * nslyRange > 0 ? nslyMin - 0.2 * nslyRange : 0,
			nslyMax + 0.2 * nslyRange
		])
		.range([height, 0]);
	const ry = d3
		.scaleLinear()
		.domain([ryMin - 0.2 * ryRange > 0 ? ryMin - 0.2 * ryRange : 0, ryMax + 0.2 * ryRange])
		.range([height, 0]);

	const xAxis = d3
		.axisBottom(xScale)
		.ticks(5)
		.tickFormat(zoomFormat);

	const lyAxis = d3.axisLeft(ly).ticks(5);
	const ryAxis = d3.axisRight(ry).ticks(5);

	// Chart
	const chart = d3
		.select(el)
		.select('#chart-' + name)
		.append('g')
		.attr('class', 'graph-area-' + name)
		.attr('transform', 'translate(' + marginP.left + ',' + marginP.top + ')');
	const aX = chart
		.append('g')
		.attr('class', 'x-axis-' + name)
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis as any);
	aX.selectAll('text').style('text-anchor', 'middle');
	//const laY =
	chart
		.append('g')
		.attr('class', 'ly-axis-' + name)
		.call(lyAxis as any);
	if (hasRightAxis) {
		const raY = chart
			.append('g')
			.attr('class', 'ry-axis-' + name)
			.attr('transform', 'translate(' + width + ', 0)')
			.call(ryAxis as any);
		raY.selectAll('text').style('text-anchor', 'start');
	}

	const chartdata = chart.append('g').attr('class', 'chart-data');

	chartdata
		.selectAll('g')
		.data(allDates)
		.enter()
		.append('g')
		.attr('class', 'single-bar-' + name);
	const bars = chartdata.selectAll('g');
	bars
		.data(allDates)
		.exit()
		.remove();
	// Bar Backgrounds
	//const barBackground =
	bars
		.append('rect')
		.attr('class', 'bar-background')
		.attr('x', d => xScale(d as number) - backrectWidth / 2)
		.attr('y', 0)
		.attr('width', backrectWidth)
		.attr('height', height);

	timeseries.forEach(ts => {
		if (!ts.dotOnly) {
			chartdata
				.append('path')
				.attr('class', 'line-' + ts.name)
				.datum(ts.data)
				.attr('d', ts.rightAxis ? lineRight : lineLeft)
				.attr('fill', 'none')
				.attr('stroke-linejoin', 'round')
				.attr('stroke-linecap', 'round')
				.attr(
					'stroke',
					ts.color
						? 'rgba(' + ts.color + (ts.highlight >= 0 ? ',0.15)' : ',0.7)')
						: 'white'
				)
				.attr('stroke-width', ts.width || 1);
			if (ts.highlight >= 0)
				chartdata
					.append('path')
					.attr('class', 'line-' + ts.name + '_move')
					.datum(ts.data.slice(0, ts.highlight + 1))
					.attr('d', ts.rightAxis ? lineRight : lineLeft)
					.attr('fill', 'none')
					.attr('stroke-linejoin', 'round')
					.attr('stroke-linecap', 'round')
					.attr('stroke', ts.color ? 'rgba(' + ts.color + ',0.7)' : 'white')
					.attr('stroke-width', ts.width || 1);
		} else {
			const resetData = chart.append('g').attr('class', 'dot-data-' + ts.name);
			resetData
				.selectAll('g')
				.data(ts.data)
				.enter()
				.append('g')
				.attr('class', 'single-bar-' + ts.name);
			const resetBars = resetData.selectAll('g');
			resetBars
				.data(ts.data)
				.exit()
				.remove();
			resetBars
				.append('circle')
				.attr('class', 'dot-' + ts.name)
				.attr('cx', d => xScale(new Date((d as ITimeSeriesData).datetime)))
				.attr('cy', () => ry(1))
				.attr('r', ts.width || 2)
				.attr('stroke', 'none')
				.attr('fill', ts.color || 'white');
		}
	});
};

interface IProps {
	name: string;
	timeseries: ITimeSeries[];
}

interface IState {
	windowWidth: number;
	windowHeight: number;
}

export default class PriceChart extends React.Component<IProps, IState> {
	private chartRef: any;
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
		this.chartRef = React.createRef();
	}

	// public updateDimensions() {
	// 	this.setState({
	// 		windowWidth: window.innerWidth,
	// 		windowHeight: window.innerHeight
	// 	});
	// }

	public componentDidMount() {
		const { name, timeseries } = this.props;
		// const el = ReactDOM.findDOMNode(this) as Element;
		create(this.chartRef.current as Element, 300, name, timeseries);
		//window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	// public componentWillUnmount() {
	// 	window.removeEventListener('resize', this.updateDimensions.bind(this));
	// }

	public shouldComponentUpdate(nextProps: IProps) {
		if (JSON.stringify(nextProps.timeseries) !== JSON.stringify(this.props.timeseries)) {
			const { name, timeseries } = this.props;
			// redraw when data is changed
			// const el = ReactDOM.findDOMNode(this) as Element;
			create(this.chartRef.current as Element, 300, name, timeseries);
		}

		return false;
	}

	public render() {
		const { name } = this.props;
		return <div id={'trade-chart-' + name} ref={this.chartRef}/>;
	}
}
