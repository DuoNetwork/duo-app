import * as d3 from 'd3';
import * as React from 'react';
import { ITimeSeriesData } from '../../types';
// const moment = require('moment');

const marginP = { top: 40, right: 26, bottom: 25, left: 36 };
const marginM = { top: 40, right: 16, bottom: 25, left: 42 };

function create(
	el: Element,
	props: { windowWidth: number; windowHeight: number },
	state: {
		name: string;
		data: ITimeSeriesData[];
		pickedMVDatum?: (d: ITimeSeriesData) => void;
	}
) {
	const { name, data } = state;
	const { windowHeight } = props;
	const width = 475.2 - marginP.left - marginP.right;
	const height = windowHeight - marginM.top - marginM.bottom;

	d3.selectAll('#chart-' + name).remove();
	d3.selectAll('.info-bar-' + name).remove();
	d3
		.select(el)
		.append('svg')
		.attr('id', 'chart-' + name)
		.attr('width', width + marginM.left + marginM.right)
		.attr('height', height + marginM.top + marginM.bottom);
	// Zoom step
	const zoomStep = 8.64e7;
	const zoomFormat = date => {
		return d3.timeFormat('%b %d')(date);
	};
	//const zoomFormatTips = '%Y %b %d';
	//const pickFormat = '%b %d';

	// Date range
	const minDate = d3.min(data, d => d.datetime);
	const maxDate = d3.max(data, d => d.datetime);

	//const extentStart = new Date(minDate || 0 - zoomStep * 2);
	//const extentEnd = new Date(maxDate || 0 + zoomStep * 7);
	const start = new Date(minDate || 0 - zoomStep * 2);
	const end = new Date(maxDate || 0 + zoomStep * 2);
	//const xExtent = d3.extent([extentStart, extentEnd]);

	// Scales
	const x = d3
		.scaleTime()
		.domain([start, end])
		.range([0, width]);
	const backrectWidth = x(new Date('2000-01-02')) - x(new Date('2000-01-01'));
	const showedData = data.filter(() => {
		//const border = data.length - 32 > 0 ? data.length - 32 : 0;
		return true;
	});

	const lyMin =
			d3.min(
				showedData.map(d => {
					return d.value;
				})
			) || 0,
		lyMax =
			d3.max(
				showedData.map(d => {
					return d.value;
				})
			) || 0,
		lyRange = lyMax - lyMin || lyMin * 0.2;
	// Line
	const lineMV = d3
		.line<ITimeSeriesData>()
		.x(d => {
			return x(new Date(d.datetime));
		})
		.y(d => {
			return ly(d.value);
		});
	const lineMVArea = d3
		.area<ITimeSeriesData>()
		.x(d => {
			return x(new Date(d.datetime));
		})
		.y0(height)
		.y1(d => {
			return ly(d.value);
		});

	const showColumndata = (d: ITimeSeriesData): void => {
		infoBar.html(
			"Date: <div class = 'Date info-column'>" +
				d3.timeFormat('%b %d')(new Date(d.datetime)) +
				"</div><div class='legend-MV'></div> Market Value: <div class = 'MV-price info-column'>" +
				d.value.toFixed(2) +
				'</div>'
		);
	};

	const ly = d3
		.scaleLinear()
		.domain([lyMin - 0.2 * lyRange > 0 ? lyMin - 0.2 * lyRange : 0, lyMax + 0.2 * lyRange])
		.range([height, 0]);

	const xAxis = d3
		.axisBottom(x)
		.ticks(5)
		.tickFormat(zoomFormat);

	const lyAxis = d3.axisLeft(ly).ticks(5);

	// Infor Bars
	const infoBar = d3
		.select(el)
		.append('div')
		.attr('class', 'info-bar-' + name)
		.html(
			"Date: <div class = 'Date info-column'> </div><div class='legend-MV'></div> Market Value:<div class = 'MV-price info-column'></div>"
		);

	// Chart
	const chart = d3
		.select(el)
		.select('#chart-' + name)
		.append('g')
		.attr('class', 'graph-area-' + name)
		.attr('transform', 'translate(' + marginM.left + ',' + marginM.top + ')');
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

	// Chart Data
	chart
		.append('defs')
		.append('clipPath')
		.attr('id', 'clip')
		.append('rect')
		.attr('x', 1)
		.attr('y', 0)
		.attr('width', width - 1)
		.attr('height', height);
	const chartdata = chart
		.append('g')
		.attr('class', 'chart-data')
		.attr('clip-path', 'url(#clip)');

	chartdata
		.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'single-bar-' + name);
	const bars = chartdata.selectAll('g');
	bars
		.data(data)
		.exit()
		.remove();

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
		.attr('style', 'stop-color:rgba(0, 178, 255, 0.5); stop-opacity:0.5;');
	gradient
		.append('stop')
		.attr('offset', '100%')
		.attr('style', 'stop-color:rgba(255, 255, 255, 0); stop-opacity:0;');

	// Bar Backgrounds
	//const barBackground =
	bars
		.append('rect')
		.attr('class', 'bar-background')
		.attr('x', (d: {}) => {
			return x(new Date((d as ITimeSeriesData).datetime)) - backrectWidth / 2;
		})
		.attr('y', 0)
		.attr('width', backrectWidth)
		.attr('height', height)
		.on('mousemove', (d: {}) => {
			showColumndata(d as ITimeSeriesData);
		});
	// Lines
	//const graphLineMV =
	chartdata
		.append('path')
		.attr('class', 'line-MV')
		.datum(data)
		.attr('d', lineMV)
		.attr('fill', 'none')
		.attr('stroke', 'rgba(255,255,255,0.8)')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke-width', 1.5);
	//const graphLineMV_fill =
	chartdata
		.append('path')
		.attr('class', 'line-MV-area')
		.datum(data)
		.attr('d', lineMVArea)
		.attr('stroke', 'none')
		.attr('fill', 'url(#svgGradient)');
}

interface IProps {
	name: string;
	data: ITimeSeriesData[];
}

interface IState {
	windowWidth: number;
	windowHeight: number;
}

export default class MVChart extends React.Component<IProps, IState> {
	private chartRef: any;
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
		this.chartRef = React.createRef();
	}

	public getChartStates() {
		return {
			name: this.props.name,
			data: this.props.data,
		};
	}

	// public updateDimensions() {
	// 	this.setState({
	// 		windowWidth: window.innerWidth,
	// 		windowHeight: window.innerHeight
	// 	});
	// }

	public componentDidMount() {
		// const el = ReactDOM.findDOMNode(this) as Element;
		create(
			this.chartRef.current as Element,
			{
				windowWidth: this.state.windowWidth,
				windowHeight: 300
			},
			this.getChartStates()
		);
		// window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	// public componentWillUnmount() {
	// 	window.removeEventListener('resize', this.updateDimensions.bind(this));
	// }

	public shouldComponentUpdate(nextProps: IProps) {
		if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
			// redraw when data is changed
			// const el = ReactDOM.findDOMNode(this) as Element;
			create(
				this.chartRef.current as Element,
				{
					windowWidth: this.state.windowWidth,
					windowHeight: 300
				},
				{
					name: nextProps.name,
					data: nextProps.data,
				}
			);
			return false;
		}
		return false;
	}

	public render() {
		const { name } = this.props;
		return <div id={'trade-chart-' + name} ref={this.chartRef}/>;
	}
}
