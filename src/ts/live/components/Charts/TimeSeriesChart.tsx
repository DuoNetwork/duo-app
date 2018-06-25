import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import loadingImg from '../../../../images/loadingDUO.png';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';

const margin = { top: 40, right: 34, bottom: 23, left: 38 };
const width = 708 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

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
	const formatString = (step: number, date: number) => {
		switch (step) {
			case 300000:
				return 'HH:mm';
			default:
				return moment(date).format('HH') === '00' ? 'MM-DD' : 'hh a';
		}
	};
	const zoomFormat = date => moment(date).format(formatString(timeStep, date));
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
	const barWidth =
		xScale(moment('2000-01-01').valueOf() + timeStep) - xScale(moment('2000-01-01').valueOf());
	const rectWidth = barWidth * 0.7;
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
	const rangeBottom = d3.max([0, minPrice - 0.2 * (maxPrice - minPrice)]) || 0;
	//Data Range Volumn
	const maxVol = CST.EXCHANGES.map(
		src =>
			d3.max(
				(sourceData[src.toLowerCase()] as IPriceBar[]).map(d => d.volume).slice(-colums)
			) || 0
	);
	const rangeTopV = maxVol.map(d => d * 7);

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
	const rangeBottomNav = d3.max([0, minNav - 0.2 * (maxNav - minNav)]) || 0;
	//ETH Linear YScale
	const ethYScale = d3
		.scaleLinear()
		.domain([rangeBottom, rangeTop])
		.range([height, 0]);
	//Volumn Linear YScale
	const volYScale = (s: string) =>
		d3
			.scaleLinear()
			.domain([0, rangeTopV[CST.EXCHANGES.indexOf(s)]])
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
			.attr('class', 'bar-rectvol-' + ex.toLowerCase())
			.attr('x', (d: any) => {
				return xScale(d.timestamp) - rectWidth / 2;
			})
			.attr('y', (d: any) => volYScale(ex)(d.volume))
			.attr('width', rectWidth)
			.attr('height', (d: any) => height - volYScale(ex)(d.volume))
			.style('fill', (d: any) => {
				return isUpday(d) ? ColorStyles.TextGreenAlphaLLLL : ColorStyles.TextRedAlphaLLLL;
			});
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
		.attr('stroke', ColorStyles.TextWhiteAlphaSolid)
		.attr('stroke-width', 1.2);
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
		.attr('fill', 'transparent')
		.on('mouseover', drawAssisLine)
		.on('mouseout', deleteAssisLine)
		.on('mousemove', mousemove);
	//Legend bar
	const legendBar = svg.append('g').attr('class', 'legend-bar');
	const sourceLegend = legendBar.append('g').attr('class', 'source-legend');
	sourceLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(37, 27.5)')
		.text('O:');
	sourceLegend
		.append('text')
		.attr('class', 'source-legend-text-open')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(48, 27.5)')
		.text('');
	sourceLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(82, 27.5)')
		.text('H:');
	sourceLegend
		.append('text')
		.attr('class', 'source-legend-text-high')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(93, 27.5)')
		.text('');
	sourceLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(127, 27.5)')
		.text('L:');
	sourceLegend
		.append('text')
		.attr('class', 'source-legend-text-low')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(137, 27.5)')
		.text('');
	sourceLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(169, 27.5)')
		.text('C:');
	sourceLegend
		.append('text')
		.attr('class', 'source-legend-text-close')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(179, 27.5)')
		.text('');
	sourceLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(211, 27.5)')
		.text('vol:');
	sourceLegend
		.append('text')
		.attr('class', 'source-legend-text-vol')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(228, 27.5)')
		.text('');
	const custodianLegend = legendBar.append('g').attr('class', 'custodian-legend');
	const ethLegend = custodianLegend.append('g').attr('class', 'custodian-eth-legend');
	ethLegend
		.append('rect')
		.attr('width', 8)
		.attr('height', 8)
		.attr('x', 320)
		.attr('y', 20)
		.style('fill', 'white');
	ethLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(333, 27.5)')
		.text('beETHoven');
	ethLegend
		.append('text')
		.attr('class', 'custodian-eth-legend-text')
		.attr('fill', ColorStyles.TextWhite)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(386, 27.5)')
		.text('');
	const tokenALegend = custodianLegend.append('g').attr('class', 'custodian-tokenA-legend');
	const tokenBLegend = custodianLegend.append('g').attr('class', 'custodian-tokenB-legend');
	tokenALegend
		.append('rect')
		.attr('width', 8)
		.attr('height', 8)
		.attr('x', 510)
		.attr('y', 20)
		.style('fill', ColorStyles.TextTokenA);
	tokenALegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(523, 27.5)')
		.text('Token A');
	tokenALegend
		.append('text')
		.attr('class', 'custodian-tokenA-legend-text')
		.attr('fill', ColorStyles.TextTokenA)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(562, 27.5)')
		.text('');
	tokenBLegend
		.append('rect')
		.attr('width', 8)
		.attr('height', 8)
		.attr('x', 605)
		.attr('y', 20)
		.style('fill', ColorStyles.TextTokenB);
	tokenBLegend
		.append('text')
		.attr('fill', ColorStyles.TextWhiteAlphaL)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(618, 27.5)')
		.text('Token B');
	tokenBLegend
		.append('text')
		.attr('class', 'custodian-tokenB-legend-text')
		.attr('fill', ColorStyles.TextTokenB)
		.attr('font-size', 10)
		.attr('font-family', 'Roboto')
		.attr('transform', 'translate(657, 27.5)')
		.text('');

	function drawAssisLine() {
		const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
		const yPosL = ethYScale.invert(d3.mouse(overlay.node() as any)[1]);
		const yPosR = navYScale.invert(d3.mouse(overlay.node() as any)[1]);
		svg.append('path')
			.attr('class', 'assist-line-x')
			.attr('d', () => {
				return line([
					{ x: margin.left, y: ethYScale(yPosL) + margin.top },
					{
						x: width + margin.left,
						y: ethYScale(yPosL) + margin.top
					}
				]);
			})
			.attr('stroke', ColorStyles.BorderWhite1)
			.attr('stroke-width', 1);
		svg.append('path')
			.attr('class', 'assist-line-y')
			.attr('d', () => {
				return line([
					{ x: xScale(xPos) + margin.left, y: margin.top },
					{
						x: xScale(xPos) + margin.left,
						y: height + margin.top
					}
				]);
			})
			.attr('stroke', ColorStyles.BorderWhite1)
			.attr('stroke-width', 1);
		const lyAxisBox = svg.append('g').attr('class', 'ly-axis-box');
		const ryAxisBox = svg.append('g').attr('class', 'ry-axis-box');
		const xAxisBox = svg.append('g').attr('class', 'x-axis-box');
		lyAxisBox
			.append('rect')
			.attr('class', 'ly-axis-box-rect')
			.attr('x', margin.left)
			.attr('y', ethYScale(yPosL) + margin.top)
			.attr('width', 28)
			.attr('height', 18)
			.attr('transform', 'translate(-31, -9)')
			.style('fill', ColorStyles.CardBackgroundSolid)
			.style('stroke', ColorStyles.BorderWhite3);
		lyAxisBox
			.append('text')
			.attr('class', 'ly-axis-box-text')
			.attr('transform', 'translate(12.5,' + (ethYScale(yPosL) + margin.top + 4) + ')')
			.attr('fill', ColorStyles.TextWhiteAlphaL)
			.attr('font-size', 10)
			.attr('font-family', 'Roboto')
			.text(d3.format(',.0f')(yPosL));
		ryAxisBox
			.append('rect')
			.attr('class', 'ry-axis-box-rect')
			.attr('x', width + margin.left)
			.attr('y', navYScale(yPosR) + margin.top)
			.attr('width', 28)
			.attr('height', 18)
			.attr('transform', 'translate(4, -9)')
			.style('fill', ColorStyles.CardBackgroundSolid)
			.style('stroke', ColorStyles.BorderWhite3);
		ryAxisBox
			.append('text')
			.attr('class', 'ry-axis-box-text')
			.attr(
				'transform',
				'translate(' +
					(width + margin.left + 6.2) +
					', ' +
					(ethYScale(yPosL) + margin.top + 4) +
					')'
			)
			.attr('fill', ColorStyles.TextWhiteAlphaL)
			.attr('font-size', 10)
			.attr('font-family', 'Roboto')
			.text(d3.format(',.3f')(yPosR));
		xAxisBox
			.append('rect')
			.attr('class', 'x-axis-box-rect')
			.attr('x', xScale(xPos) + margin.left)
			.attr('y', height + margin.top)
			.attr('width', 40)
			.attr('height', 16)
			.attr('transform', 'translate(-20, 3)')
			.style('fill', ColorStyles.CardBackgroundSolid)
			.style('stroke', ColorStyles.BorderWhite3);
		xAxisBox
			.append('text')
			.attr('class', 'x-axis-box-text')
			.attr(
				'transform',
				'translate(' +
					(xScale(xPos) + margin.left - 13) +
					', ' +
					(height + margin.top + 14.5) +
					')'
			)
			.attr('fill', ColorStyles.TextWhiteAlphaL)
			.attr('font-size', 10)
			.attr('font-family', 'Roboto')
			.text(moment(xPos).format('HH:mm'));
	}
	function deleteAssisLine() {
		d3.selectAll('.assist-line-x').remove();
		d3.selectAll('.assist-line-y').remove();
		d3.selectAll('.x-axis-box').remove();
		d3.selectAll('.ly-axis-box').remove();
		d3.selectAll('.ry-axis-box').remove();
		d3.selectAll('.custodian-eth-legend-text').text('');
		d3.selectAll('.custodian-tokenA-legend-text').text('');
		d3.selectAll('.custodian-tokenB-legend-text').text('');
		d3.selectAll('.source-legend-text-open').text('');
		d3.selectAll('.source-legend-text-high').text('');
		d3.selectAll('.source-legend-text-low').text('');
		d3.selectAll('.source-legend-text-close').text('');
		d3.selectAll('.source-legend-text-vol').text('');
	}
	function moveAssisLine() {
		const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
		const yPosL = ethYScale.invert(d3.mouse(overlay.node() as any)[1]);
		const yPosR = navYScale.invert(d3.mouse(overlay.node() as any)[1]);
		d3.selectAll('.assist-line-x').attr('d', () => {
			return line([
				{ x: 0 + margin.left, y: ethYScale(yPosL) + margin.top },
				{
					x: width + margin.left,
					y: ethYScale(yPosL) + margin.top
				}
			]);
		});
		d3.selectAll('.assist-line-y').attr('d', () => {
			return line([
				{ x: xScale(xPos) + margin.left, y: margin.top },
				{
					x: xScale(xPos) + margin.left,
					y: height + margin.top
				}
			]);
		});
		d3.selectAll('.x-axis-box-rect')
			.attr('x', xScale(xPos) + margin.left)
			.attr('y', height + margin.top);
		d3.selectAll('.x-axis-box-text')
			.attr(
				'transform',
				'translate(' +
					(xScale(xPos) + margin.left - 13) +
					', ' +
					(height + margin.top + 14.5) +
					')'
			)
			.text(moment(xPos).format('HH:mm'));
		d3.selectAll('.ly-axis-box-rect')
			.attr('x', margin.left)
			.attr('y', ethYScale(yPosL) + margin.top);
		d3.selectAll('.ly-axis-box-text')
			.attr('transform', 'translate(12.5,' + (ethYScale(yPosL) + margin.top + 4) + ')')
			.text(d3.format(',.0f')(yPosL));
		d3.selectAll('.ry-axis-box-rect')
			.attr('x', width + margin.left)
			.attr('y', navYScale(yPosR) + margin.top);
		d3.selectAll('.ry-axis-box-text')
			.attr(
				'transform',
				'translate(' +
					(width + margin.left + 6.2) +
					', ' +
					(ethYScale(yPosL) + margin.top + 4) +
					')'
			)
			.text(d3.format(',.3f')(yPosR));
	}
	function mousemove() {
		const xPos = moment(xScale.invert(d3.mouse(overlay.node() as any)[0])).valueOf();
		const yPosL = ethYScale.invert(d3.mouse(overlay.node() as any)[1]);
		findBar(xPos);
		moveAssisLine();
		findETHDot(xPos, yPosL);
	}
	function findBar(x: number) {
		d3.selectAll('.source-legend-text-open').text('');
		d3.selectAll('.source-legend-text-high').text('');
		d3.selectAll('.source-legend-text-low').text('');
		d3.selectAll('.source-legend-text-close').text('');
		d3.selectAll('.source-legend-text-vol').text('');
		sourceData[source].forEach(item => {
			if (item.timestamp - timeStep / 2 < x && x < item.timestamp + timeStep / 2) {
				d3.selectAll('.source-legend-text-open').text(d3.format(',.1f')(item.open));
				d3.selectAll('.source-legend-text-high').text(d3.format(',.1f')(item.high));
				d3.selectAll('.source-legend-text-low').text(d3.format(',.1f')(item.low));
				d3.selectAll('.source-legend-text-close').text(d3.format(',.1f')(item.close));
				d3.selectAll('.source-legend-text-vol').text(d3.format(',.1f')(item.volume));
			}
		});
		d3.selectAll('.custodian-eth-legend-text').text('');
		d3.selectAll('.custodian-tokenA-legend-text').text('');
		d3.selectAll('.custodian-tokenB-legend-text').text('');
		custodianData.forEach(item => {
			if (
				xScale(item.timestamp) - barWidth / 2 < xScale(x) &&
				xScale(x) < xScale(item.timestamp) + barWidth / 2
			) {
				d3.selectAll('.custodian-eth-legend-text').text(d3.format(',.2f')(item.price));
				d3.selectAll('.custodian-tokenA-legend-text').text(d3.format(',.4f')(item.navA));
				d3.selectAll('.custodian-tokenB-legend-text').text(d3.format(',.4f')(item.navB));
			}
		});
	}
	function findETHDot(x: number, y: number) {
		d3.selectAll('.eth-dot').remove();
		custodianData.forEach(item => {
			if (
				xScale(item.timestamp) - barWidth / 2 < xScale(x) &&
				xScale(x) < xScale(item.timestamp) + barWidth / 2 &&
				ethYScale(item.price) - barWidth / 2 < ethYScale(y) &&
				ethYScale(y) < ethYScale(item.price) + barWidth / 2
			)
				svg.append('circle')
					.attr('class', 'eth-dot')
					.attr('cx', xScale(item.timestamp) + margin.left)
					.attr('cy', ethYScale(item.price) + margin.top)
					.attr('r', 4.8)
					.style('fill', isHourly ? 'white' : 'transparent')
					.style('stroke-width', 1)
					.style('stroke', 'white')
					.on('mouseover', () => {
						drawAssisLine();
						findBar(x);
					})
					.on('mouseout', deleteAssisLine)
					.on('mousemove', moveAssisLine)
					.on('click', () =>
						window.open(
							'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/tx/' +
								item.transactionHash,
							'_blank'
						)
					);
		});
	}
}

function showLines(source: string) {
	d3.select('.source-legend-text').text(source.toLocaleUpperCase());
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
