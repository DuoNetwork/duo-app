import * as d3 from "d3";
import {IPriceData, IPriceDatum, IMVData, IMVDatum} from "./Chart";
const moment = require("moment");

const chartTopOffset = 60;
const colorIncreaseFill = "rgba(94,137,50,1)";
const colorDecreaseFill = "rgba(140,41,41,1)";
const colorIncreaseStroke = "rgba(136,208,64,1)";
const colorDecreaseStroke = "rgba(214,48,48,1)";
const colorIncreaseFillV = "rgba(56,82,30,0.4)";
const colorDecreaseFillV = "rgba(84,25,25,0.4)";
const colorIncreaseStrokeV = "rgba(104,157,50,0.4)";
const colorDecreaseStrokeV = "rgba(161,39,39,0.4)";
const colorClassA = "rgba(0,186,255,0.7)";
const colorClassB = "rgba(255,129,0,0.7)";
const colorResetDot = "rgba(214,48,48,1)";
const marginP = {top: 40, right: 26, bottom: 25, left: 36};
const marginM = {top: 40, right: 26, bottom: 25, left: 36};

type PriceChartStates = {
	name: string;
	data: IPriceData;
	pickedPriceDatum?: (d: IPriceDatum) => void;
};

type MVChartStates = {
	name: string;
	data: IMVData;
	pickedMVDatum?: (d: IMVDatum) => void;
};

type CreatePirce = (el: Element, props: {windowWidth: number; windowHeight: number}, state: PriceChartStates) => void;
type UpdatePirce = (el: Element, props: {width: number; height: number}, state: PriceChartStates) => void;
type DestroyPirce = (el: Element) => void;

type CreateMV = (el: Element, props: {windowWidth: number; windowHeight: number}, state: MVChartStates) => void;
type UpdateMV = (el: Element, props: {width: number; height: number}, state: MVChartStates) => void;
type DestroyMV = (el: Element) => void;

