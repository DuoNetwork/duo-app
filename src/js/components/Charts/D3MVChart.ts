import * as d3 from 'd3';
import { Create, Destroy, IMVData, IMVDatum } from '../../types';
// const moment = require("moment");

const marginP = { top: 40, right: 26, bottom: 25, left: 36 };
const marginM = { top: 40, right: 16, bottom: 25, left: 42 };

interface IMVChartStates {
	name: string;
	data: IMVData;
	pickedMVDatum?: (d: IMVDatum) => void;
}

export default class D3MVChart {
	public create: Create<IMVChartStates> = (el, props, state) => {
		const { name, data } = state;
		const { windowWidth, windowHeight } = props;
		let width: number, height: number;

		if (windowWidth >= 1440) {
			width = 475.2 - marginP.left - marginP.right;
		} else if (windowWidth <= 960) {
			width = 316.8 - marginP.left - marginP.right;
		} else {
			width = windowWidth * 0.33 - marginP.left - marginP.right;
		}

		height = windowHeight - marginM.top - marginM.bottom;

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
		const minDate = d3.min(data, d => {
			return Date.parse(d.date);
		});
		const maxDate = d3.max(data, d => {
			return Date.parse(d.date);
		});

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
						return d.MV;
					})
				) || 0,
			lyMax =
				d3.max(
					showedData.map(d => {
						return d.MV;
					})
				) || 0,
			lyRange = lyMax - lyMin || lyMin * 0.2;
		// Line
		const lineMV = d3
			.line<IMVDatum>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ly(d.MV);
			});
		const lineMVArea = d3
			.area<IMVDatum>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y0(height)
			.y1(d => {
				return ly(d.MV);
			});

		const showColumndata = (d: IMVDatum): void => {
			infoBar.html(
				"Date: <div class = 'Date info-column'>" +
					d3.timeFormat('%b %d')(new Date(Date.parse(d.date))) +
					"</div><div class='legend-MV'></div> Market Value: <div class = 'MV-price info-column'>" +
					d.MV.toFixed(2) +
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
				return x(new Date(Date.parse((d as IMVDatum).date))) - backrectWidth / 2;
			})
			.attr('y', 0)
			.attr('width', backrectWidth)
			.attr('height', height)
			.on('mousemove', (d: {}) => {
				showColumndata(d as IMVDatum);
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
	};
	/*
	public update: Update<IMVChartStates> = (el, props, state) => {};
	*/
	public destroy: Destroy = el => {
		d3.select(el).remove();
	};
}
