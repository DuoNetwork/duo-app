import * as d3 from 'd3';
import { IPriceData } from '../../types';

const colorClassA = 'rgba(0,186,255,0.7)';
const colorClassB = 'rgba(255,129,0,0.7)';
const colorClassAAlpha = 'rgba(0,186,255,0.15)';
const colorClassBAlpha = 'rgba(255,129,0,0.15)';
const colorResetDot = 'rgba(214,48,48,0.6)';
const marginP = { top: 40, right: 26, bottom: 25, left: 36 };

export default class D3PriceChart {
	public create = (
		el: Element,
		props: { windowWidth: number; windowHeight: number },
		state: {
			name: string;
			data: IPriceData[];
			movedata: IPriceData[];
			pickedPriceDatum?: (d: IPriceData) => void;
		}
	) => {
		const { name, data, movedata } = state;
		const { windowHeight } = props;
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
						return d.ETH;
					})
				) || 0,
			lyMax =
				d3.max(
					showedData.map(d => {
						return d.ETH;
					})
				) || 0,
			lyRange = lyMax - lyMin || lyMin * 0.2;
		const ryMin =
				d3.min(
					showedData.map(d => {
						return d3.min([d.ClassA, d.ClassB]) || 0;
					})
				) || 0,
			ryMax =
				d3.max(
					showedData.map(d => {
						return d3.max([d.ClassA, d.ClassB]) || 0;
					})
				) || 0,
			ryRange = ryMax - ryMin || ryMin * 0.2;
		const nslyMax = lyMax + lyRange / 2,
			nslyMin = lyMin - lyRange / 2 > 0 ? lyMin - lyRange / 2 : 0,
			nslyRange = lyRange * 2;
		// Line
		const lineETH = d3
			.line<IPriceData>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ly(d.ETH);
			});
		const lineClassA = d3
			.line<IPriceData>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ry(d.ClassA);
			});
		const lineClassB = d3
			.line<IPriceData>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ry(d.ClassB);
			});

		const showColumndata = (d: IPriceData): void => {
			const resetText = +d.InterestCount === 0 ? 'Reset Day' : '';
			infoBar.html(
				"Date: <div class = 'Date info-column'>" +
					d3.timeFormat('%b %d')(new Date(Date.parse(d.date))) +
					"</div><div class='legend-ETH'></div> ETH: <div class = 'ETH-price info-column'>" +
					d.ETH.toFixed(2) +
					"</div><div class='legend-ClassA'></div> ClassA: <div class = 'ClassA-price info-column'>" +
					d.ClassA.toFixed(2) +
					"</div><div class='legend-ClassB'></div> ClassB: <div class = 'ClassB-price info-column'>" +
					d.ClassB.toFixed(2) +
					"</div><div class='reset-text'>" +
					resetText +
					'</div>'
			);
		};

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
			.axisBottom(x)
			.ticks(5)
			.tickFormat(zoomFormat);

		const lyAxis = d3.axisLeft(ly).ticks(5);
		const ryAxis = d3.axisRight(ry).ticks(5);
		/*
		const zoom = d3
			.zoom()
			.scaleExtent([0.5, 5])
			.translateExtent([
				[x(new Date(xExtent[0].toString())), -Infinity],
				[x(new Date(xExtent[1].toString())), Infinity]
			])
			.on("zoom", zoomed);
		*/
		// Infor Bars
		const infoBar = d3
			.select(el)
			.append('div')
			.attr('class', 'info-bar-' + name)
			.html(
				"Date: <div class = 'Date info-column'> </div><div class='legend-ETH'></div> ETH: <div class = 'ETH-price info-column'></div><div class='legend-ClassA'></div> ClassA: <div class = 'ClassA-price info-column'></div><div class='legend-ClassB'></div> ClassB: <div class = 'ClassB-price info-column'></div><div class='reset-text'></div>"
			);

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
		const raY = chart
			.append('g')
			.attr('class', 'ry-axis-' + name)
			.attr('transform', 'translate(' + width + ', 0)')
			.call(ryAxis as any);
		raY.selectAll('text').style('text-anchor', 'start');

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
		// Bar Backgrounds
		//const barBackground =
		bars
			.append('rect')
			.attr('class', 'bar-background')
			.attr('x', (d: {}) => {
				return x(new Date(Date.parse((d as IPriceData).date))) - backrectWidth / 2;
			})
			.attr('y', 0)
			.attr('width', backrectWidth)
			.attr('height', height)
			.on('mousemove', (d: {}) => {
				showColumndata(d as IPriceData);
			});
		// Lines
		//const graphLineETH =
		chartdata
			.append('path')
			.attr('class', 'line-ETH')
			.datum(data)
			.attr('d', lineETH)
			.attr('fill', 'none')
			.attr('stroke', 'rgba(255,255,255,0.15)')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1.5);
		//const graphLineClassA =
		chartdata
			.append('path')
			.attr('class', 'line-ClassA')
			.datum(data)
			.attr('d', lineClassA)
			.attr('fill', 'none')
			.attr('stroke', colorClassAAlpha)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1);
		//const graphLineClassB =
		chartdata
			.append('path')
			.attr('class', 'line-ClassB')
			.datum(data)
			.attr('d', lineClassB)
			.attr('fill', 'none')
			.attr('stroke', colorClassBAlpha)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1);
		//const graphLineETH_move =
		chartdata
			.append('path')
			.attr('class', 'line-ETH_move')
			.datum(movedata)
			.attr('d', lineETH)
			.attr('fill', 'none')
			.attr('stroke', 'rgba(255,255,255,1)')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1.5);
		//const graphLineClassA_move =
		chartdata
			.append('path')
			.attr('class', 'line-ClassA_move')
			.datum(movedata)
			.attr('d', lineClassA)
			.attr('fill', 'none')
			.attr('stroke', colorClassA)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1);
		//const graphLineClassB_move =
		chartdata
			.append('path')
			.attr('class', 'line-ClassB_move')
			.datum(movedata)
			.attr('d', lineClassB)
			.attr('fill', 'none')
			.attr('stroke', colorClassB)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1);

		// Reset Points
		//const resetDots =
		bars
			.append('circle')
			.attr('class', 'reset-dot')
			.attr('cx', (d: {}) => {
				return x(new Date(Date.parse((d as IPriceData).date)));
			})
			.attr('cy', (d: {}) => {
				return ry((d as IPriceData).ClassB);
			})
			.attr('r', (d: {}) => {
				return (d as IPriceData).InterestCount === 0 ? 2 : 0;
			})
			.attr('stroke', 'none')
			.attr('fill', colorResetDot);

		// chart.call(zoom).on("wheel.zoom", null);
		/*
		function zoomed() {
			const transformAxis = d3.event.transform;
			const new_x = transformAxis.rescaleX(x);
			aX.call(xAxis.scale(new_x));
			aX.selectAll("text").style("text-anchor", "middle");
			const newRangedData = data.filter(d => {
				return (
					moment(new Date(Date.parse(d.date))).isAfter(new_x.invert(-backrectWidth)) &&
					moment(new Date(Date.parse(d.date))).isBefore(new_x.invert(width + backrectWidth))
				);
			});
			const lyMin = d3.min(
					newRangedData.map(d => {
						return d.ETH;
					})
				),
				lyMax = d3.max(
					newRangedData.map(d => {
						return d.ETH;
					})
				),
				lyRange = lyMax - lyMin;
			const ryMin = d3.min(
					newRangedData.map(d => {
						return d3.min([d.ClassA, d.ClassB]);
					})
				),
				ryMax = d3.max(
					newRangedData.map(d => {
						return d3.max([d.ClassA, d.ClassB]);
					})
				),
				ryRange = ryMax - ryMin;
			const nslyMax = lyMax + lyRange / 2,
				nslyMin = lyMin - lyRange / 2 > 0 ? lyMin - lyRange / 2 : 0,
				nslyRange = lyRange * 2;
			ly.domain([nslyMin - 0.2 * nslyRange > 0 ? nslyMin - 0.2 * nslyRange : 0, nslyMax + 0.2 * nslyRange]);
			ry.domain([ryMin - 0.2 * ryRange > 0 ? ryMin - 0.2 * ryRange : 0, ryMax + 0.2 * ryRange]);
			d3.select(".ly-axis-" + name).call(d3.axisLeft(ly).ticks(5));
			d3.select(".ry-axis-" + name).call(d3.axisRight(ry).ticks(5));
			const lineETH = d3
				.line<IPriceData>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ly(d.ETH);
				});
			const lineClassA = d3
				.line<IPriceData>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ry(d.ClassA);
				});
			const lineClassB = d3
				.line<IPriceData>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ry(d.ClassB);
				});
			barBackground.data(data).attr("x", (d: IPriceData) => {
				return new_x(new Date(Date.parse(d.date))) - backrectWidth / 2;
			});
			graphLineETH.datum(data).attr("d", lineETH);
			graphLineClassA.datum(data).attr("d", lineClassA);
			graphLineClassB.datum(data).attr("d", lineClassB);
			resetDots
				.data(data)
				.attr("cx", (d: IPriceData) => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.attr("cy", (d: IPriceData) => {
					return ry(d.ClassB);
				});
		}
		*/
	};
	/*
	public update: Update<IPriceChartStates> = (el, props, state) => {
		const { name, data, pickedPriceDatum } = state;
		const { width, height } = props;
	};
	*/
	public destroy = (el: Element) => {
		d3.select(el).remove();
	};
}
