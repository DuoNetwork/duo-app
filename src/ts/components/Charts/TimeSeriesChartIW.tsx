import { IPrice } from '@finbook/duo-market-data';
import * as d3 from 'd3';
import loadingImg from 'images/loadingDUO.png';
import moment from 'moment';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
import { ColorStyles } from 'ts/common/styles';

const margin = { top: 24, right: 12, bottom: 23, left: 26 };
const width = 728 - margin.left - margin.right;
const height = 380 - margin.top - margin.bottom;

function drawLines(
	el: Element,
	prices: IPrice[],
	phase: number,
	locale: string,
	boundaries: number[]
) {
	const dataLoaded = prices.length;
	if (!dataLoaded || phase === 0) {
		d3.selectAll('.loading').remove();
		d3.select(el)
			.append('div')
			.attr('class', 'loading')
			.html('<span>Loading...</span><img class="loading-img" src="' + loadingImg + '" />');
		return;
	}
	const timeStep = prices[0].period * 60000;
	//Establish SVG Playground
	d3.selectAll('.loading').remove();
	d3.selectAll('#timeserieschart').remove();
	d3.select(el)
		.append('svg')
		.attr('id', 'timeserieschart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	//Date Range
	const formatString = (date: number) => {
		return moment(date).format('HH') === '00' ? 'MM-DD' : 'HH:mm';
	};
	const zoomFormat = (date: number) => moment(date).format(formatString(date));
	const today = moment.utc().format('YYYY-MM-DD');
	const tommorow = moment.utc(today, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
	let startTime = 0,
		endTime = 0;
	if (phase === 1 || phase === 3) {
		startTime = moment.utc(`${today} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf() - timeStep * 2;
		endTime = moment.utc(`${today} 13:30:00`, 'YYYY-MM-DD HH:mm:ss').valueOf();
	} else {
		startTime = moment.utc(`${today} 11:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf() - timeStep * 2;
		endTime =
			moment.utc(`${tommorow} 01:30:00`, 'YYYY-MM-DD HH:mm:ss').valueOf() + timeStep * 5;
	}
	//Time Scale
	const xStart = startTime;
	const xEnd = endTime;
	const xScale = d3
		.scaleTime()
		.domain([xStart, xEnd])
		.range([0, width]);
	const showingSet = prices.filter(price => {
		return price.timestamp > startTime - 60000 * 30;
	});
	//Data Range (ETH price)
	const maxPrice = d3.max(showingSet.map(d => d.high)) || 0;

	const minPrice = d3.min(showingSet.map(d => d.low)) || 0;

	const rangeTop = maxPrice * (1 + boundaries[0]) + (maxPrice - minPrice) * 0.07;
	const rangeBottom = d3.max([0, (minPrice * (1 - boundaries[1]) - (maxPrice - minPrice) * 0.07)]) || 0;

	//ETH Linear YScale
	const ethYScale = d3
		.scaleLinear()
		.domain([rangeBottom, rangeTop])
		.range([height, 0]);
	//Volumn Linear YScale
	//Axis
	const xAxis = d3
		.axisBottom(xScale)
		.ticks(12)
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
	const line = d3
		.line<any>()
		.x(d => {
			return d.x;
		})
		.y(d => {
			return d.y;
		});

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
	//Draw Phase Line
	if (phase === 1 || phase === 3) {
		const phaseLines = chart.append('g').attr('class', 'phase1-lines');
		phaseLines
			.append('path')
			.attr('class', 'phase1-line-settlestart dashed')
			.attr('d', () => {
				return line([
					{
						x:
							xScale(
								moment.utc(`${today} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: height
					},
					{
						x:
							xScale(
								moment.utc(`${today} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: 0
					}
				]);
			})
			.attr('stroke', ColorStyles.MainColorAlphaL)
			.attr('stroke-width', 1);
		phaseLines
			.append('path')
			.attr('class', 'phase1-line-settlestart dashed')
			.attr('d', () => {
				return line([
					{
						x:
							xScale(
								moment.utc(`${today} 04:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: height
					},
					{
						x:
							xScale(
								moment.utc(`${today} 04:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: 0
					}
				]);
			})
			.attr('stroke', ColorStyles.MainColorAlphaL)
			.attr('stroke-width', 1);
		phaseLines
			.append('path')
			.attr('class', 'phase1-line-settlestart dashed')
			.attr('d', () => {
				return line([
					{
						x:
							xScale(
								moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: height
					},
					{
						x:
							xScale(
								moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: 0
					}
				]);
			})
			.attr('stroke', ColorStyles.MainColorAlphaL)
			.attr('stroke-width', 1);
		phaseLines
			.append('rect')
			.attr('class', 'phase1-line-bgrect')
			.attr('x', xScale(moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) + 2)
			.attr('y', 1)
			.attr(
				'width',
				xScale(moment.utc(`${today} 13:30:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) -
					xScale(moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) -
					2
			)
			.attr('height', height - 2)
			.style('fill', ColorStyles.MainColorAlphaLLLL)
			.style('opacity', 0.2);
		phaseLines
			.append('rect')
			.attr('class', 'phase1-line-bgrect')
			.attr('x', xScale(moment.utc(`${today} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) + 2)
			.attr('y', 1)
			.attr(
				'width',
				xScale(moment.utc(`${today} 04:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) -
					xScale(moment.utc(`${today} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) -
					2
			)
			.attr('height', height - 2)
			.style('fill', ColorStyles.TextRedAlphaLLLL)
			.style('opacity', 0.2);
		phaseLines
			.append('text')
			.attr('class', 'last-point-legend-text')
			.attr(
				'transform',
				`translate(${xScale(
					moment.utc(`${today} 02:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
				)},${-8})`
			)
			.attr('fill', ColorStyles.ThemeTextAlpha)
			.attr('font-size', 11)
			.attr('font-family', 'Roboto')
			.text(StakingCST.PHASE[3][locale]);
		phaseLines
			.append('text')
			.attr('class', 'last-point-legend-text')
			.attr(
				'transform',
				`translate(${xScale(
					moment.utc(`${today} 08:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
				)},${-8})`
			)
			.attr('fill', ColorStyles.ThemeTextAlpha)
			.attr('font-size', 11)
			.attr('font-family', 'Roboto')
			.text(StakingCST.PHASE[1][locale]);
		phaseLines
			.append('text')
			.attr('class', 'last-point-legend-text')
			.attr(
				'transform',
				`translate(${xScale(
					moment.utc(`${today} 12:45:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
				)},${-8})`
			)
			.attr('fill', ColorStyles.ThemeTextAlpha)
			.attr('font-size', 11)
			.attr('font-family', 'Roboto')
			.text(StakingCST.PHASE[2][locale]);
		phaseLines.selectAll('text').style('text-anchor', 'middle');
	} else {
		const phaseLines = chart.append('g').attr('class', 'phase1-lines');
		phaseLines
			.append('path')
			.attr('class', 'phase1-line-settlestart dashed')
			.attr('d', () => {
				return line([
					{
						x:
							xScale(
								moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: height
					},
					{
						x:
							xScale(
								moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: 0
					}
				]);
			})
			.attr('stroke', ColorStyles.MainColorAlphaL)
			.attr('stroke-width', 1);
		phaseLines
			.append('path')
			.attr('class', 'phase1-line-settlestart dashed')
			.attr('d', () => {
				return line([
					{
						x:
							xScale(
								moment.utc(`${tommorow} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: height
					},
					{
						x:
							xScale(
								moment.utc(`${tommorow} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
							) + 1,
						y: 0
					}
				]);
			})
			.attr('stroke', ColorStyles.MainColorAlphaL)
			.attr('stroke-width', 1);
	}

	// Chart Data
	const chartdata = chart
		.append('g')
		.attr('class', 'chart-data')
		.attr('clip-path', 'url(#clip)');

	//Draw ETH Line
	chartdata
		.append('path')
		.attr('class', 'line-custodian-eth ')
		.datum(showingSet)
		.attr('d', lineETH)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.MainColor)
		.attr('stroke-width', 1.5);
	//Draw Last ETH Price
	const lastPoint = chartdata.append('g').attr('class', 'last-point-group');
	lastPoint
		.append('circle')
		.attr('class', 'last-point-dot')
		.attr('cx', xScale(showingSet[0].timestamp))
		.attr('cy', ethYScale(showingSet[0].close))
		.attr('r', 2)
		.style('fill', ColorStyles.MainColor);
	const lastPointLegend = lastPoint.append('g').attr('class', 'last-point-legend');
	lastPointLegend
		.append('text')
		.attr('class', 'last-point-legend-text')
		.attr(
			'transform',
			`translate(${xScale(showingSet[0].timestamp) + 5},${ethYScale(showingSet[0].close) +
				3})`
		)
		.attr('fill', ColorStyles.MainColor)
		.attr('font-size', 13)
		.attr('font-weight', 500)
		.attr('font-family', 'Roboto')
		.text(d3.format(',.2f')(showingSet[0].close));
	lastPointLegend.selectAll('text').style('text-anchor', 'start');
	//Draw BoundRange
	const boundLines = chartdata.append('g').attr('class', 'bound-lines');
	boundLines
		.append('path')
		.attr('class', 'line-custodian-eth')
		.attr('d', () => {
			return line([
				{
					x: 0,
					y: ethYScale(showingSet[0].close * (1 + boundaries[0]))
				},
				{
					x: width,
					y: ethYScale(showingSet[0].close * (1 + boundaries[0]))
				}
			]);
		})
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.MainColorAlphaLL)
		.attr('stroke-width', 1.5);
	boundLines
		.append('path')
		.attr('class', 'line-custodian-eth')
		.attr('d', () => {
			return line([
				{
					x: 0,
					y: ethYScale(showingSet[0].close * (1 - boundaries[1]))
				},
				{
					x: width,
					y: ethYScale(showingSet[0].close * (1 - boundaries[1]))
				}
			]);
		})
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.MainColorAlphaLL)
		.attr('stroke-width', 1.5);
	boundLines
		.append('text')
		.attr('class', 'last-point-legend-text')
		.attr(
			'transform',
			`translate(${xScale(showingSet[0].timestamp) + 5},${ethYScale(
				showingSet[0].close * (1 + boundaries[0])
			) + 15})`
		)
		.attr('fill', ColorStyles.TextGreen)
		.attr('font-size', 12)
		.attr('font-family', 'Roboto')
		.text('+ ' + d3.format(',.2%')(boundaries[0]));
	boundLines
		.append('text')
		.attr('class', 'last-point-legend-text')
		.attr(
			'transform',
			`translate(${xScale(showingSet[0].timestamp) + 5},${ethYScale(
				showingSet[0].close * (1 - boundaries[1])
			) - 7})`
		)
		.attr('fill', ColorStyles.TextRed)
		.attr('font-size', 12)
		.attr('font-family', 'Roboto')
		.text('- ' + d3.format(',.2%')(boundaries[1]));
	boundLines.selectAll('text').style('text-anchor', 'start');
}

interface IProps {
	locale: string;
	prices: IPrice[];
	phase: number;
	boundaries: number[];
}

export default class TimeSeriesChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props: IProps) {
		super(props);
		this.chartRef = React.createRef();
	}

	public componentDidMount() {
		const { prices, phase, locale, boundaries } = this.props;
		drawLines(this.chartRef.current as Element, prices, phase, locale, boundaries);
	}

	public shouldComponentUpdate(nextProps: IProps) {
		const { prices, phase, locale, boundaries } = nextProps;
		if (
			JSON.stringify(prices) !== JSON.stringify(this.props.prices) ||
			phase !== this.props.phase ||
			locale !== this.props.locale
		)
			drawLines(this.chartRef.current as Element, prices, phase, locale, boundaries);

		return false;
	}

	public render() {
		//const { keys } = this.props;
		return <div className="chart-wrapper" ref={this.chartRef} />;
	}
}
