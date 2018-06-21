import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import loadingImg from '../../../../images/loadingDUO.png';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';

const margin = { top: 15, right: 31, bottom: 23, left: 36 };

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
	keys: string[];
	timeStep: number;
	handlePickSource: (key: string) => void;
}

function drawLines(
	el: Element,
	custodianData: IAcceptedPrice[],
	sourceData: ISourceData<IPriceBar[]>,
	timeStep: number
) {
	console.log(el);
	console.log(custodianData);
	console.log(sourceData);
	console.log(timeStep);
	const dataLoaded =
		custodianData.length &&
		sourceData.bitfinex.length &&
		sourceData.gemini.length &&
		sourceData.gemini.length &&
		sourceData.gdax.length;
	if (!dataLoaded) {
		d3.selectAll('.loading').remove();
		d3.select(el)
			.append('div')
			.attr('class', 'loading')
			.html('<span>Loading...</span><img class="loading-img" src="' + loadingImg + '" />');
		return;
	}
	const width = 708 - margin.left - margin.right;
	const height = 400 - margin.top - margin.bottom;

	//Establish SVG Playground
	d3.selectAll('.loading').remove();
	d3.selectAll('#timeserieschart').remove();
	d3.select(el)
		.append('svg')
		.attr('id', 'timeserieschart')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	//Date Range
	const formatString = (step: number) => {
		switch (step) {
			case 300000:
				return 'HH:mm';
			default:
				return 'MM-DD';
		}
	};
	const zoomFormat = date => moment(date).format(formatString(timeStep));
	const displayColums = (step: number) => {
		switch (step) {
			case 300000:
				return 48;
			default:
				return 168;
		}
	};
	const custodianSourceTimestepRatio = (step: number) => {
		switch (step) {
			case 300000:
				return 12;
			default:
				return 1;
		}
	};
	const colums = displayColums(timeStep);
	const maxDate =
		d3.max(
			[
				custodianData[custodianData.length - 1].timestamp,
				sourceData.bitfinex[sourceData.bitfinex.length - 1].timestamp,
				sourceData.gemini[sourceData.gemini.length - 1].timestamp,
				sourceData.kraken[sourceData.kraken.length - 1].timestamp,
				sourceData.gdax[sourceData.gdax.length - 1].timestamp
			]
		) || 0;
	const minDate = maxDate - timeStep * colums;
	//Time Scale
	const xStart = minDate;
	const xEnd = maxDate + 2 * timeStep;
	console.log(moment(xStart));
	console.log(moment(xEnd));
	const xScale = d3
		.scaleTime()
		.domain([xStart, xEnd])
		.range([0, width]);
	const rectWidth =
		(xScale(moment('2000-01-01').valueOf() + timeStep) -
			xScale(moment('2000-01-01').valueOf())) *
		0.7;
	console.log(rectWidth);
	//Data Range (ETH price)
	const slicedCustodianData = custodianData.slice(
		-colums / custodianSourceTimestepRatio(timeStep)
	);
	const maxPrice =
		d3.max(
			[
				d3.max(slicedCustodianData.map(d => d.price)) || 0,
				...CST.EXCHANGES.map(
					src =>
						d3.max(
							(sourceData[src.toLowerCase()] as IPriceBar[])
								.map(d => d.high)
								.slice(-colums)
						) || 0
				)
			]
		) || 0;
	const minPrice =
		d3.min(
			[
				d3.min(slicedCustodianData.map(d => d.price)) || 0,
				...CST.EXCHANGES.map(
					src =>
						d3.min(
							(sourceData[src.toLowerCase()] as IPriceBar[])
								.map(d => d.high)
								.slice(-colums)
						) || 0
				)
			]
		) || 0;
	const rangeTop = maxPrice + 0.1 * (maxPrice - minPrice);
	const rangeBottom = d3.max([0, minPrice - 0.1 * (maxPrice - minPrice)]) || 0;
	console.log(maxPrice);
	console.log(minPrice);
	console.log(rangeTop);
	console.log(rangeBottom);
	//Data Range (Nav A/B)
	const maxNav =
		d3.max(
			[...slicedCustodianData.map(d => d.navA), ...slicedCustodianData.map(d => d.navB)]
		) || 0;
	const minNav =
		d3.min(
			[...slicedCustodianData.map(d => d.navA), ...slicedCustodianData.map(d => d.navB)]
		) || 0;
	const rangeTopNav = maxNav + 0.1 * (maxNav - minNav);
	const rangeBottomNav = d3.max([0, minNav - 0.1 * (maxNav - minNav)]) || 0;
	console.log(maxNav);
	console.log(minNav);
	console.log(rangeTopNav);
	console.log(rangeBottomNav);
	//ETH Linear YScale
	const ethYScale = d3
		.scaleLinear()
		.domain([rangeBottom, rangeTop])
		.range([height, 0]);
	//Nav A/B Linear YScale
	const navYScale = d3
		.scaleLinear()
		.domain([rangeBottomNav, rangeTopNav])
		.range([height, 0]);
	//Lines
	// const lineSource = d3
	// 	.line<IPriceBar>()
	// 	.x(d => xScale(d.timestamp))
	// 	.y(d => ethYScale(d.close));
	const lineCustodian = d3
		.line<IAcceptedPrice>()
		.x(d => xScale(d.timestamp))
		.y(d => ethYScale(d.price));
	const lineNavA = d3
		.line<IAcceptedPrice>()
		.x(d => xScale(d.timestamp))
		.y(d => navYScale(d.navA));
	const lineNavB = d3
		.line<IAcceptedPrice>()
		.x(d => xScale(d.timestamp))
		.y(d => navYScale(d.navB));
	//Axis
	const xAxis = d3
		.axisBottom(xScale)
		.ticks(6)
		.tickFormat(zoomFormat);
	const lyAxis = d3.axisLeft(ethYScale).ticks(5);
	const ryAxis = d3.axisRight(navYScale).ticks(5);
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
	const raY = chart
		.append('g')
		.attr('class', 'ry-axis')
		.attr('transform', 'translate(' + width + ', 0)')
		.call(ryAxis as any);
	raY.selectAll('text').style('text-anchor', 'start');
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
	// //Draw Source Lines
	// CST.EXCHANGES.forEach(ex => {
	// 	chartdata
	// 		.append('path')
	// 		.attr('class', 'line-' + ex.toLowerCase())
	// 		.datum(sourceData[ex.toLowerCase()])
	// 		.attr('d', lineSource)
	// 		.attr('fill', 'none')
	// 		.attr('stroke-linejoin', 'round')
	// 		.attr('stroke-linecap', 'round')
	// 		.attr('stroke', 'white')
	// 		.attr('stroke-width', 1);
	// });
	//Draw Nav A/B Lines
	chartdata
		.append('path')
		.attr('class', 'line-custodian-navA')
		.datum(custodianData)
		.attr('d', lineNavA)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.TextTokenAAlpha)
		.attr('stroke-width', 1);
	chartdata
		.append('path')
		.attr('class', 'line-custodian-navB')
		.datum(custodianData)
		.attr('d', lineNavB)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.TextTokenBAlpha)
		.attr('stroke-width', 1);
	//Draw Custodian ETH Line
	chartdata
		.append('path')
		.attr('class', 'line-custodian-eth')
		.datum(custodianData)
		.attr('d', lineCustodian)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', 'white')
		.attr('stroke-width', 1.5);
	//Draw OHLCs
	const isUpday = (d: IPriceBar): boolean => {
		return d.close > d.open;
	};
	const line = d3
		.line<any>()
		.x(d => {
			return d.x;
		})
		.y(d => {
			return d.y;
		});
	['bitfinex'].forEach(ex => {
		chartdata
			.selectAll('g')
			.data(sourceData[ex.toLowerCase()])
			.enter()
			.append('g')
			.attr('class', 'single-bar');
		const bars = chartdata.selectAll('g');
		console.log(bars);
		bars.data(sourceData[ex.toLowerCase()])
			.exit()
			.remove();
		bars.append('rect')
			.attr('class', 'bar-rect-' + ex.toLowerCase())
			.attr('x', (d: any) => {
				return xScale(d.timestamp) - rectWidth / 2;
			})
			.attr('y', (d: any) => {
				return isUpday(d) ? ethYScale(d.close) : ethYScale(d.open);
			})
			.attr('width', rectWidth)
			.attr('height', (d: any) => {
				return isUpday(d)
					? ethYScale(d.open) - ethYScale(d.close)
					: ethYScale(d.close) - ethYScale(d.open);
			})
			.style('fill', 'transparent')
			.style('stroke', (d: any) => {
				return isUpday(d) ? ColorStyles.TextGreenAlphaSolid : ColorStyles.TextRedAlphaSolid;
			});
		bars.append('path')
			.attr('class', 'bar-line1-' + ex.toLowerCase())
			.attr('d', (d: any) => {
				return line([
					{ x: xScale(d.timestamp), y: ethYScale(d.high) },
					{
						x: xScale(d.timestamp),
						y: isUpday(d) ? ethYScale(d.close) : ethYScale(d.open)
					}
				]);
			})
			.style('stroke', (d: any) => {
				return isUpday(d) ? ColorStyles.TextGreen : ColorStyles.TextRed;
			});
		bars.append('path')
			.attr('class', 'bar-line2-' + ex.toLowerCase())
			.attr('d', (d: any) => {
				return line([
					{ x: xScale(d.timestamp), y: ethYScale(d.low) },
					{
						x: xScale(d.timestamp),
						y: isUpday(d) ? ethYScale(d.open) : ethYScale(d.close)
					}
				]);
			})
			.style('stroke', (d: any) => {
				return isUpday(d) ? ColorStyles.TextGreen : ColorStyles.TextRed;
			});
	});
}

export default class TimeSeriesChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props: IProps) {
		super(props);
		this.chartRef = React.createRef();
	}

	public componentDidMount() {
		const { minutely, prices, timeStep } = this.props;
		drawLines(this.chartRef.current as Element, prices, minutely, timeStep);
	}

	public shouldComponentUpdate(nextProps: IProps) {
		if (
			JSON.stringify(nextProps.minutely) !== JSON.stringify(this.props.minutely) ||
			JSON.stringify(nextProps.hourly) !== JSON.stringify(this.props.hourly) ||
			JSON.stringify(nextProps.prices) !== JSON.stringify(this.props.prices)
		) {
			const { minutely, prices, timeStep } = nextProps;
			drawLines(this.chartRef.current as Element, prices, minutely, timeStep);
		}
		return false;
	}

	public render() {
		//const { keys } = this.props;
		return <div className="chart-wrapper" ref={this.chartRef} />;
	}
}
