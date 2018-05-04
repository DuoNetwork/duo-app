import * as React from "react";
import * as d3 from "d3";
import {ISMAOutData, IEMAOutData, ISMAOutDatum, IEMAOutDatum, calSMA, calEMA} from "./LineCal";
import * as moment from "moment";

export type IData = Array<{
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volumn: number;
}>;

type IDatum = {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volumn: number;
};

type ILine = {
	x: number;
	y: number;
};

interface IProps {
	data: IData;
	pickedDatum: (d: IDatum) => void;
	zoomState: number;
	settings: {
		showSMA: boolean;
		showEMA: boolean;
		showVolumn: boolean;
		mainLineType: string;
		linePara: {
			rangeSMA: number;
			sourceSMA: string;
			rangeEMA: number;
			sourceEMA: string;
		};
	};
}

interface IState {
	windowWidth: number;
	windowHeight: number;
}

const Coinname = "Ethereum(ETH)";

//const chartLeftOffset = 0,
const chartTopOffset = 60;
const colorIncreaseFill = "rgba(94,137,50,1)",
	colorDecreaseFill = "rgba(140,41,41,1)",
	colorIncreaseStroke = "rgba(136,208,64,1)",
	colorDecreaseStroke = "rgba(214,48,48,1)",
	colorIncreaseFillV = "rgba(56,82,30,0.4)",
	colorDecreaseFillV = "rgba(84,25,25,0.4)",
	colorIncreaseStrokeV = "rgba(104,157,50,0.4)",
	colorDecreaseStrokeV = "rgba(161,39,39,0.4)",
	colorSMA = "rgba(0,186,255,0.7)",
	colorEMA = "rgba(255,129,0,0.7)";

const margin = {top: 40, right: 60, bottom: 30, left: 60};
let width: number, height: number;

let rectWidth = 11,
	backrectWidth: number;
let xAxistipWidth = 40;

let chart: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
let chartdata: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
let bars: d3.Selection<d3.BaseType, {}, d3.BaseType, {}>;

let new_x: d3.ScaleTime<number, number>, new_y: d3.ScaleLinear<number, number>;

let data_SMA: ISMAOutData, data_EMA: IEMAOutData;

let chart_settings: IProps["settings"];