export class d3PriceChart {
	public create: CreatePirce = (el, props, state) => {
		const {name, data, pickedPriceDatum} = state;
		const {windowWidth, windowHeight} = props;

		let width: number, height: number;

		if (windowWidth >= 1440) {
			width = 518.4 - marginP.left - marginP.right;
		} else if (windowWidth <= 960) {
			width = 345.6 - marginP.left - marginP.right;
		} else {
			width = windowWidth * 0.36 - marginP.left - marginP.right;
		}

		height = windowHeight - marginP.top - marginP.bottom;

		d3.selectAll("#chart-" + name).remove()
		d3.selectAll(".info-bar-" + name).remove()
		d3
			.select(el)
			.append("svg")
			.attr("id", "chart-" + name)
			.attr("width", width + marginP.left + marginP.right)
			.attr("height", height + marginP.top + marginP.bottom);
		//Zoom step
		const zoomStep = 8.64e7;
		const zoomFormat = date => {
			return d3.timeFormat("%b %d")(date);
		};
		const zoomFormatTips = "%Y %b %d";
		const pickFormat = "%b %d";

		//Date range
		const minDate = d3.min(data, d => {
			return Date.parse(d.date);
		});
		const maxDate = d3.max(data, d => {
			return Date.parse(d.date);
		});

		const extentStart = new Date(minDate - zoomStep * 2);
		const extentEnd = new Date(maxDate + zoomStep * 7);
		const start = new Date(minDate - zoomStep * 2);
		const end = new Date(maxDate + zoomStep * 2);
		const xExtent: [Date, Date] = d3.extent([extentStart, extentEnd]);

		//Scales
		const x = d3
			.scaleTime()
			.domain([start, end])
			.range([0, width]);
		const backrectWidth = x(new Date("2000-01-02")) - x(new Date("2000-01-01"));
		const showedData = data.filter((d, i) => {
			const border = data.length - 32 > 0 ? data.length - 32 : 0
			return true;
		});

		const lyMin = d3.min(
				showedData.map(d => {
					return d.ETH;
				})
			),
			lyMax = d3.max(
				showedData.map(d => {
					return d.ETH;
				})
			),
			lyRange = lyMax - lyMin || lyMin * 0.2;
		const ryMin = d3.min(
				showedData.map(d => {
					return d3.min([d.ClassA, d.ClassB]);
				})
			),
			ryMax = d3.max(
				showedData.map(d => {
					return d3.max([d.ClassA, d.ClassB]);
				})
			),
			ryRange = ryMax - ryMin || ryMin * 0.2;
		//Line
		const lineETH = d3
			.line<IPriceDatum>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ly(d.ETH);
			});
		const lineClassA = d3
			.line<IPriceDatum>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ry(d.ClassA);
			});
		const lineClassB = d3
			.line<IPriceDatum>()
			.x(d => {
				return x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return ry(d.ClassB);
			});

		const showColumndata = (d: IPriceDatum): void => {
			const resetText =  + d.InterestCount === 0 ? "Reset Day" : ""
			infoBar.html(
				"Date: <div class = 'Date info-column'>" +
					d3.timeFormat("%b %d")(new Date(Date.parse(d.date))) +
					"</div><div class='legend-ETH'></div> ETH: <div class = 'ETH-price info-column'>" +
					d.ETH.toFixed(2) +
					"</div><div class='legend-ClassA'></div> ClassA: <div class = 'ClassA-price info-column'>" +
					d.ClassA.toFixed(2) +
					"</div><div class='legend-ClassB'></div> ClassB: <div class = 'ClassB-price info-column'>" +
					d.ClassB.toFixed(2) +
					"</div><div class='reset-text'>" + resetText + "</div>"
			);
		};

		const ly = d3
			.scaleLinear()
			.domain([lyMin - 0.2 * lyRange > 0 ? lyMin - 0.2 * lyRange : 0, lyMax + 0.2 * lyRange])
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

		const zoom = d3
			.zoom()
			.scaleExtent([0.5, 5])
			.translateExtent([
				[x(new Date(xExtent[0].toString())), -Infinity],
				[x(new Date(xExtent[1].toString())), Infinity]
			])
			.on("zoom", zoomed);
		//Infor Bars
		const infoBar = d3
			.select(el)
			.append("div")
			.attr("class", "info-bar-" + name)
			.html("No datum picked");

		
		//Chart
		const chart = d3
			.select(el)
			.select("#chart-" + name)
			.append("g")
			.attr("class", "graph-area-" + name)
			.attr("transform", "translate(" + marginP.left + "," + marginP.top + ")");
		const aX = chart
			.append("g")
			.attr("class", "x-axis-" + name)
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		aX.selectAll("text").style("text-anchor", "middle");
		const laY = chart
			.append("g")
			.attr("class", "ly-axis-" + name)
			.call(lyAxis);
		const raY = chart
			.append("g")
			.attr("class", "ry-axis-" + name)
			.attr("transform", "translate(" + width + ", 0)")
			.call(ryAxis);
		raY.selectAll("text").style("text-anchor", "start");

		//Chart Data
		chart
			.append("defs")
			.append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("x", 1)
			.attr("y", 0)
			.attr("width", width - 1)
			.attr("height", height);
		const chartdata = chart
			.append("g")
			.attr("class", "chart-data")
			.attr("clip-path", "url(#clip)");

		chartdata
			.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "single-bar-" + name);
		const bars = chartdata.selectAll("g");
		bars
			.data(data)
			.exit()
			.remove();
		//Bar Backgrounds
		const barBackground = bars
			.append("rect")
			.attr("class", "bar-background")
			.attr("x", (d: IPriceDatum) => {
				return x(new Date(Date.parse(d.date))) - backrectWidth / 2;
			})
			.attr("y", 0)
			.attr("width", backrectWidth)
			.attr("height", height)
			.on("mousemove", (d: IPriceDatum) => {
				showColumndata(d);
			});
		//Lines
		const graphLineETH = chartdata
			.append("path")
			.attr("class", "line-ETH")
			.datum(data)
			.attr("d", lineETH)
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1.5);
		const graphLineClassA = chartdata
			.append("path")
			.attr("class", "line-ClassA")
			.datum(data)
			.attr("d", lineClassA)
			.attr("fill", "none")
			.attr("stroke", colorClassA)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1);
		const graphLineClassB = chartdata
			.append("path")
			.attr("class", "line-ClassB")
			.datum(data)
			.attr("d", lineClassB)
			.attr("fill", "none")
			.attr("stroke", colorClassB)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke-width", 1);

		//Reset Points
		const resetDots = bars
			.append("circle")
			.attr("class", "reset-dot")
			.attr("cx", (d: IPriceDatum) => {
				return x(new Date(Date.parse(d.date)));
			})
			.attr("cy", (d: IPriceDatum) => {
				return ry(d.ClassB);
			})
			.attr("r", (d: IPriceDatum) => {
				return d.InterestCount === 0 ? 3 : 0;
			})
			.attr("stroke", "none")
			.attr("fill", colorResetDot)

		//chart.call(zoom).on("wheel.zoom", null);

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
			ly.domain([lyMin - 0.2 * lyRange > 0 ? lyMin - 0.2 * lyRange : 0, lyMax + 0.2 * lyRange]);
			ry.domain([ryMin - 0.2 * ryRange > 0 ? ryMin - 0.2 * ryRange : 0, ryMax + 0.2 * ryRange]);
			d3.select(".ly-axis-" + name).call(d3.axisLeft(ly).ticks(5));
			d3.select(".ry-axis-" + name).call(d3.axisRight(ry).ticks(5));
			const lineETH = d3
				.line<IPriceDatum>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ly(d.ETH);
				});
			const lineClassA = d3
				.line<IPriceDatum>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ry(d.ClassA);
				});
			const lineClassB = d3
				.line<IPriceDatum>()
				.x(d => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.y(d => {
					return ry(d.ClassB);
				});
			barBackground.data(data).attr("x", (d: IPriceDatum) => {
				return new_x(new Date(Date.parse(d.date))) - backrectWidth / 2;
			});
			graphLineETH.datum(data).attr("d", lineETH);
			graphLineClassA.datum(data).attr("d", lineClassA);
			graphLineClassB.datum(data).attr("d", lineClassB);
			resetDots
				.data(data)
				.attr("cx", (d: IPriceDatum) => {
					return new_x(new Date(Date.parse(d.date)));
				})
				.attr("cy", (d: IPriceDatum) => {
					return ry(d.ClassB);
				});
		}
	};
	public update: UpdatePirce = (el, props, state) => {
		const {name, data, pickedPriceDatum} = state;
		const {width, height} = props;
	};
	public destroy: DestroyPirce = el => {
		d3.select(el).remove();
	};
}

export class d3MVChart {}
