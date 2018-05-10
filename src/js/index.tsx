import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as d3 from "d3";
import {PriceChart, IPriceData, IPriceDatum, IMVData, IMVDatum} from "./Chart";
import Message from "./Message";
import "./style.css";
const mockdata: IPriceData = require("./Data/ETH_A_B.json");
const format = d3.timeFormat("%Y %b %d");

interface IState {
	dataPrice: IPriceData;
	dataMV: IMVData;
	currentmvdata: IMVDatum;
	currentDayCounter: number;
	currentPriceData: IPriceData;
	assets: Assets;
	ETHIn: string;
	CreationIn: string;
	RedemptionIn: string;
	ClassAIn: string;
	ClassBIn: string;
	ETH: number;
	lastResetETHPrice: number;
	Creation: number;
	Redemption: number;
	ClassA: number;
	ClassB: number;
	msgType: string;
	msgContent: string;
	msgShow: number;
	history: Array<string>;
}

type Assets = {
	USD: number;
	ETH: number;
	ClassA: number;
	ClassB: number;
};

class Root extends React.PureComponent<{}, IState> {
	constructor(props) {
		super(props);
		this.pickedPriceDatum = this.pickedPriceDatum.bind(this);
		this.state = {
			dataPrice: mockdata,
			dataMV: {} as IMVData,
			currentmvdata: null,
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: {
				USD: 50000,
				ETH: 0,
				ClassA: 0,
				ClassB: 0
			},
			ETHIn: "",
			lastResetETHPrice: mockdata[0].ETH,
			CreationIn: "",
			RedemptionIn: "",
			ClassAIn: "",
			ClassBIn: "",
			ETH: 0,
			Creation: 0,
			Redemption: 0,
			ClassA: 0,
			ClassB: 0,
			msgType: "msg type",
			msgContent: "msg content",
			msgShow: 0,
			history: []
		};
	}

	componentDidMount() {
		console.log("Welcome to DUO Demo!");
	}

	round = num => {
		return +(Math.round((num + "e+2") as any) + "e-2");
	};

