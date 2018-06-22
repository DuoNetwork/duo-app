import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import loadingImg from '../../../../images/loadingDUO.png';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';

const margin = { top: 40, right: 31, bottom: 23, left: 36 };

function drawLines(
	el: Element,
	custodianData: IAcceptedPrice[],
	sourceData: ISourceData<IPriceBar[]>,
	timeStep: number,
	source: string,
	isHourly?: boolean
) {
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
	const svg = d3
		.select(el)
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
				return 'MM-DD HH:mm';
		}
	};
	const zoomFormat = date => moment(date).format(formatString(timeStep));
	const displayColums = (step: number) => {
		switch (step) {
			case 300000:
				return 72;
			default:
				return 72;
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
	const xScale = d3
		.scaleTime()
		.domain([xStart, xEnd])
		.range([0, width]);
	const rectWidth =
		(xScale(moment('2000-01-01').valueOf() + timeStep) -
			xScale(moment('2000-01-01').valueOf())) *
		0.6;
	// const backRectWidth =
	// 	(xScale(moment('2000-01-01').valueOf() + timeStep) -
	// 		xScale(moment('2000-01-01').valueOf())) *
	// 	0.8;
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
								.map(d => d.low)
								.slice(-colums)
						) || 0
				)
			]
		) || 0;
	const rangeTop = maxPrice + 0.1 * (maxPrice - minPrice);
	const rangeBottom = d3.max([0, minPrice - 0.1 * (maxPrice - minPrice)]) || 0;
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
	//Custodian ETH TokenA/B Lines
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
	CST.EXCHANGES.forEach(ex => {
		const ohlc = chartdata.append('g').attr('class', 'ohlc-' + ex.toLowerCase());
		ohlc.selectAll('g')
			.data(sourceData[ex.toLowerCase()])
			.enter()
			.append('g');
		const bars = ohlc.selectAll('g');
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
			.style('fill', (d: any) => {
				return isUpday(d) ? ColorStyles.TextGreenAlphaLLL : ColorStyles.TextRedAlphaLLL;
			})
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
				return isUpday(d) ? ColorStyles.TextGreenAlphaSolid : ColorStyles.TextRedAlphaSolid;
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
				return isUpday(d) ? ColorStyles.TextGreenAlphaSolid : ColorStyles.TextRedAlphaSolid;
			});
		if (source !== ex.toLowerCase())
			d3.selectAll('.ohlc-' + ex.toLowerCase()).attr('opacity', 0);
	});

	//Hourly Lines
	//Draw Nav A/B Lines
	chartdata
		.append('path')
		.attr('class', 'line-custodian-navA ' + (!isHourly ? 'dashed' : ''))
		.datum(custodianData)
		.attr('d', lineNavA)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', ColorStyles.TextTokenAAlpha)
		.attr('stroke-width', 1);
	chartdata
		.append('path')
		.attr('class', 'line-custodian-navB ' + (!isHourly ? 'dashed' : ''))
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
		.attr('class', 'line-custodian-eth ' + (!isHourly ? 'dashed' : ''))
		.datum(custodianData)
		.attr('d', lineCustodian)
		.attr('fill', 'none')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke', 'white')
		.attr('stroke-width', 1.5);
	if (!isHourly) {
		//Non-hourly dots
		const segments = chartdata.append('g').attr('class', 'segments');
		segments
			.selectAll('g')
			.data(custodianData)
			.enter()
			.append('g');
		const segBar = segments.selectAll('g');
		segBar
			.append('circle')
			.attr('class', 'segdot-eth')
			.attr('cx', (d: any) => xScale(d.timestamp))
			.attr('cy', (d: any) => ethYScale(d.price))
			.attr('r', 2)
			.style('fill', 'white');
		['navA', 'navB'].forEach(s => {
			segBar
				.append('circle')
				.attr('class', 'segdot' + s)
				.attr('cx', (d: any) => xScale(d.timestamp))
				.attr('cy', (d: any) => navYScale(d[s]))
				.attr('r', 2)
				.style(
					'fill',
					s === 'navA' ? ColorStyles.TextTokenAAlpha : ColorStyles.TextTokenBAlpha
				);
		});
	}
	//Overlay layer
	const overlay = svg
		.append('rect')
		.attr('class', 'overlay')
		.attr('width', width)
		.attr('height', height)
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.style('opacity', 0)
		.on('mousemove', mousemove);
	function mousemove() {
		const x0 = xScale.invert(d3.mouse(overlay.node() as any)[0]);
		console.log(x0);
	}
}

function showLines(source: string) {
	CST.EXCHANGES.forEach(ex => d3.selectAll('.ohlc-' + ex.toLowerCase()).attr('opacity', 0));
	d3.selectAll('.ohlc-' + source.toLowerCase()).attr('opacity', 1);
}

interface IProps {
	sourceData: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
	source: string;
	timeStep: number;
	isHourly?: boolean;
}

export default class TimeSeriesChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props: IProps) {
		super(props);
		this.chartRef = React.createRef();
	}

	public componentDidMount() {
		const { sourceData, prices, timeStep, source, isHourly } = this.props;
		drawLines(this.chartRef.current as Element, prices, sourceData, timeStep, source, isHourly);
	}

	public shouldComponentUpdate(nextProps: IProps) {
		const { sourceData, prices, timeStep, source, isHourly } = nextProps;
		if (
			JSON.stringify(nextProps.sourceData) !== JSON.stringify(this.props.sourceData) ||
			JSON.stringify(nextProps.prices) !== JSON.stringify(this.props.prices) ||
			timeStep !== this.props.timeStep
		)
			drawLines(
				this.chartRef.current as Element,
				prices,
				sourceData,
				timeStep,
				source,
				isHourly
			);

		if (source !== this.props.source) showLines(source);

		return false;
	}

	public render() {
		//const { keys } = this.props;
		return <div className="chart-wrapper" ref={this.chartRef} />;
	}
}
