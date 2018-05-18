import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import { ITimeSeries, ITimeSeriesData } from '../../types';

const margin = { top: 40, right: 26, bottom: 25, left: 36 };

function create(
	el: Element,
	windowHeight: number,
	name: string,
	timeseries: ITimeSeries[],
	showArea: boolean = false
) {
	if (!timeseries.length) return;

	const width = 475.2 - margin.left - margin.right;
	const height = windowHeight - margin.top - margin.bottom;

	d3.selectAll('#chart-' + name).remove();
	d3.selectAll('.info-bar-' + name).remove();
	d3
		.select(el)
		.append('svg')
		.attr('id', 'chart-' + name)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);
	// Zoom step
	const zoomStep = 8.64e7;
	const zoomFormat = date => {
		return d3.timeFormat('%b %d')(date);
	};

	// Date range
	let minDate = timeseries[0].data[0].datetime;
	let maxDate = timeseries[0].data[0].datetime;
	timeseries.forEach((ts, index) => {
		if (index && showArea) return;
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

	let lyMin = Number.MAX_SAFE_INTEGER;
	let lyMax = Number.MIN_SAFE_INTEGER;
	let ryMin = Number.MAX_SAFE_INTEGER;
	let ryMax = Number.MIN_SAFE_INTEGER;
	let hasRightAxis = false;
	timeseries.forEach((ts, index) => {
		if (index && showArea) return;

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
	// const nslyMax = lyMax; //(lyMax + lyMin) / 2 + lyRange / 2 * leftRightRatio;
	// const nslyMin = lyMin; //Math.max((lyMax + lyMin) / 2 - lyRange / 2 * leftRightRatio, 0);
	// const nslyRange = lyRange * 2;

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
		.domain(
			//hasRightAxis
				//? [Math.max(nslyMin - 0.2 * nslyRange, 0), nslyMax + 0.2 * nslyRange]
				//:
				[lyMin - 0.2 * lyRange > 0 ? lyMin - 0.2 * lyRange : 0, lyMax + 0.2 * lyRange]
		)
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

	// Chart
	const chart = d3
		.select(el)
		.select('#chart-' + name)
		.append('g')
		.attr('class', 'graph-area-' + name)
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
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
		const ryAxis = d3.axisRight(ry).ticks(5);
		const raY = chart
			.append('g')
			.attr('class', 'ry-axis-' + name)
			.attr('transform', 'translate(' + width + ', 0)')
			.call(ryAxis as any);
		raY.selectAll('text').style('text-anchor', 'start');
	}
	// Chart Data
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
		.attr('height', height)

	timeseries.forEach((ts, index) => {
		if (index && showArea) return;

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
			if (showArea) {
				const area = d3
					.area<ITimeSeriesData>()
					.x(d => xScale(new Date(d.datetime)))
					.y0(height)
					.y1(d => ly(d.value));

				// Gradient fill
				const defs = chartdata.append('defs');
				const gradient = defs
					.append('linearGradient')
					.attr('id', 'svgGradient')
					.attr('spreadMethod', 'pad')
					.attr('x1', '0%')
					.attr('x2', '0%')
					.attr('y1', '0%')
					.attr('y2', '100%');
				gradient
					.append('stop')
					.attr('offset', '0%')
					.attr(
						'style',
						'stop-color:rgba(' + (ts.areaColor || 'blue') + ', 0.5); stop-opacity:0.5;'
					);
				gradient
					.append('stop')
					.attr('offset', '100%')
					.attr(
						'style',
						'stop-color:rgba(' + (ts.color || 'white') + ', 0); stop-opacity:0;'
					);
				chartdata
					.append('path')
					.attr('class', 'line-' + ts.name + '-area')
					.datum(ts.data)
					.attr('d', area)
					.attr('stroke', 'none')
					.attr('fill', 'url(#svgGradient)');
			} else if (ts.highlight >= 0)
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
			const dotData = chart.append('g').attr('class', 'dot-data-' + ts.name);
			dotData
				.selectAll('g')
				.data(ts.data)
				.enter()
				.append('g')
				.attr('class', 'single-bar-' + ts.name);
			const dotBars = dotData.selectAll('g');
			dotBars
				.data(ts.data)
				.exit()
				.remove();
			dotBars
				.append('circle')
				.attr('class', 'dot-' + ts.name)
				.attr('cx', d => xScale(new Date((d as ITimeSeriesData).datetime)))
				.attr('cy', () => ry(1))
				.attr('r', ts.width || 2)
				.attr('stroke', 'none')
				.attr('fill', ts.color || 'white');
		}
	});
}

interface IProps {
	name: string;
	timeseries: ITimeSeries[];
	showArea?: boolean;
}

interface IState {
	windowWidth: number;
	windowHeight: number;
}

export default class TimeSeriesChart extends React.Component<IProps, IState> {
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
		const { name, timeseries, showArea } = this.props;
		create(this.chartRef.current as Element, 300, name, timeseries, !!showArea);
		// window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	// public componentWillUnmount() {
	// 	window.removeEventListener('resize', this.updateDimensions.bind(this));
	// }

	public shouldComponentUpdate(nextProps: IProps) {
		if (JSON.stringify(nextProps.timeseries) !== JSON.stringify(this.props.timeseries)) {
			const { name, timeseries, showArea } = nextProps;
			// redraw when data is changed
			create(this.chartRef.current as Element, 300, name, timeseries, !!showArea);
		}
		return false;
	}

	public render() {
		const { name } = this.props;
		return <div id={'trade-chart-' + name} ref={this.chartRef} />;
	}
}