	handleNextDay = () => {
		const {USD, ETH, ClassA, ClassB} = this.state.assets;
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const nextPrice = this.state.currentPriceData[this.state.currentPriceData.length - 1];
		const i = this.state.currentDayCounter;
		const dataSet = mockdata.slice(0, i + 2);
		const mvBeforeReset = USD + ETH * nextPrice.ETH + ClassA * nextPrice.ClassAbeforeReset + ClassB * nextPrice.ClassBbeforeReset;
		let newAssets;
		if (nextPrice.ResetType) {
			switch (nextPrice.ResetType) {
				case "upward": {					
					console.log(mvBeforeReset);
					const resetETHAmount =
						((nextPrice.ClassAbeforeReset - 1) * ClassA + (nextPrice.ClassBbeforeReset - 1) * ClassB) /
						nextPrice.ETH;
					const rETH = ETH + resetETHAmount;
					newAssets = {
						USD: USD,
						ETH: rETH,
						ClassA: ClassA,
						ClassB: ClassB,
					};
					break;
				}
				default: {
					console.log(mvBeforeReset);
					const resetETHAmount = (nextPrice.ClassAbeforeReset - nextPrice.ClassBbeforeReset) * ClassA / nextPrice.ETH,
						resetClassAAmount = ClassA * nextPrice.ClassBbeforeReset,
						resetClassBAmount = ClassB * nextPrice.ClassBbeforeReset;
					const rETH = ETH + resetETHAmount;
					newAssets = {
						USD: USD,
						ETH: rETH,
						ClassA: resetClassAAmount,
						ClassB: resetClassBAmount
					}
					break;
				}
			}
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet,
				assets: newAssets,
				lastResetETHPrice: nextPrice.ETH,
				msgType: "<div style='color: rgba(0,186,255,0.7)'>Information</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .8)'>Reset (" + nextPrice.ResetType + ") triggered.</div>",
				msgShow: 1
			});
		} else {
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet
			});
		}
	};

	/*
	handleNextFiveDay = () => {
		const i = this.state.currentDayCounter;
		const dataSet = mockdata.slice(0, i + 5);
		this.setState({
			currentDayCounter: i + 5,
			currentPriceData: dataSet
		});
	};
	*/

	handleRefresh = () => {
		this.setState({
			dataMV: {} as IMVData,
			currentmvdata: null,
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: {
				USD: 50000,
				ETH: 0,
				ClassA: 0,
				ClassB: 0
			},
			ETH: 0,
			lastResetETHPrice: mockdata[0].ETH,
			Creation: 0,
			Redemption: 0,
			ClassA: 0,
			ClassB: 0,
			msgType: "msg type",
			msgContent: "msg content",
			msgShow: 0,
			history: []
		});
	};

	pickedPriceDatum = (d: IPriceDatum) => {
		this.setState({});
	};

	pickerMVDatum = (d: IMVDatum) => {
		this.setState({});
	};

	handleBuyETH = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ETH, history} = this.state;
		const valueETH = this.state.ETH * currentPrice.ETH;
		if (ETH && ETH > 0) {
			if (valueETH <= assets.USD) {
				const rUSD = assets.USD - valueETH;
				const newAssets: Assets = {
					USD: rUSD,
					ETH: assets.ETH + ETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Bought " +
						d3.formatPrefix(",.2", 1)(ETH) +
						" ETH with $" +
						d3.formatPrefix(",.2", 1)(ETH * currentPrice.ETH) +
						" USD."
				);
				this.setState({
					ETH: 0,
					ETHIn: "",
					assets: newAssets,
					history: newHistory,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ETH) +
						" ETH</span> with <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ETH * currentPrice.ETH) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ETH: 0,
					ETHIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient USD balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ETH: 0,
				ETHIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleSellETH = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ETH, history} = this.state;
		const valueETH = this.state.ETH * currentPrice.ETH;
		if (ETH && ETH > 0) {
			if (ETH <= assets.ETH) {
				const rETH = assets.ETH - ETH;
				const newAssets: Assets = {
					USD: assets.USD + valueETH,
					ETH: assets.ETH - ETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Sold " +
						d3.formatPrefix(",.2", 1)(ETH) +
						" ETH for $" +
						d3.formatPrefix(",.2", 1)(ETH * currentPrice.ETH) +
						" USD."
				);
				this.setState({
					ETH: 0,
					ETHIn: "",
					assets: newAssets,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You sold <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ETH) +
						" ETH</span> for <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ETH * currentPrice.ETH) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ETH: 0,
					ETHIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ETH: 0,
				ETHIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleBuyClassA = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ClassA, history} = this.state;
		const valueClassA = this.state.ClassA * currentPrice.ClassA;
		if (ClassA && ClassA > 0) {
			if (valueClassA <= assets.USD) {
				const rUSD = assets.USD - valueClassA;
				const newAssets: Assets = {
					USD: rUSD,
					ETH: assets.ETH,
					ClassA: assets.ClassA + ClassA,
					ClassB: assets.ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Bought " +
						d3.formatPrefix(",.2", 1)(ClassA) +
						" ClassA with $" +
						d3.formatPrefix(",.2", 1)(ClassA * currentPrice.ClassA) +
						" USD."
				);
				this.setState({
					ClassA: 0,
					ClassAIn: "",
					assets: newAssets,
					history: newHistory,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ClassA) +
						" ClassA</span> with <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ClassA * currentPrice.ClassA) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassA: 0,
					ClassAIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient USD balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassA: 0,
				ClassAIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleSellClassA = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ClassA, history} = this.state;
		const valueClassA = this.state.ClassA * currentPrice.ClassA;
		if (ClassA && ClassA > 0) {
			if (ClassA <= assets.ClassA) {
				const rClassA = assets.ClassA - ClassA;
				const newAssets: Assets = {
					USD: assets.USD + valueClassA,
					ETH: assets.ETH,
					ClassA: assets.ClassA - ClassA,
					ClassB: assets.ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Sold " +
						d3.formatPrefix(",.2", 1)(ClassA) +
						" ClassA for $" +
						d3.formatPrefix(",.2", 1)(ClassA * currentPrice.ClassA) +
						" USD."
				);
				this.setState({
					ClassA: 0,
					ClassAIn: "",
					assets: newAssets,
					history: newHistory,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ClassA) +
						" ClassA</span> with <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ClassA * currentPrice.ClassA) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassA: 0,
					ClassAIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassA: 0,
				ClassAIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleBuyClassB = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ClassB, history} = this.state;
		const valueClassB = this.state.ClassB * currentPrice.ClassB;
		if (ClassB && ClassB > 0) {
			if (valueClassB <= assets.USD) {
				const rUSD = assets.USD - valueClassB;
				const newAssets: Assets = {
					USD: rUSD,
					ETH: assets.ETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB + ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Bought " +
						d3.formatPrefix(",.2", 1)(ClassB) +
						" ClassB with $" +
						d3.formatPrefix(",.2", 1)(ClassB * currentPrice.ClassB) +
						" USD."
				);
				this.setState({
					ClassB: 0,
					ClassBIn: "",
					assets: newAssets,
					history: newHistory,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ClassB) +
						" ClassB</span> with <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ClassB * currentPrice.ClassB) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassB: 0,
					ClassBIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient USD balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassB: 0,
				ClassBIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleSellClassB = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ClassB, history} = this.state;
		const valueClassB = this.state.ClassB * currentPrice.ClassB;
		if (ClassB && ClassB > 0) {
			if (ClassB <= assets.ClassB) {
				const rClassB = assets.ClassB - ClassB;
				const newAssets: Assets = {
					USD: assets.USD + valueClassB,
					ETH: assets.ETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB - ClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Sold " +
						d3.formatPrefix(",.2", 1)(ClassB) +
						" ClassB for $" +
						d3.formatPrefix(",.2", 1)(ClassB * currentPrice.ClassB) +
						" USD."
				);
				this.setState({
					ClassB: 0,
					ClassBIn: "",
					assets: newAssets,
					history: newHistory,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(ClassB) +
						" ClassB</span> with <span style='color: rgba(255,255,255, 1)'>$" +
						d3.formatPrefix(",.2", 1)(ClassB * currentPrice.ClassB) +
						" USD</span>.</div>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassB: 0,
					ClassBIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient ClassB balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassB: 0,
				ClassBIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleCreation = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ETH, lastResetETHPrice, Creation, history} = this.state;
		const valuelastResetETHPrice = this.state.Creation * lastResetETHPrice;
		if (Creation && Creation > 0) {
			if (Creation <= assets.ETH) {
				const rETH = assets.ETH - Creation;
				const splitOutcome = valuelastResetETHPrice / 2;
				const rClassA = assets.ClassA + splitOutcome,
					rClassB = assets.ClassB + splitOutcome;
				const newAssets: Assets = {
					USD: assets.USD,
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Split " +
						d3.formatPrefix(",.2", 1)(Creation) +
						" ETH into " +
						d3.formatPrefix(",.2", 1)(splitOutcome) +
						" ClassA/B."
				);
				this.setState({
					Creation: 0,
					CreationIn: "",
					assets: newAssets,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Split <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(Creation) +
						" ETH</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(splitOutcome) +
						" ClassA/B</span>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					Creation: 0,
					CreationIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				Creation: 0,
				CreationIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	handleRedemption = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const {assets, ETH, lastResetETHPrice, Redemption, history} = this.state;
		if (Redemption && Redemption > 0) {
			if (Redemption <= d3.min([assets.ClassA, assets.ClassB])) {
				const rClassA = assets.ClassA - Redemption,
					rClassB = assets.ClassB - Redemption;
				const combineOutcome = Redemption * 2;
				const rETH = assets.ETH + combineOutcome / lastResetETHPrice;
				const newAssets: Assets = {
					USD: assets.USD,
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				let newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						": Combine " +
						d3.formatPrefix(",.2", 1)(Redemption) +
						" ClassA/B into " +
						d3.formatPrefix(",.2", 1)(combineOutcome / lastResetETHPrice) +
						" ETH."
				);
				this.setState({
					Redemption: 0,
					RedemptionIn: "",
					assets: newAssets,
					//set message
					msgType: "<div style='color: rgba(136,208,64,1)'>Success</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(Redemption) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(",.2", 1)(combineOutcome / lastResetETHPrice) +
						" ETH</span>",
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					Redemption: 0,
					RedemptionIn: "",
					msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
					msgContent: "<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA/B balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				Redemption: 0,
				RedemptionIn: "",
				msgType: "<div style='color: rgba(214,48,48,1)'>Error</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};

	closeMSG = (e: number) => {
		this.setState({
			msgShow: e
		});
	};

	render() {
		const {dataPrice, currentPriceData, assets, ETH, Creation, Redemption, ClassA, ClassB, history} = this.state;
		const showData = currentPriceData.slice(0, currentPriceData.length - 1);
		const currentPrice = currentPriceData[currentPriceData.length - 2];
		const marketValue =
			assets.USD +
			assets.ETH * currentPrice.ETH +
			assets.ClassA * currentPrice.ClassA +
			assets.ClassB * currentPrice.ClassB;
		const historyList = history.length ? (
			history.map((d, i) => {
				return <li key={i}>{d}</li>;
			})
		) : (
			<li>No transaction</li>
		);
		return (
			<div className="App">
				<Message
					type={this.state.msgType}
					content={this.state.msgContent}
					show={this.state.msgShow}
					close={this.closeMSG}
				/>
				<div style={{zIndex: 10}}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
							height: "60px",
							color: "white"
						}}>
						DUO Demo
					</div>
					<div className="d3chart-container">
						<div className="d3chart-row">
							<PriceChart name="pricechart" data={showData} pickedPriceDatum={this.pickedPriceDatum} />
							<PriceChart name="mvchart" data={dataPrice} pickedPriceDatum={this.pickedPriceDatum} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
							height: "60px",
							color: "white"
						}}>
						<div style={{marginRight: "5px", width: "138px"}}>
							{"Date: " + format(new Date(Date.parse(currentPrice.date)))}
						</div>
						<button className="day-button" onClick={this.handleNextDay}>
							Next Day
						</button>
						<button className="day-button" onClick={this.handleRefresh}>
							Restart
						</button>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "row"
						}}>
						<div style={{width: "500px"}}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									color: "white"
								}}>
								<table className="asset">
									<tbody>
										<tr>
											<td>USD($)</td>
											<td>ETH</td>
											<td>ClassA</td>
											<td>ClassB</td>
											<td>MV</td>
										</tr>
										<tr>
											<td>{d3.formatPrefix(",.2", 1)(assets.USD)}</td>
											<td>{d3.formatPrefix(",.2", 1)(assets.ETH * currentPrice.ETH)}</td>
											<td>{d3.formatPrefix(",.2", 1)(assets.ClassA * currentPrice.ClassA)}</td>
											<td>{d3.formatPrefix(",.2", 1)(assets.ClassB * currentPrice.ClassB)}</td>
											<td>{d3.formatPrefix(",.2", 1)(marketValue)}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									color: "white"
								}}>
								<table className="transaction">
									<tbody>
										<tr style={{textAlign: "center"}}>
											<td>Transaction</td>
											<td>Input</td>
											<td>Action</td>
											<td>Currently Own</td>
										</tr>
										<tr>
											<td>ETH</td>
											<td className="trans-input-wrapper">
												Number of ETH
												<input
													onChange={e =>
														this.setState({
															ETHIn: e.target.value,
															ETH: this.round(Number(e.target.value))
														})
													}
													value={this.state.ETHIn}
													className="trans-input"
												/>
											</td>
											<td>
												<button onClick={this.handleBuyETH} style={{marginBottom: "2px"}}>
													Buy
												</button>
												<button onClick={this.handleSellETH}>Sell</button>
											</td>
											<td style={{textAlign: "right"}}>{assets.ETH.toFixed(2)}</td>
										</tr>
										<tr>
											<td>Creation</td>
											<td className="trans-input-wrapper">
												Number of ETH
												<input
													onChange={e =>
														this.setState({
															CreationIn: e.target.value,
															Creation: this.round(Number(e.target.value))
														})
													}
													value={this.state.CreationIn}
													className="trans-input"
												/>
											</td>
											<td>
												<button onClick={this.handleCreation}>Create</button>
											</td>
											<td style={{textAlign: "right"}}>{assets.ETH.toFixed(2)}</td>
										</tr>
										<tr>
											<td>Redemption</td>
											<td className="trans-input-wrapper">
												Number of ClassA/B
												<input
													onChange={e =>
														this.setState({
															RedemptionIn: e.target.value,
															Redemption: this.round(Number(e.target.value))
														})
													}
													value={this.state.RedemptionIn}
													className="trans-input"
												/>
											</td>
											<td>
												<button onClick={this.handleRedemption}>Redeem</button>
											</td>
											<td style={{textAlign: "right"}}>
												{d3.min([assets.ClassA, assets.ClassB]).toFixed(2)}
											</td>
										</tr>
										<tr>
											<td>ClassA</td>
											<td className="trans-input-wrapper">
												Number of ClassA
												<input
													onChange={e =>
														this.setState({
															ClassAIn: e.target.value,
															ClassA: this.round(Number(e.target.value))
														})
													}
													value={this.state.ClassAIn}
													className="trans-input"
												/>
											</td>
											<td>
												<button onClick={this.handleBuyClassA} style={{marginBottom: "2px"}}>
													Buy
												</button>
												<button onClick={this.handleSellClassA}>Sell</button>
											</td>
											<td style={{textAlign: "right"}}>{assets.ClassA.toFixed(2)}</td>
										</tr>
										<tr>
											<td>ClassB</td>
											<td className="trans-input-wrapper">
												Number of ClassB
												<input
													onChange={e =>
														this.setState({
															ClassBIn: e.target.value,
															ClassB: this.round(Number(e.target.value))
														})
													}
													value={this.state.ClassBIn}
													className="trans-input"
												/>
											</td>
											<td>
												<button onClick={this.handleBuyClassB} style={{marginBottom: "2px"}}>
													Buy
												</button>
												<button onClick={this.handleSellClassB}>Sell</button>
											</td>
											<td style={{textAlign: "right"}}>{assets.ClassB.toFixed(2)}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div style={{width: "400px", marginLeft: "20px"}}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
									height: "58px",
									width: "398px",
									color: "white",
									border: "1px solid rgba(250,250,250,.7)"
								}}>
								History
							</div>
							<div
								style={{
									width: "378px",
									height: "308px",
									maxHeight: "308px",
									overflow: "auto",
									border: "1px solid rgba(250,250,250,.7)",
									padding: "10px",
									color: "white"
								}}>
								<ul style={{fontSize: "12px", color: "rgba(255,255,255,.9)"}}>{historyList}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));
