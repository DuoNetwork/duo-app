import { IPrice } from '@finbook/duo-market-data';
import * as d3 from 'd3';
import loadingImg from 'images/loadingDUO.png';
import moment from 'moment';
import * as React from 'react';
import { ColorStyles } from 'ts/common/styles';

const margin = { top: 40, right: 34, bottom: 23, left: 32 };
const width = 728 - margin.left - margin.right;
const height = 380 - margin.top - margin.bottom;

function drawLines(el: Element, prices: IPrice[]) {
	console.log(prices);
	const dataLoaded = prices.length;
	if (!dataLoaded) {
		d3.selectAll('.loading').remove();
		d3.select(el)
			.append('div')
			.attr('class', 'loading')
			.html('<span>Loading...</span><img class="loading-img" src="' + loadingImg + '" />');
		return;
	}
	const timeStep = prices[0].period * 60000;
	console.log(moment(prices[0].timestamp).format('MM/DD/YYYY hh:ss'));
	console.log(moment(prices[prices.length - 1].timestamp).format('MM/DD/YYYY hh:ss'));
	//Establish SVG Playground
	d3.selectAll('.loading').remove();
	d3.selectAll('#timeserieschart').remove();
	d3.select(el)
		.append('svg')
		.attr('id', 'timeserieschart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	//Date Range
	const formatString = (step: number, date: number) => {
		switch (step) {
			case 300000:
				return 'HH:mm';
			default:
				return moment(date).format('HH') === '00' ? 'MM-DD' : 'hh a';
		}
	};
	const zoomFormat = (date: number) => moment(date).format(formatString(timeStep, date));
	const maxDate = d3.max([prices[0].timestamp]) || 0;
	const minDate = d3.min([prices[prices.length - 1].timestamp]) || 0;

	//Time Scale
	const xStart = minDate;
	const xEnd = maxDate + 2 * timeStep;
	const xScale = d3
		.scaleTime()
		.domain([xStart, xEnd])
		.range([0, width]);
	//Data Range (ETH price)
	const maxPrice = d3.max(prices.map(d => d.high)) || 0;

	const minPrice = d3.min(prices.map(d => d.low)) || 0;

	const rangeTop = maxPrice + 0.1 * (maxPrice - minPrice);
	const rangeBottom = d3.max([0, minPrice - 0.2 * (maxPrice - minPrice)]) || 0;

	//ETH Linear YScale
	const ethYScale = d3
		.scaleLinear()
		.domain([rangeBottom, rangeTop])
		.range([height, 0]);
	//Volumn Linear YScale
	//Axis
	const xAxis = d3
		.axisBottom(xScale)
		.ticks(6)
		.tickFormat(zoomFormat as any);
	const lyAxis = d3.axisLeft(ethYScale).ticks(5);
	//Grid
	const xGrid = d3
		.axisBottom(xScale)
		.ticks(8)
		.tickSize(-height)
		.tickFormat(() => '');
	const yGrid = d3
		.axisLeft(ethYScale)
		.ticks(10)
		.tickSize(-width)
		.tickFormat(() => '');
	//Lines
	const lineETH = d3
		.line<any>()
		.x(d => xScale(d.timestamp))
		.y(d => ethYScale(d.close));
	//Chart
	const chart = d3
		.select(el)
		.select('#timeserieschart')
		.append('g')
		.attr('class', 'graph-area')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	const aX = chart
		.append('g')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis as any);
	aX.selectAll('text').style('text-anchor', 'middle');
	chart
		.append('g')
		.attr('class', 'ly-axis')
		.call(lyAxis as any);
	chart
		.append('defs')
		.append('clipPath')
		.attr('id', 'clip')
		.append('rect')
		.attr('x', 1)
		.attr('y', 0)
		.attr('width', width - 1)
		.attr('height', height);
	chart
		.append('g')
		.attr('class', 'grid')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xGrid as any);
	chart
		.append('g')
		.attr('class', 'grid')
		.call(yGrid as any);
	// Chart Data
	const chartdata = chart
		.append('g')
		.attr('class', 'chart-data')
		.attr('clip-path', 'url(#clip)');
	//Draw ETH Line
	chartdata
		.append('path')
		.attr('class', 'line-custodian-eth ')
		.datum(prices)
		.attr('d', lineETH)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.ThemeText)
		.attr('stroke-width', 1.5);
	// //Overlay layer
	// const overlay = svg
	// 	.append('rect')
	// 	.attr('class', 'overlay')
	// 	.attr('width', width)
	// 	.attr('height', height)
	// 	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	// 	.attr('fill', 'transparent')
	// 	.on('mouseover', drawAssisLine)
	// 	.on('mouseout', deleteAssisLine)
	// 	.on('mousemove', mousemove);
	// //Legend bar
	// const legendBar = svg.append('g').attr('class', 'legend-bar');
	// legendBar
	// 	.append('text')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(37, 27.5)')
	// 	.text('O:');
	// legendBar
	// 	.append('text')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(82, 27.5)')
	// 	.text('H:');
	// legendBar
	// 	.append('text')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(127, 27.5)')
	// 	.text('L:');
	// legendBar
	// 	.append('text')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(169, 27.5)')
	// 	.text('C:');
	// legendBar
	// 	.append('text')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(211, 27.5)')
	// 	.text('Vol:');

	// const sourceLegend = legendBar.append('g').attr('class', 'source-legend');
	// sourceLegend
	// 	.append('text')
	// 	.attr('class', 'source-legend-text-open')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(48, 27.5)')
	// 	.text('');
	// sourceLegend
	// 	.append('text')
	// 	.attr('class', 'source-legend-text-high')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(93, 27.5)')
	// 	.text('');
	// sourceLegend
	// 	.append('text')
	// 	.attr('class', 'source-legend-text-low')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(137, 27.5)')
	// 	.text('');
	// sourceLegend
	// 	.append('text')
	// 	.attr('class', 'source-legend-text-close')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(179, 27.5)')
	// 	.text('');
	// sourceLegend
	// 	.append('text')
	// 	.attr('class', 'source-legend-text-vol')
	// 	.attr('fill', ColorStyles.ThemeText)
	// 	.attr('font-size', 10)
	// 	.attr('font-family', 'Roboto')
	// 	.attr('transform', 'translate(228, 27.5)')
	// 	.text('');

	// function drawAssisLine() {
	// 	const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
	// 	const yPosL = ethYScale.invert(d3.mouse(overlay.node() as any)[1]);
	// 	svg.append('path')
	// 		.attr('class', 'assist-line-x')
	// 		.attr('d', () => {
	// 			return line([
	// 				{ x: margin.left, y: ethYScale(yPosL) + margin.top },
	// 				{
	// 					x: width + margin.left,
	// 					y: ethYScale(yPosL) + margin.top
	// 				}
	// 			]);
	// 		})
	// 		.attr('stroke', ColorStyles.BorderBlack4)
	// 		.attr('stroke-width', 1);
	// 	svg.append('path')
	// 		.attr('class', 'assist-line-y')
	// 		.attr('d', () => {
	// 			return line([
	// 				{ x: xScale(xPos) + margin.left, y: margin.top },
	// 				{
	// 					x: xScale(xPos) + margin.left,
	// 					y: height + margin.top
	// 				}
	// 			]);
	// 		})
	// 		.attr('stroke', ColorStyles.BorderBlack4)
	// 		.attr('stroke-width', 1);
	// 	const lyAxisBox = svg.append('g').attr('class', 'ly-axis-box');
	// 	const xAxisBox = svg.append('g').attr('class', 'x-axis-box');
	// 	lyAxisBox
	// 		.append('rect')
	// 		.attr('class', 'ly-axis-box-rect')
	// 		.attr('x', margin.left)
	// 		.attr('y', ethYScale(yPosL) + margin.top)
	// 		.attr('width', 28)
	// 		.attr('height', 18)
	// 		.attr('transform', 'translate(-31, -9)')
	// 		.style('fill', ColorStyles.CardBackgroundSolid)
	// 		.style('stroke', ColorStyles.ThemeText);
	// 	lyAxisBox
	// 		.append('text')
	// 		.attr('class', 'ly-axis-box-text')
	// 		.attr('transform', 'translate(6,' + (ethYScale(yPosL) + margin.top + 4) + ')')
	// 		.attr('fill', ColorStyles.ThemeText)
	// 		.attr('font-size', 10)
	// 		.attr('font-family', 'Roboto')
	// 		.text(d3.format(',.0f')(yPosL));
	// 	xAxisBox
	// 		.append('rect')
	// 		.attr('class', 'x-axis-box-rect')
	// 		.attr('x', xScale(xPos) + margin.left)
	// 		.attr('y', height + margin.top)
	// 		.attr('width', 40)
	// 		.attr('height', 16)
	// 		.attr('transform', 'translate(-20, 3)')
	// 		.style('fill', ColorStyles.CardBackgroundSolid)
	// 		.style('stroke', ColorStyles.ThemeText);
	// 	xAxisBox
	// 		.append('text')
	// 		.attr('class', 'x-axis-box-text')
	// 		.attr(
	// 			'transform',
	// 			'translate(' +
	// 				(xScale(xPos) + margin.left - 13) +
	// 				', ' +
	// 				(height + margin.top + 14.5) +
	// 				')'
	// 		)
	// 		.attr('fill', ColorStyles.ThemeText)
	// 		.attr('font-size', 10)
	// 		.attr('font-family', 'Roboto')
	// 		.text(moment(xPos).format('HH:mm'));
	// }
	// function deleteAssisLine() {
	// 	d3.selectAll('.assist-line-x').remove();
	// 	d3.selectAll('.assist-line-y').remove();
	// 	d3.selectAll('.x-axis-box').remove();
	// 	d3.selectAll('.ly-axis-box').remove();
	// 	d3.selectAll('.source-legend-text-open').text('');
	// 	d3.selectAll('.source-legend-text-high').text('');
	// 	d3.selectAll('.source-legend-text-low').text('');
	// 	d3.selectAll('.source-legend-text-close').text('');
	// 	d3.selectAll('.source-legend-text-vol').text('');
	// }
	// function moveAssisLine() {
	// 	const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
	// 	const yPosL = ethYScale.invert(d3.mouse(overlay.node() as any)[1]);
	// 	d3.selectAll('.assist-line-x').attr('d', () => {
	// 		return line([
	// 			{ x: 0 + margin.left, y: ethYScale(yPosL) + margin.top },
	// 			{
	// 				x: width + margin.left,
	// 				y: ethYScale(yPosL) + margin.top
	// 			}
	// 		]);
	// 	});
	// 	d3.selectAll('.assist-line-y').attr('d', () => {
	// 		return line([
	// 			{ x: xScale(xPos) + margin.left, y: margin.top },
	// 			{
	// 				x: xScale(xPos) + margin.left,
	// 				y: height + margin.top
	// 			}
	// 		]);
	// 	});
	// 	d3.selectAll('.x-axis-box-rect')
	// 		.attr('x', xScale(xPos) + margin.left)
	// 		.attr('y', height + margin.top);
	// 	d3.selectAll('.x-axis-box-text')
	// 		.attr(
	// 			'transform',
	// 			'translate(' +
	// 				(xScale(xPos) + margin.left - 13) +
	// 				', ' +
	// 				(height + margin.top + 14.5) +
	// 				')'
	// 		)
	// 		.text(moment(xPos).format('HH:mm'));
	// 	d3.selectAll('.ly-axis-box-rect')
	// 		.attr('x', margin.left)
	// 		.attr('y', ethYScale(yPosL) + margin.top);
	// 	d3.selectAll('.ly-axis-box-text')
	// 		.attr('transform', 'translate(6,' + (ethYScale(yPosL) + margin.top + 4) + ')')
	// 		.text(d3.format(',.0f')(yPosL));
	// }
	// function mousemove() {
	// 	const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
	// 	findBar(xPos);
	// 	moveAssisLine();
	// }
	// function findBar(x: number) {
	// 	d3.selectAll('.source-legend-text-open').text('');
	// 	d3.selectAll('.source-legend-text-high').text('');
	// 	d3.selectAll('.source-legend-text-low').text('');
	// 	d3.selectAll('.source-legend-text-close').text('');
	// 	d3.selectAll('.source-legend-text-vol').text('');
	// 	prices.forEach(item => {
	// 		if (item.timestamp < x && x < item.timestamp + timeStep) {
	// 			d3.selectAll('.source-legend-text-open').text(d3.format(',.1f')(item.open));
	// 			d3.selectAll('.source-legend-text-high').text(d3.format(',.1f')(item.high));
	// 			d3.selectAll('.source-legend-text-low').text(d3.format(',.1f')(item.low));
	// 			d3.selectAll('.source-legend-text-close').text(d3.format(',.1f')(item.close));
	// 			d3.selectAll('.source-legend-text-vol').text(d3.format(',.1f')(item.volume));
	// 		}
	// 	});
	// 	d3.selectAll('.custodian-eth-legend-text').text('');
	// 	d3.selectAll('.custodian-tokenA-legend-text').text('');
	// 	d3.selectAll('.custodian-tokenB-legend-text').text('');
	// }
}

interface IProps {
	prices: IPrice[];
}

export default class TimeSeriesChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props: IProps) {
		super(props);
		this.chartRef = React.createRef();
	}

	public componentDidMount() {
		const { prices } = this.props;
		drawLines(this.chartRef.current as Element, prices);
	}

	public shouldComponentUpdate(nextProps: IProps) {
		const { prices } = nextProps;
		if (JSON.stringify(prices) !== JSON.stringify(this.props.prices))
			drawLines(this.chartRef.current as Element, prices);

		return false;
	}

	public render() {
		//const { keys } = this.props;
		return <div className="chart-wrapper" ref={this.chartRef} />;
	}
}
