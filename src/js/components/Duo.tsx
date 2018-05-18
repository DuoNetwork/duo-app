import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import { IAssets, IPriceData, ITimeSeriesData } from '../types';
import AssetCard from './Cards/AssetCard';
import PriceCard from './Cards/PriceCard';
import TransactionCard from './Cards/TransactionCard';
import TimeSeriesChart from './Charts/TimeSeriesChart';
import Message from './Common/Message';
import Header from './Header';
const mockdata: IPriceData[] = require('../../static/ETH_A_B.json');
const format = d3.timeFormat('%Y %b %d');

interface IProp {
	eth: ITimeSeriesData[],
	classA: ITimeSeriesData[],
	classB: ITimeSeriesData[],
	reset: ITimeSeriesData[],
}

interface IState {
	dataMV: ITimeSeriesData[];
	currentDayCounter: number;
	currentPriceData: IPriceData[];
	assets: IAssets;
	lastResetETHPrice: number;
	msgType: string;
	msgContent: string;
	msgShow: number;
	resetToggle: boolean;
}

const INITIAL_ASSETS = {
	ETH: 100,
	ClassA: 0,
	ClassB: 0
};

const INITIAL_DATETIME = moment('2017-10-01').valueOf();
const INITIAL_MV = INITIAL_ASSETS.ETH * 303.95;

export default class Duo extends React.PureComponent<IProp, IState> {
	constructor(props) {
		super(props);
		this.state = {
			dataMV: [{ datetime: INITIAL_DATETIME, value: INITIAL_MV }],
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: INITIAL_ASSETS,
			lastResetETHPrice: mockdata[0].ETH,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			resetToggle: false
		};
	}

