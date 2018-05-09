import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as d3 from "d3";
import {PriceChart, IPriceData, IPriceDatum, IMVData, IMVDatum} from "./Chart";
import "./style.css";
const mockdata: IPriceData = require("./Data/ETH_A_B.json");

interface IState {
	dataPrice: IPriceData;
	dataMV: IMVData;
	currentmvdata: IMVDatum;
	currentDayCounter: number;
	currentPriceData: IPriceData;
	assets: Assets;
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
			dataMV: null,
			currentmvdata: null,
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 1),
			assets: {
				USD: 10000,
				ETH: 10,
				ClassA: 1500,
				ClassB: 500
			}
		};
	}

	handleNextDay = () => {
		const i = this.state.currentDayCounter;
		const dataSet = mockdata.slice(0, i + 1);
		this.setState({
			currentDayCounter: i + 1,
			currentPriceData: dataSet
		});
	};

	handleNextFiveDay = () => {
		const i = this.state.currentDayCounter;
		const dataSet = mockdata.slice(0, i + 5);
		this.setState({
			currentDayCounter: i + 5,
			currentPriceData: dataSet
		});
	};

	handleRefresh = () => {
		this.setState({
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 1)
		});
	};

	pickedPriceDatum = (d: IPriceDatum) => {
		this.setState({});
	};

	pickerMVDatum = (d: IMVDatum) => {
		this.setState({});
	};

	render() {
		const {dataPrice, currentPriceData, assets} = this.state;
		const format = d3.timeFormat("%Y %b %d %H:%M");
		const currentPrice = currentPriceData[currentPriceData.length - 1];
		const marketValue =
			assets.USD +
			assets.ETH * currentPrice.ETH +
			assets.ClassA * currentPrice.ClassA +
			assets.ClassB * currentPrice.ClassB;
		return (
			<div className="App">
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
						<PriceChart
							name="pricechart"
							data={currentPriceData}
							pickedPriceDatum={this.pickedPriceDatum}
						/>
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
					<button onClick={this.handleNextDay}>next day</button>
					<button onClick={this.handleNextFiveDay}>next 5 days</button>
					<button onClick={this.handleRefresh}>Refresh</button>
				</div>
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
								<td>{d3.formatPrefix(",.0", 1)(assets.USD)}</td>
								<td>{d3.formatPrefix(",.0", 1)(assets.ETH)}</td>
								<td>{d3.formatPrefix(",.0", 1)(assets.ClassA)}</td>
								<td>{d3.formatPrefix(",.0", 1)(assets.ClassB)}</td>
								<td>{d3.formatPrefix(",.0", 1)(marketValue)}</td>
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
									<input className="trans-input" />
								</td>
								<td>
									<button onClick={() => window.alert("You dont have enough money!")}>Buy</button>
									<button>Sell</button>
								</td>
								<td style={{textAlign: "right"}}>{assets.ETH.toFixed(2)}</td>
							</tr>
							<tr>
								<td>Creation</td>
								<td className="trans-input-wrapper">
									Number of ETH
									<input className="trans-input" />
								</td>
								<td>
									<button>Create</button>
								</td>
								<td style={{textAlign: "right"}}>{assets.ETH.toFixed(2)}</td>
							</tr>
							<tr>
								<td>Redemption</td>
								<td className="trans-input-wrapper">
									Number of ClassA/B
									<input className="trans-input" />
								</td>
								<td>
									<button>Redeem</button>
								</td>
								<td style={{textAlign: "right"}}>{d3.min([assets.ClassA, assets.ClassB]).toFixed(2)}</td>
							</tr>
							<tr>
								<td>ClassA</td>
								<td className="trans-input-wrapper">
									Number of ClassA
									<input className="trans-input" />
								</td>
								<td>
									<button>Buy</button>
									<button>Sell</button>
								</td>
								<td style={{textAlign: "right"}}>{assets.ClassA.toFixed(2)}</td>
							</tr>
							<tr>
								<td>ClassB</td>
								<td className="trans-input-wrapper">
									Number of ClassB
									<input className="trans-input" />
								</td>
								<td>
									<button>Buy</button>
									<button>Sell</button>
								</td>
								<td style={{textAlign: "right"}}>{assets.ClassB.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById("root"));