let drawMainChart = (props: IProps, windowWidth: number, windowHeight: number): void => {
	const {data, pickedDatum, zoomState, settings} = props;

	let x: d3.ScaleTime<number, number>;
	let y: d3.ScaleLinear<number, number>;
	let vy: d3.ScaleLinear<number, number>;
	let py: d3.ScaleLinear<number, number>;

	let xAxis: d3.Axis<number | Date | {valueOf(): number}>;
	let yAxis: d3.Axis<number | Date | {valueOf(): number}>;
	let yAxisV: d3.Axis<number | Date | {valueOf(): number}>;
	let yAxisP: d3.Axis<number | Date | {valueOf(): number}>;
	let xGrid: d3.Axis<number | Date | {valueOf(): number}>;
	let yGrid: d3.Axis<number | Date | {valueOf(): number}>;

	width = windowWidth - margin.left - margin.right;
	height = windowHeight - 400 - margin.top - margin.bottom;
	chart_settings = settings;

	data_SMA = calSMA(data, settings.linePara.rangeSMA, settings.linePara.sourceSMA);
	data_EMA = calEMA(data, settings.linePara.rangeEMA, settings.linePara.sourceEMA);
	//console.log(new Date().getTimezoneOffset())

	//Zoom steps
	let zoomStep: number;
	let zoomFormat: (date: Date) => string;
	let zoomFormatTips: string;
	let pickFormat: string;

	switch (zoomState) {
		case 0:
			zoomStep = 8.64e7;
			zoomFormat = date => {
				return date.getMonth() ? d3.timeFormat("%b %d")(date) : d3.timeFormat("%Y")(date);
			};
			zoomFormatTips = "%Y %b %d";
			pickFormat = "%b %d";
			break;
		case 1:
			zoomStep = 3.6e6;
			zoomFormat = date => {
				return date.getHours() ? d3.timeFormat("%H:%M")(date) : d3.timeFormat("%b %d")(date);
			};
			zoomFormatTips = "%b %d %H:%M";
			pickFormat = "%b %d %H";
			break;
		default:
			zoomStep = 3e6;
			zoomFormat = date => {
				return "%b %d";
			};
			break;
	}
	let maxDate = d3.max(data, d => {
		return d.date;
	});

	let extentStart = new Date(Date.parse(maxDate) - zoomStep * 100);
	let extentEnd = new Date(Date.parse(maxDate) + zoomStep * 10);
	let start = new Date(Date.parse(maxDate) - zoomStep * 30);
	let end = new Date(Date.parse(maxDate) + zoomStep * 2);
	let xExtent: [Date, Date] = d3.extent([extentStart, extentEnd]);

	let isUpday = (d: IDatum): boolean => {
		return d.close > d.open;
	};

	//Scales
	x = d3
		.scaleTime()
		.domain([start, end])
		.range([0, width]);

	//showing range
	let showedData = data.filter((d, i) => {
		return i > data.length - 32;
	});
	let yMin = d3.min(
			showedData.map(d => {
				return d.low;
			})
		),
		yMax = d3.max(
			showedData.map(d => {
				return d.high;
			})
		),
		yRange = yMax - yMin;

	let v_yMax = d3.max(
		showedData.map(d => {
			return d.volumn;
		})
	);

	//Line Calculaiton
	let lineSMA = d3
		.line<ISMAOutDatum>()
		.x(d => {
			return x(new Date(Date.parse(d.date)));
		})
		.y(d => {
			return y(d.SMA);
		});
	let lineEMA = d3
		.line<IEMAOutDatum>()
		.x(d => {
			return x(new Date(Date.parse(d.date)));
		})
		.y(d => {
			return y(d.EMA);
		});

	let lineMountain = d3
		.line<IDatum>()
		.x(d => {
			return x(new Date(Date.parse(d.date)));
		})
		.y(d => {
			return y(d.close);
		});

	let lineMountainArea = d3
		.area<IDatum>()
		.x(d => {
			return x(new Date(Date.parse(d.date)));
		})
		.y0(height)
		.y1(d => {
			return y(d.close);
		});

	let line = d3
		.line<ILine>()
		.x(d => {
			return d.x;
		})
		.y(d => {
			return d.y;
		});

	let showColumndata = (d: IDatum): void => {
		infoBar.html(
			Coinname +
				" O: <div class = '" +
				(isUpday(d) ? "upday-column" : "downday-column") +
				" info-column'>" +
				d.open.toFixed(2) +
				"</div> H: <div class = '" +
				(isUpday(d) ? "upday-column" : "downday-column") +
				" info-column'>" +
				d.high.toFixed(2) +
				"</div> L: <div class = '" +
				(isUpday(d) ? "upday-column" : "downday-column") +
				" info-column'>" +
				d.low.toFixed(2) +
				"</div> C: <div class = '" +
				(isUpday(d) ? "upday-column" : "downday-column") +
				" info-column'>" +
				d.close.toFixed(2) +
				"</div> V: " +
				d.volumn.toFixed(0)
		);
	};

	let showXAxisTip = (d: IDatum): void => {
		let xValue;
		let format = d3.timeFormat(zoomFormatTips);
		xValue = format(new Date(Date.parse(d.date)));
		xAxistip.style("opacity", 1).style("z-index", 8);
		xAxistip
			.html(xValue)
			.style("left", new_x(new Date(Date.parse(d.date))) + margin.left - xAxistipWidth / 2 - 2 + "px")
			.style("top", height + margin.top + 2 + "px");
	};

	let showYAxisTip = () => {
		let yValue;
		yValue = y.invert(d3.event.clientY - chartTopOffset - margin.top).toFixed(2);
		yAxistip.style("opacity", 1).style("z-index", 8);
		yAxistip
			.html(yValue)
			.style("left", margin.left - 40 + "px")
			.style("top", d3.event.clientY - chartTopOffset - 9.5 + "px");
	};

	let showYAxisTipV = () => {
		let yValueV;
		let yPosition = d3.event.clientY - chartTopOffset - margin.top;
		if (yPosition >= height * 2 / 3) {
			yValueV = vy.invert(yPosition).toFixed(0);
			yAxistipV.style("opacity", chart_settings.showVolumn ? 1 : 0).style("z-index", 8);
			yAxistipV
				.html(yValueV)
				.style("left", width + margin.left + 4 + "px")
				.style("top", d3.event.clientY - chartTopOffset - 9.5 + "px");
		} else {
			yAxistipV.style("opacity", 0).style("z-index", -1);
		}
	};

	let showYAxisTipP = () => {
		let yValueP;
		let yPosition = d3.event.clientY - chartTopOffset - margin.top;
		if (yPosition < height * 2 / 3) {
			yValueP = py.invert(yPosition).toFixed(2);
			yAxistipP.style("opacity", 1).style("z-index", 8);
			yAxistipP
				.html(d3.format("+.2%")((yValueP - leftEdgeDatum[0].close) / leftEdgeDatum[0].close))
				.style("left", width + margin.left + 4 + "px")
				.style("top", d3.event.clientY - chartTopOffset - 9.5 + "px");
		} else {
			yAxistipP.style("opacity", 0).style("z-index", -1);
		}
	};

	let hideXAxisTip = () => {
		xAxistip.style("opacity", 0).style("z-index", -1);
	};

	let hideYAxisTip = () => {
		yAxistip.style("opacity", 0).style("z-index", -1);
	};

	let hideYAxisTipV = () => {
		yAxistipV.style("opacity", 0).style("z-index", -1);
	};

	let hideYAxisTipP = () => {
		yAxistipP.style("opacity", 0).style("z-index", -1);
	};

	y = d3
		.scaleLinear()
		.domain([yMin - yRange > 0 ? yMin - yRange : 0, yMax + 0.2 * yRange])
		.range([height, 0]);

	vy = d3
		.scaleLinear()
		.domain([0, v_yMax])
		.range([height, height * 2 / 3]);

	//get left edge datum
	let leftEdgeDate = d3.timeFormat(pickFormat)(x.invert(0));
	let leftEdgeDatum = data.filter(d => {
		return d3.timeFormat(pickFormat)(new Date(Date.parse(d.date))) === leftEdgeDate;
	});
	let pyMin = y.invert(height * 2 / 3),
		pyMax = y.invert(0);
	py = d3
		.scaleLinear()
		.domain([pyMin, pyMax])
		.range([height * 2 / 3, 0]);

	new_x = x;
	new_y = y;
	xAxis = d3
		.axisBottom(x)
		.ticks(8)
		.tickFormat(zoomFormat);
	yAxis = d3.axisLeft(y).ticks(10);

	yAxisV = d3.axisRight(vy).ticks(5);

	yAxisP = d3
		.axisRight(py)
		.ticks(5)
		.tickFormat((d: number) => {
			return d3.format("+.2%")((d - leftEdgeDatum[0].close) / leftEdgeDatum[0].close);
		});

	xGrid = d3
		.axisBottom(x)
		.ticks(8)
		.tickSize(-height)
		.tickFormat(() => "");

	yGrid = d3
		.axisLeft(y)
		.ticks(10)
		.tickSize(-width)
		.tickFormat(() => "");
	//Zoom
	let zoom = d3
		.zoom()
		.scaleExtent([0.5, 5])
		.translateExtent([
			[x(new Date(xExtent[0].toString())), -Infinity],
			[x(new Date(xExtent[1].toString())), Infinity]
		])
		.on("zoom", zoomed);

	switch (zoomState) {
		case 0:
			rectWidth = (x(new Date("2000-01-02")) - x(new Date("2000-01-01"))) * 0.8 - 1;
			backrectWidth = (x(new Date("2000-01-02")) - x(new Date("2000-01-01"))) * 1 + 2;
			break;
		case 1:
			rectWidth = (x(new Date("2000-01-01 01:00:000")) - x(new Date("2000-01-01 00:00:000"))) * 0.8 - 1;
			backrectWidth = (x(new Date("2000-01-01 01:00:000")) - x(new Date("2000-01-01 00:00:000"))) * 1 + 2;
			break;
		default:
			rectWidth = (x(new Date("2000-01-02")) - x(new Date("2000-01-01"))) * 0.8 - 1;
			backrectWidth = (x(new Date("2000-01-02")) - x(new Date("2000-01-01"))) * 1 + 2;
			break;
	}

	//Clear Chart Canvas
	d3.selectAll("g").remove();
	d3.selectAll("rect").remove();
	d3.selectAll("text").remove();
	d3.selectAll("line").remove();
	d3.selectAll(".tooltip").remove();
	d3.selectAll(".x-axis-tip").remove();
	d3.selectAll(".y-axis-tip").remove();
	d3.selectAll(".y-axis-tip-v").remove();
	d3.selectAll(".y-axis-tip-v-percentage").remove();
	d3.selectAll(".track-line").remove();
	d3.selectAll(".info-bar").remove();
	d3.selectAll(".info-column").remove();
	d3.selectAll(".line-sma").remove();
	d3.selectAll(".line-ema").remove();
	d3.selectAll(".line-mountain").remove();
	d3.selectAll(".line-mountain-area").remove();
	d3.selectAll(".line-mountain-base").remove();

	//Info-bar div
	let infoBar = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "info-bar")
		.html(Coinname + " No datum picked");

	//Axis tip div
	let xAxistip = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "x-axis-tip")
		.style("opacity", 0);
	let yAxistip = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "y-axis-tip")
		.style("opacity", 0);
	let yAxistipV = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "y-axis-tip-v")
		.style("opacity", 0);
	let yAxistipP = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "y-axis-tip-v-percentage")
		.style("opacity", 0);
	//Mouse track grid line
	let yLine = d3
		.select("#trade-chart")
		.append("div")
		.attr("class", "track-line")
		.style("width", width - 1 + "px")
		.style("opacity", 0);

	//Chart
	chart = d3
		.select("#chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.on("mousemove", d => {
			yLine
				.style("z-index", 0)
				.style("opacity", 1)
				.style("left", margin.left + 1 + "px")
				.style("top", d3.event.clientY - chartTopOffset - 0.5 + "px");
			showYAxisTip();
			showYAxisTipV();
			showYAxisTipP();
		})
		.on("mouseout", d => {
			yLine.style("opacity", 0).style("z-index", -1);
			hideYAxisTip();
			hideYAxisTipV();
			hideYAxisTipP();
		});

	//Chart Grid
	let gridX = chart
		.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0," + height + ")")
		.call(xGrid);
	let gridY = chart
		.append("g")
		.attr("class", "grid")
		.call(yGrid);

	//Chart Axis
	let gX = chart
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	gX.selectAll("text").style("text-anchor", "middle");

	chart
		.append("g")
		.attr("class", "y-axis")
		.call(yAxis);

	chart
		.append("g")
		.attr("class", "y-axis-v")
		.attr("transform", "translate(" + width + ", 0)")
		.call(yAxisV)
		.selectAll("text")
		.style("text-anchor", "start");

	chart
		.append("g")
		.attr("class", "y-axis-p")
		.attr("transform", "translate(" + width + ", 0)")
		.call(yAxisP)
		.selectAll("text")
		.style("text-anchor", "start");
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
	chartdata = chart
		.append("g")
		.attr("class", "chart-data")
		.attr("clip-path", "url(#clip)");
	chartdata
		.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("class", "single-bar");

	//Gradient fill
	let defs = chartdata.append("defs");
	let gradient = defs
		.append("linearGradient")
		.attr("id", "svgGradient")
		.attr("spreadMethod", "pad")
		.attr("x1", "0%")
		.attr("x2", "0%")
		.attr("y1", "0%")
		.attr("y2", "100%");
	gradient
		.append("stop")
		.attr("offset", "0%")
		.attr("style", "stop-color:rgba(0, 178, 255, 0.7); stop-opacity:0.7;");
	gradient
		.append("stop")
		.attr("offset", "75%")
		.attr("style", "stop-color:rgba(255, 255, 255, 0); stop-opacity:0;");

	bars = chartdata.selectAll("g");
	bars
		.data(data)
		.exit()
		.remove();
	//Bar Backgrounds
	bars
		.append("rect")
		.attr("class", "bar-background")
		.attr("x", (d: IDatum) => {
			return x(new Date(Date.parse(d.date))) - backrectWidth / 2;
		})
		.attr("y", 0)
		.attr("width", backrectWidth)
		.attr("height", height)
		.on("mousemove", (d: IDatum) => {
			showColumndata(d);
		})
		.on("mouseover", (d: IDatum) => {
			showXAxisTip(d);
		})
		.on("mouseout", () => {
			hideXAxisTip();
		});
	//Rectengle Bars
	bars
		.append("rect")
		.attr("class", "bar-rect bar-data")
		.attr("x", (d: IDatum) => {
			return x(new Date(Date.parse(d.date))) - rectWidth / 2;
		})
		.attr("y", (d: IDatum) => {
			return isUpday(d) ? y(d.close) : y(d.open);
		})
		.attr("width", rectWidth)
		.attr("height", (d: IDatum) => {
			return isUpday(d) ? y(d.open) - y(d.close) : y(d.close) - y(d.open);
		})
		.style("fill", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseFill : colorDecreaseFill;
		})
		.style("stroke", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
		})
		.on("mousemove", (d: IDatum) => {
			showColumndata(d);
		})
		.on("mouseover", (d: IDatum) => {
			showXAxisTip(d);
		})
		.on("mouseout", () => {
			hideXAxisTip();
		})
		.on("mousedown", (d: IDatum) => {
			pickedDatum(d);
		});
	//High low lines
	bars
		.append("path")
		.attr("class", "bar-line1  bar-data")
		.attr("d", (d: IDatum) => {
			return line([
				{x: x(new Date(Date.parse(d.date))), y: y(d.high)},
				{x: x(new Date(Date.parse(d.date))), y: isUpday(d) ? y(d.close) : y(d.open)}
			]);
		})
		.style("stroke", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
		})
		.on("mousemove", (d: IDatum) => {
			showColumndata(d);
		})
		.on("mouseover", (d: IDatum) => {
			showXAxisTip(d);
		})
		.on("mouseout", () => {
			hideXAxisTip();
		});
	bars
		.append("path")
		.attr("class", "bar-line2  bar-data")
		.attr("d", (d: IDatum) => {
			return line([
				{x: x(new Date(Date.parse(d.date))), y: y(d.low)},
				{x: x(new Date(Date.parse(d.date))), y: isUpday(d) ? y(d.open) : y(d.close)}
			]);
		})
		.style("stroke", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
		})
		.on("mousemove", (d: IDatum) => {
			showColumndata(d);
		})
		.on("mouseover", (d: IDatum) => {
			showXAxisTip(d);
		})
		.on("mouseout", () => {
			hideXAxisTip();
		});

	//Mountain Line
	chartdata
		.append("path")
		.attr("class", "line-mountain")
		.datum(data)
		.attr("d", lineMountain)
		.attr("fill", "none")
		.attr("stroke", "white")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1);
	chartdata
		.append("path")
		.attr("class", "line-mountain-area")
		.datum(data)
		.attr("d", lineMountainArea)
		.attr("stroke", "none")
		.attr("fill", "url(#svgGradient)");

	//Volumn Bars
	bars
		.append("rect")
		.attr("class", "bar-rect-v")
		.attr("x", (d: IDatum) => {
			return x(new Date(Date.parse(d.date))) - rectWidth / 2;
		})
		.attr("y", (d: IDatum) => {
			return vy(d.volumn);
		})
		.attr("width", rectWidth)
		.attr("height", (d: IDatum) => {
			return height - vy(d.volumn);
		})
		.style("fill", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseFillV : colorDecreaseFillV;
		})
		.style("stroke", (d: IDatum) => {
			return isUpday(d) ? colorIncreaseStrokeV : colorDecreaseStrokeV;
		})
		.on("mousemove", (d: IDatum) => {
			showColumndata(d);
		})
		.on("mouseover", (d: IDatum) => {
			showXAxisTip(d);
		})
		.on("mouseout", () => {
			hideXAxisTip();
		})
		.on("mousedown", (d: IDatum) => {
			pickedDatum(d);
		});

	//SMA
	chartdata
		.append("path")
		.attr("class", "line-sma")
		.datum(data_SMA)
		.attr("d", lineSMA)
		.attr("fill", "none")
		.attr("stroke", colorSMA)
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1);

	//EMA
	chartdata
		.append("path")
		.attr("class", "line-ema")
		.datum(data_EMA)
		.attr("d", lineEMA)
		.attr("fill", "none")
		.attr("stroke", colorEMA)
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1);

	if (!settings.showVolumn) {
		d3.selectAll(".bar-rect-v").style("opacity", 0);
	}

	if (!settings.showSMA) {
		d3.selectAll(".line-sma").style("opacity", 0);
	}
	if (!settings.showEMA) {
		d3.selectAll(".line-ema").style("opacity", 0);
	}
	if (settings.mainLineType !== "mountain") {
		d3.selectAll(".line-mountain").style("opacity", 0);
		d3.selectAll(".line-mountain-area").style("opacity", 0);
	} else {
		d3.selectAll(".bar-data").style("opacity", 0);
	}

	chart.call(zoom);

	//Zoom function
	function zoomed() {
		let transformAxis = d3.event.transform;
		let newExtentEnd: Date;
		let newRangedData: IData;
		new_x = transformAxis.rescaleX(x);

		if (transformAxis.k > 3.5) {
			newExtentEnd = new Date(Date.parse(maxDate) + zoomStep * 2.5);
		} else if (transformAxis.k > 2.5) {
			newExtentEnd = new Date(Date.parse(maxDate) + zoomStep * 5);
		} else if (transformAxis.k > 1.5) {
			newExtentEnd = new Date(Date.parse(maxDate) + zoomStep * 7.5);
		} else {
			newExtentEnd = new Date(Date.parse(maxDate) + zoomStep * 10);
		}
		xExtent = d3.extent([extentStart, newExtentEnd]);
		zoom.translateExtent([
			[x(new Date(xExtent[0].toString())), -Infinity],
			[x(new Date(xExtent[1].toString())), Infinity]
		]);

		gX.call(xAxis.scale(new_x));
		gX.selectAll("text").style("text-anchor", "middle");
		gridX.call(xGrid.scale(new_x));
		newRangedData = data.filter(d => {
			return (
				moment(d.date).isAfter(new_x.invert(-rectWidth)) &&
				moment(d.date).isBefore(new_x.invert(width + rectWidth))
			);
		});

		let new_vy = vy,
			new_py = py;
		let new_yMin = Number(
				d3.min(
					newRangedData.map(d => {
						return d.low;
					})
				)
			),
			new_yMax = Number(
				d3.max(
					newRangedData.map(d => {
						return d.high;
					})
				)
			),
			new_yRange = new_yMax - new_yMin;
		let new_v_yMax = d3.max(
			newRangedData.map(d => {
				return d.volumn;
			})
		);

		new_y.domain([new_yMin - new_yRange > 0 ? new_yMin - new_yRange : 0, new_yMax + 0.2 * new_yRange]);
		new_vy.domain([0, new_v_yMax]);
		leftEdgeDate = d3.timeFormat(pickFormat)(new_x.invert(0));

		leftEdgeDatum = data.filter(d => {
			return d3.timeFormat(pickFormat)(new Date(Date.parse(d.date))) === leftEdgeDate;
        });
        
		pyMin = new_y.invert(height * 2 / 3);
		pyMax = new_y.invert(0);
		new_py.domain([pyMin, pyMax]);
		gridY.call(yGrid.scale(new_y).ticks(10));
		d3.selectAll(".y-axis").call(
			d3
				.axisLeft(new_y)
				.ticks(10)
		);
		d3.selectAll(".y-axis-v").call(
			d3
				.axisRight(new_vy)
				.ticks(5)
		);
		d3
			.selectAll(".y-axis-v")
			.selectAll("text")
			.style("text-anchor", "start");
		d3.selectAll(".y-axis-p").call(
			d3
				.axisRight(new_py)
				.ticks(5)
				.tickFormat((d:number) => {
					return d3.format("+.2%")((d - leftEdgeDatum[0].close) / leftEdgeDatum[0].close);
				})
		);
		d3
			.selectAll(".y-axis-p")
			.selectAll("text")
			.style("text-anchor", "start");
		switch (zoomState) {
			case 0:
				rectWidth = (new_x(new Date("2000-01-02")) - new_x(new Date("2000-01-01"))) * 0.8 - 1;
				backrectWidth = (new_x(new Date("2000-01-02")) - new_x(new Date("2000-01-01"))) * 1 + 2;
				break;
			case 1:
				rectWidth =
					(new_x(new Date("2000-01-01 01:00:000")) - new_x(new Date("2000-01-01 00:00:000"))) * 0.8 - 1;
				backrectWidth =
					(new_x(new Date("2000-01-01 01:00:000")) - new_x(new Date("2000-01-01 00:00:000"))) * 1 + 2;
				break;
			default:
				rectWidth = (new_x(new Date("2000-01-02")) - new_x(new Date("2000-01-01"))) * 0.8 - 1;
				backrectWidth = (new_x(new Date("2000-01-02")) - new_x(new Date("2000-01-01"))) * 1 + 2;
				break;
		}

		let new_lineSMA = d3
			.line<ISMAOutDatum>()
			.x(d => {
				return new_x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return new_y(d.SMA);
			});
		let new_lineEMA = d3
			.line<IEMAOutDatum>()
			.x(d => {
				return new_x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return new_y(d.EMA);
			});
		let new_lineMountain = d3
			.line<IDatum>()
			.x(d => {
				return new_x(new Date(Date.parse(d.date)));
			})
			.y(d => {
				return new_y(d.close);
			});
		let new_lineMountainArea = d3
			.area<IDatum>()
			.x(d => {
				return new_x(new Date(Date.parse(d.date)));
			})
			.y0(height)
			.y1(d => {
				return new_y(d.close);
			});
	
		d3
			.selectAll(".bar-background")
			.data(data)
			.attr("x", d => {
				return new_x(new Date(Date.parse(d.date))) - backrectWidth / 2;
			})
			.attr("width", backrectWidth);
		d3
			.selectAll(".bar-rect")
			.data(data)
			.attr("x", d => {
				return new_x(new Date(Date.parse(d.date))) - rectWidth / 2;
			})
			.attr("y", d => {
				return isUpday(d) ? new_y(d.close) : new_y(d.open);
			})
			.attr("width", rectWidth)
			.attr("height", d => {
				return isUpday(d) ? new_y(d.open) - new_y(d.close) : new_y(d.close) - new_y(d.open);
			});
		d3
			.selectAll(".bar-line1")
			.data(data)
			.attr("d", d => {
				return line([
					{x: new_x(new Date(Date.parse(d.date))), y: y(d.high)},
					{x: new_x(new Date(Date.parse(d.date))), y: isUpday(d) ? y(d.close) : y(d.open)}
				]);
			});
		d3
			.selectAll(".bar-line2")
			.data(data)
			.attr("d", d => {
				return line([
					{x: new_x(new Date(Date.parse(d.date))), y: y(d.low)},
					{x: new_x(new Date(Date.parse(d.date))), y: isUpday(d) ? y(d.open) : y(d.close)}
				]);
			});
		d3
			.selectAll(".bar-rect-v")
			.data(data)
			.attr("x", d => {
				return new_x(new Date(Date.parse(d.date))) - rectWidth / 2;
			})
			.attr("y", d => {
				return new_vy(d.volumn);
			})
			.attr("width", rectWidth)
			.attr("height", d => {
				return height - new_vy(d.volumn);
			});
		d3
			.selectAll(".line-sma")
			.datum(data_SMA)
			.attr("d", new_lineSMA);
		d3
			.selectAll(".line-ema")
			.datum(data_EMA)
			.attr("d", new_lineEMA);
		d3
			.selectAll(".line-mountain")
			.datum(data)
			.attr("d", new_lineMountain);
		d3
			.selectAll(".line-mountain-area")
			.datum(data)
			.attr("d", new_lineMountainArea);
	}
};

