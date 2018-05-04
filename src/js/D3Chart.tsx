import * as React from "react";
import * as d3 from "d3";

export type IData = Array<{
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
}>

let colorIncreaseFill = "rgba(94,137,50,1)",
    colorDecreaseFill = "rgba(140,41,41,1)",
    colorIncreaseStroke = "rgba(136,208,64,1)",
    colorDecreaseStroke = "rgba(214,48,48,1)";
let margin = {top: 20, right: 30, bottom: 30, left: 40};
let width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    rectWidth = 11,
    barH = 20;
let tooltipLineHeight = 10;
let chart, chartdata, bars;

let drawMainChart = (props: {data: IData}) => {
    const data = props.data;
    let x, y, x0;
    let xAxis, yAxis;

    let maxDate = d3.max(data, d => {
        return d.date;
    });

    let minDate = d3.min(data, d => {
        return d.date;
    });
    let start = new Date(Date.parse(minDate) - 8.64e7);
    let end = new Date(Date.parse(maxDate) + 8.64e7);

    let isUpday = d => {
        return d.close > d.open;
    };

    let line = d3
        .line()
        .x((d: any) => {
            return d.x;
        })
        .y((d: any) => {
            return d.y;
        });

    //grid line
    function makeXGrid() {
        return d3.axisBottom(x).ticks(5);
    }
    function makeYGrid() {
        return d3.axisLeft(y).ticks(5);
    }

    console.log(start);
    console.log(end);
    x = d3
        .scaleTime()
        .domain([start, end])
        .range([0, width /*(rectWidth + 20) * (data.length + 1)*/]);
    x0 = d3
        .scaleBand()
        .rangeRound([0, rectWidth * data.length])
        .padding(0)
        .domain(
            data.map(d => {
                return d.date;
            })
        );
    y = d3
        .scaleLinear()
        .domain([
            d3.min(
                data.map(d => {
                    return d.low;
                })
            ) - 2,
            d3.max(
                data.map(d => {
                    return d.high;
                })
            ) + 2
        ])
        .range([height, 0]);
    xAxis = (d3 as any)
        .axisBottom()
        .scale(x)
        .ticks(5);
    yAxis = (d3 as any).axisLeft().scale(y);

    d3.selectAll("g").remove();
    d3.selectAll("rect").remove();
    d3.selectAll("text").remove();
    d3.selectAll("line").remove();
    d3.selectAll(".tooltip").remove();
    //tooltip div
    let tooltip = d3
        .select("#trade-chart")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Chart
    chart = d3
        .select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //Chart Grid
    chart
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(
            makeXGrid()
                .tickSize(-height)
                .tickFormat(() => "")
        );
    chart
        .append("g")
        .attr("class", "grid")
        .call(
            makeYGrid()
                .tickSize(-width)
                .tickFormat(() => "")
        );
    //Chart Axis
    chart
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");

    chart
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);
    //Chart Data
    chartdata = chart.append("g")
    chartdata
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "single-bar");
    bars = chartdata.selectAll("g");

    bars
        .data(data)
        .exit()
        .remove();
    //Bar Backgrounds
    bars
        .append("rect")
        .attr("class", "bar-background")
        .attr("x", d => {
            return x(new Date(Date.parse(d.date))) - rectWidth / 2 - 2.5;
        })
        .attr("y", 0)
        .attr("width", rectWidth + 3)
        .attr("height", height);
    //Rectengle Bars
    bars
        .append("rect")
        .attr("class", "bar-rect")
        .attr("x", d => {
            return x(new Date(Date.parse(d.date))) - rectWidth / 2;
        })
        .attr("y", d => {
            return isUpday(d) ? y(d.close) : y(d.open);
        })
        .attr("width", rectWidth - 2)
        .attr("height", d => {
            return isUpday(d) ? y(d.open) - y(d.close) : y(d.close) - y(d.open);
        })
        .style("fill", d => {
            return isUpday(d) ? colorIncreaseFill : colorDecreaseFill;
        })
        .style("stroke", d => {
            return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
        })
        .on("mouseover", d => {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 1)
                .style("z-index", 9);
            tooltip
                .html(
                    "O: " +
                    d.open.toFixed(2) +
                    "<br/>H: " +
                    d.high.toFixed(2) +
                    "<br/>L: " +
                    d.low.toFixed(2) +
                    "<br/>C: " +
                    d.close.toFixed(2)
                )
                .style("left", d3.event.pageX - 15 + "px")
                .style("top", d3.event.pageY - 70 + "px");
        })
        .on("mouseout", d => {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 0)
                .style("z-index", -1);
        });
    //High low lines
    bars
        .append("path")
        .attr("d", d => {
            return (line as any)([
                {x: x(new Date(Date.parse(d.date))) - 1, y: y(d.high)},
                {x: x(new Date(Date.parse(d.date))) - 1, y: isUpday(d) ? y(d.close) : y(d.open)}
            ]);
        })
        .style("stroke", d => {
            return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
        });
    bars
        .append("path")
        .attr("d", d => {
            return (line as any)([
                {x: x(new Date(Date.parse(d.date))) - 1, y: y(d.low)},
                {x: x(new Date(Date.parse(d.date))) - 1, y: isUpday(d) ? y(d.open) : y(d.close)}
            ]);
        })
        .style("stroke", d => {
            return isUpday(d) ? colorIncreaseStroke : colorDecreaseStroke;
        });
    //Tooltips
    /*
    bars
        .append("text")
        .attr("x", d => {
            return x(new Date(Date.parse(d.date))) - 12;
        })
        .attr("y", d => {
            return isUpday(d) ? y(d.low) + 10 : y(d.high) - 6;
        })
        .text(d => {
            return (d.open).toFixed(1);
        })
        .attr("style", () => {
            return "text-anchor: middle; font-size: 6px";
        });
    bars
        .append("text")
        .attr("x", d => {
            return x(new Date(Date.parse(d.date)));
        })
        .attr("y", d => {
            return isUpday(d) ? y(d.high) - 6 : y(d.low) + 10;
        })
        .text(d => {
            return (d.close).toFixed(1);
        })
        .attr("style", () => {
            return "text-anchor: middle; font-size: 6px";
        });
    */
};

let updateMainChart = props => {
    const data = props.data;
    let rect, text, x;
    x = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, width]);
    bars = chart.selectAll("g");
    bars
        .data(data)
        .exit()
        .remove();
    let newBars = bars
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            return "translate(0," + i * barH + ")";
        });
    rect = bars.select("rect");
    text = bars.select("text");
    rect.transition(500).attr("width", x);
    text
        .transition(500)
        .attr("x", d => {
            return x(d) - 3;
        })
        .text(d => {
            return d;
        });
};

export class D3Chart extends React.Component<{data: IData}> {
    componentDidMount() {
        drawMainChart(this.props);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.data) {
            drawMainChart(nextProps);
        }
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