	public handleNextDay = () => {
		const { ETH, ClassA, ClassB } = this.state.assets;
		//const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const nextPrice = this.state.currentPriceData[this.state.currentPriceData.length - 1];
		const i = this.state.currentDayCounter;
		const dataSet = mockdata.slice(0, i + 2);
		const mvBeforeReset =
			ETH * nextPrice.ETH +
			ClassA * (nextPrice.ClassAbeforeReset || 0) +
			ClassB * (nextPrice.ClassBbeforeReset || 0);
		let newAssets;
		const mvData = this.state.dataMV;
		const marketValue =
			ETH * nextPrice.ETH + ClassA * nextPrice.ClassA + ClassB * nextPrice.ClassB;

		if (nextPrice.ResetType) {
			switch (nextPrice.ResetType) {
				case 'upward': {
					console.log(mvBeforeReset);
					const resetETHAmount =
						(((nextPrice.ClassAbeforeReset || 0) - 1) * ClassA +
							((nextPrice.ClassBbeforeReset || 0) - 1) * ClassB) /
						nextPrice.ETH;
					const rETH = ETH + resetETHAmount;
					newAssets = {
						ETH: rETH,
						ClassA: ClassA,
						ClassB: ClassB
					};
					break;
				}
				default: {
					console.log(mvBeforeReset);
					const resetETHAmount =
							(nextPrice.ClassAbeforeReset ||
								0 - (nextPrice.ClassBbeforeReset || 0)) *
							ClassA /
							nextPrice.ETH,
						resetClassAAmount = ClassA * (nextPrice.ClassBbeforeReset || 0),
						resetClassBAmount = ClassB * (nextPrice.ClassBbeforeReset || 0);
					const rETH = ETH + resetETHAmount;
					newAssets = {
						ETH: rETH,
						ClassA: resetClassAAmount,
						ClassB: resetClassBAmount
					};
					break;
				}
			}
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet,
				dataMV: [
					...mvData,
					{ datetime: moment(nextPrice.date, 'YYYY/M/D').valueOf(), value: mvBeforeReset }
				],
				assets: newAssets,
				lastResetETHPrice: nextPrice.ETH,
				msgType: "<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .8)'>Reset (" +
					nextPrice.ResetType +
					') triggered.</div>',
				msgShow: 1
			});
		} else
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet,
				dataMV: [
					...mvData,
					{ datetime: moment(nextPrice.date, 'YYYY/M/D').valueOf(), value: marketValue }
				]
			});
	};

	public handleRefresh = () => {
		this.setState({
			dataMV: [{ datetime: INITIAL_DATETIME, value: INITIAL_MV }],
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: INITIAL_ASSETS,
			lastResetETHPrice: mockdata[0].ETH,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			resetToggle: !this.state.resetToggle
		});
	};

	public handleBuySell = (amount: number, isA: boolean): string => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets } = this.state;
		const valueClassAB = amount * (isA ? currentPrice.ClassA : currentPrice.ClassB);
		const valueETH = assets.ETH * currentPrice.ETH;
		if (amount > 0)
			if (valueClassAB <= valueETH) {
				const rETH = (valueETH - valueClassAB) / currentPrice.ETH;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				this.setState({
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassAB / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return (
					format(new Date(Date.parse(currentPrice.date))) +
					': Bought ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' Class ' +
					(isA ? 'A' : 'B') +
					' with ' +
					d3.formatPrefix(',.6', 1)(valueClassAB / currentPrice.ETH) +
					' ETH.'
				);
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return '';
			}
		else if (amount < 0)
			if (amount <= assets.ClassA) {
				const newAssets: IAssets = {
					ETH: assets.ETH + valueClassAB / currentPrice.ETH,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				this.setState({
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You sold <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassAB / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return (
					format(new Date(Date.parse(currentPrice.date))) +
					': Sold ' +
					d3.formatPrefix(',.2', 1)(-amount) +
					' Class ' +
					(isA ? 'A' : 'B') +
					' with ' +
					d3.formatPrefix(',.6', 1)(valueClassAB / currentPrice.ETH) +
					' ETH.'
				);
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA balance.</div>",
					msgShow: 1
				});
				return '';
			}
		else {
			this.setState({
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return '';
		}
	};

	public handleCreation = (amount: number) => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, lastResetETHPrice } = this.state;
		const valuelastResetETHPrice = amount * lastResetETHPrice;
		if (amount && amount > 0)
			if (amount <= assets.ETH) {
				const rETH = assets.ETH - amount;
				const splitOutcome = valuelastResetETHPrice / 2;
				const rClassA = assets.ClassA + splitOutcome,
					rClassB = assets.ClassB + splitOutcome;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				this.setState({
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Split <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ETH</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B</span>',
					msgShow: 1
				});
				return (
					format(new Date(Date.parse(currentPrice.date))) +
					': Split ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' ETH into ' +
					d3.formatPrefix(',.2', 1)(splitOutcome) +
					' ClassA/B.'
				);
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return '';
			}
		else {
			this.setState({
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return '';
		}
	};

	public handleRedemption = (amount: number) => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, lastResetETHPrice } = this.state;
		if (amount && amount > 0)
			if (amount <= (d3.min([assets.ClassA, assets.ClassB]) || 0)) {
				const rClassA = assets.ClassA - amount,
					rClassB = assets.ClassB - amount;
				const combineOutcome = amount * 2;
				const rETH = assets.ETH + combineOutcome / lastResetETHPrice;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				this.setState({
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(combineOutcome / lastResetETHPrice) +
						' ETH</span>',
					msgShow: 1
				});
				return (
					format(new Date(Date.parse(currentPrice.date))) +
					': Combine ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' ClassA/B into ' +
					d3.formatPrefix(',.6', 1)(combineOutcome / lastResetETHPrice) +
					' ETH.'
				);
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA/B balance.</div>",
					msgShow: 1
				});
				return '';
			}
		else {
			this.setState({
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return '';
		}
	};

	public closeMSG = (e: number) => {
		this.setState({
			msgShow: e
		});
	};

	public render() {
		const {
			//dataPrice,
			dataMV,
			currentPriceData,
			assets,
			resetToggle,
			lastResetETHPrice
		} = this.state;
		const currentPrice = currentPriceData[currentPriceData.length - 2];
		const {eth, classA, classB, reset} = this.props;
		const timeseries = [
			{
				name: 'ETH',
				data: eth,
				highlight: Math.max(currentPriceData.length - 2, 0),
				color: '255,255,255',
				width: 1.5
			},
			{
				name: 'ClassA',
				data: classA,
				highlight: Math.max(currentPriceData.length - 2, 0),
				rightAxis: true,
				color: '0,186,255'
			},
			{
				name: 'ClassB',
				data: classB,
				highlight: Math.max(currentPriceData.length - 2, 0),
				rightAxis: true,
				color: '255,129,0'
			},
			{
				name: 'reset',
				data: reset,
				dotOnly: true,
				highlight: -1,
				rightAxis: true,
				color: 'rgba(214,48,48,0.6)'
			}
		];
		return (
			<div className="App">
				<Message
					type={this.state.msgType}
					content={this.state.msgContent}
					show={this.state.msgShow}
					close={this.closeMSG}
				/>
				<div style={{ zIndex: 10 }}>
					{/* Next Day, Refresh button */}
					<div className="play-button">
						<button className="day-button next-day" onClick={this.handleNextDay} />
						<button className="day-button refresh" onClick={this.handleRefresh} />
					</div>
					{/* Navigation Bar */}
					<Header />
					{/* Current Price, Asset Information Bar */}
					<div className="info-bar">
						<div className="info-bar-row">
							<PriceCard price={currentPrice} />
							<AssetCard assets={assets} price={currentPrice} />
						</div>
					</div>
					{/* D3 Price Chart and Market Value Chart */}
					<div className="d3chart-container">
						<div className="d3chart-row">
							<div className="d3chart-wrapper">
								<h3>Price Chart</h3>
								<TimeSeriesChart name="pricechart" timeseries={timeseries} />
							</div>
							<div className="d3chart-wrapper">
								<h3>Market Value Chart</h3>
								<TimeSeriesChart
									name="mvchart"
									timeseries={[
										{
											name: 'MV',
											data: dataMV,
											highlight: -1,
											color: '255,255,255',
											areaColor: '0, 178, 255',
											width: 1.5
										}
									]}
									showArea
								/>
							</div>
						</div>
					</div>
					<TransactionCard
						assets={assets}
						currentPrice={currentPrice}
						lastResetETHPrice={lastResetETHPrice}
						handleBuySell={this.handleBuySell}
						handleCreation={this.handleCreation}
						handleRedemption={this.handleRedemption}
						resetToggle={resetToggle}
					/>
				</div>
			</div>
		);
	}
}