let updateMainChart = props => {
	const {settings} = props;
	chart_settings = settings;
	if (settings.mainLineType === "mountain") {
		d3.selectAll(".line-mountain").style("opacity", 1);
		d3.selectAll(".line-mountain-area").style("opacity", 1);
		d3.selectAll(".bar-data").style("opacity", 0);
	} else {
		d3.selectAll(".line-mountain").style("opacity", 0);
		d3.selectAll(".line-mountain-area").style("opacity", 0);
		d3.selectAll(".bar-data").style("opacity", 1);
	}
	if (settings.showSMA) {
		d3.selectAll(".line-sma").style("opacity", 1);
	} else {
		d3.selectAll(".line-sma").style("opacity", 0);
	}
	if (settings.showEMA) {
		d3.selectAll(".line-ema").style("opacity", 1);
	} else {
		d3.selectAll(".line-ema").style("opacity", 0);
	}
	if (settings.showVolumn) {
		d3.selectAll(".bar-rect-v").style("opacity", 1);
		d3.selectAll(".y-axis-tip-v").style("opacity", 1);
	} else {
		d3.selectAll(".bar-rect-v").style("opacity", 0);
		d3.selectAll(".y-axis-tip-v").style("opacity", 0);
	}
};

let updateLines = props => {
	const {data, settings} = props;
	data_SMA = calSMA(data, parseInt(settings.linePara.rangeSMA, 10), settings.linePara.sourceSMA);
	data_EMA = calEMA(data, parseInt(settings.linePara.rangeEMA, 10), settings.linePara.sourceEMA);
	let new_lineSMA = d3
		.line<ISMAOutDatum>()
		.x(d => {
			return new_x(new Date(Date.parse(d.date)));
		})
		.y(d => {
			return new_y(d.SMA);
		});
	let new_lineEMA = d3
		.line<IEMAOutDatum>()
		.x(d => {
			return new_x(new Date(Date.parse(d.date)));
		})
		.y(d => {
			return new_y(d.EMA);
		});
	d3
		.selectAll(".line-sma")
		.datum(data_SMA)
		.attr("d", new_lineSMA);
	d3
		.selectAll(".line-ema")
		.datum(data_EMA)
		.attr("d", new_lineEMA);
};

export class D3Chart extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
	}
	updateDimensions() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	}
	componentDidMount() {
		drawMainChart(this.props, this.state.windowWidth, this.state.windowHeight);
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}

	shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		if (nextState.windowHeight !== this.state.windowHeight || nextState.windowWidth !== this.state.windowWidth) {
			drawMainChart(this.props, nextState.windowWidth, nextState.windowHeight);
			console.log("Redraw chart (New window size)");
			return true;
		}
		if (nextProps.data && JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
			//redraw when data is changed
			console.log("Redraw chart (New dataset)");
			drawMainChart(nextProps, this.state.windowWidth, this.state.windowHeight);
			return false;
		}
		if (JSON.stringify(nextProps.settings) !== JSON.stringify(this.props.settings)) {
			//update when settings are changed
			console.log("Update chart (New settings)");
			updateMainChart(nextProps);
			updateLines(nextProps);
			return false;
		}
		console.log("Did not redraw (No data/settings change)");
		return false;
	}

	render() {
		return (
			<div id="trade-chart">
				<svg id="chart" />
			</div>
		);
	}
}
