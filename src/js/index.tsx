import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as d3 from "d3";
import {D3Chart, IData} from "./D3Chart";
import "./style.css";
const mockdata: IData = require("./Data/MockData.json");
const mockdata1: IData = require("./Data/MockData1.json");

type IDatum = {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
};

interface IState {
	zoom: number;
	data: IData;
	currentdata: IDatum;
	showSMA: boolean;
	showEMA: boolean;
	showVolumn: boolean;
	mainLineType: string;
	rangeSMA: number;
	sourceSMA: string;
	rangeEMA: number;
	sourceEMA: string;
}

class Root extends React.PureComponent<{}, IState> {
	private InputrangeSMA: HTMLInputElement;
	private InputsourceSMA: HTMLInputElement;
	private InputrangeEMA: HTMLInputElement;
	private InputsourceEMA: HTMLInputElement;

	constructor(props) {
		super(props);
		this.pickedDatum = this.pickedDatum.bind(this);
		this.state = {
			//zoom 0:day, 1:hour
			zoom: 0,
			data: mockdata,
			currentdata: null,
			showSMA: false,
			showEMA: false,
			showVolumn: true,
			mainLineType: "candlestick",
			rangeSMA: 5,
			sourceSMA: "close",
			rangeEMA: 5,
			sourceEMA: "close"
		};
	}

	pickedDatum = (d: IDatum) => {
		this.setState({
			currentdata: d
		});
	};

	handleClick1 = () => {
		this.setState({
			zoom: 0,
			data: mockdata,
			currentdata: null
		});
	};

	handleClick2 = () => {
		this.setState({
			zoom: 1,
			data: mockdata1,
			currentdata: null
		});
	};

	handleLine = () => {
		this.setState({
			rangeSMA: Number(this.InputrangeSMA.value) || 5,
			sourceSMA: this.InputsourceSMA.value || "close",
			rangeEMA: Number(this.InputrangeEMA.value) || 5,
			sourceEMA: this.InputsourceEMA.value || "close"
		});
	};

	handleShowSMA = () => {
		let newShowSMA = !this.state.showSMA;
		this.setState({
			showSMA: newShowSMA
		});
	};

	handleShowEMA = () => {
		let newShowEMA = !this.state.showEMA;
		this.setState({
			showEMA: newShowEMA
		});
	};

	handleShowVolumn = () => {
		let newShowVolumn = !this.state.showVolumn;
		this.setState({
			showVolumn: newShowVolumn
		});
	};

	handleMainLineType = (type: string) => {
		this.setState({
			mainLineType: type
		});
	};
	render() {
		const {
			data,
			currentdata,
			zoom,
			showSMA,
			showEMA,
			showVolumn,
			mainLineType,
			rangeSMA,
			sourceSMA,
			rangeEMA,
			sourceEMA
		} = this.state;
		let date: string;
		let format = d3.timeFormat("%Y %b %d %H:%M");
		let linePara = {
			rangeSMA: rangeSMA,
			sourceSMA: sourceSMA,
			rangeEMA: rangeEMA,
			sourceEMA: sourceEMA
		};
		let settings = {
			showSMA: showSMA,
			showEMA: showEMA,
			showVolumn: showVolumn,
			mainLineType: mainLineType,
			linePara: linePara
		};
		date = currentdata ? format(new Date(Date.parse(currentdata.date))) : undefined;

		return (
			<div className="App">
				<div style={{display: "flex", flexDirection: "row"}}>
					<button className="change-button" onClick={this.handleClick1}>
						Data 1 (Daily)
					</button>
					<button className="change-button" onClick={this.handleClick2}>
						Data 2 (Hourly)
					</button>
					<input name="showSMA" type="checkbox" checked={showVolumn} onChange={this.handleShowVolumn} />
					<span style={{color: "white", fontSize: 12}}>Volumn</span>
					<input name="showSMA" type="checkbox" checked={showSMA} onChange={this.handleShowSMA} />
					<span style={{color: "white", fontSize: 12}}>SMA</span>
					<ul className="line-settings">
						<li>
							<span>range</span>
							<input
								ref={i => {
									this.InputrangeSMA = i;
								}}
								placeholder={rangeSMA.toString()}
								style={{width: 50, marginLeft: 5}}
							/>
						</li>
						<li>
							<span>source</span>
							<input
								ref={i => {
									this.InputsourceSMA = i;
								}}
								placeholder={sourceSMA}
								style={{width: 50, marginLeft: 5}}
							/>
						</li>
					</ul>
					<input name="showEMA" type="checkbox" checked={showEMA} onChange={this.handleShowEMA} />
					<span style={{color: "white", fontSize: 12}}>EMA</span>
					<ul className="line-settings">
						<li>
							<span>range</span>
							<input
								ref={i => {
									this.InputrangeEMA = i;
								}}
								placeholder={rangeEMA.toString()}
								style={{width: 50, marginLeft: 5}}
							/>
						</li>
						<li>
							<span>source</span>
							<input
								ref={i => {
									this.InputsourceEMA = i;
								}}
								placeholder={sourceEMA}
								style={{width: 50, marginLeft: 5}}
							/>
						</li>
					</ul>
					<button className="change-button" onClick={this.handleLine}>
						Update Lines
					</button>
					<span style={{color: "white", fontSize: 12, marginLeft: 10}}>Graph Type:</span>
					<input
						name="mainLineType"
						type="checkbox"
						checked={mainLineType === "candlestick"}
						onChange={() => this.handleMainLineType("candlestick")}
					/>
					<span style={{color: "white", fontSize: 12}}>Candlestick</span>
					<input
						name="mainLineType"
						type="checkbox"
						checked={mainLineType === "mountain"}
						onChange={() => this.handleMainLineType("mountain")}
					/>
					<span style={{color: "white", fontSize: 12}}>Mountain</span>
				</div>
				<div className="d3chart-container">此处应该有Chart</div>
				<div style={{position: "absolute", top: "650px", left: "20px", color: "white"}}>
					<span>Current Datum: </span>
					<span>
						{currentdata
							? date +
							  " O:" +
							  currentdata.open.toFixed(2) +
							  " H:" +
							  currentdata.high.toFixed(2) +
							  " L:" +
							  currentdata.low.toFixed(2) +
							  " C:" +
							  currentdata.close.toFixed(2)
							: "No datum picked"}
					</span>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));
