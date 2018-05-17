import * as d3 from 'd3';
import * as React from 'react';
import '../css/style.css';
import classAIcon from '../images/ClassA_white.png';
import classBIcon from '../images/ClassB_white.png';
import duoIcon from '../images/DUO_icon.png';
import ethIcon from '../images/ethIcon.png';
import {IAssets, IMVData, IMVDatum, IPriceData} from '../types';
import HistroyCard from './Cards/HistoryCard';
import { MVChart, PriceChart } from './Charts/Chart';
import Message from './Common/Message';
const mockdata: IPriceData = require('../static/ETH_A_B.json');
const format = d3.timeFormat('%Y %b %d');

interface IState {
	dataPrice: IPriceData;
	dataMV: IMVData;
	currentmvdata: IMVDatum;
	currentDayCounter: number;
	currentPriceData: IPriceData;
	assets: IAssets;
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
	history: string[];
}

export default class Duo extends React.PureComponent<{}, IState> {
	constructor(props) {
		super(props);
		this.pickedPriceDatum = this.pickedPriceDatum.bind(this);
		this.state = {
			dataPrice: mockdata.slice(0, mockdata.length - 1),
			dataMV: [{ date: '2017/10/1', MV: 50000 }],
			currentmvdata: {} as IMVDatum,
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: {
				ETH: 100,
				ClassA: 0,
				ClassB: 0
			},
			ETHIn: '',
			lastResetETHPrice: mockdata[0].ETH,
			CreationIn: '',
			RedemptionIn: '',
			ClassAIn: '',
			ClassBIn: '',
			ETH: 0,
			Creation: 0,
			Redemption: 0,
			ClassA: 0,
			ClassB: 0,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			history: []
		};
	}
	public componentDidMount() {
		console.log('Welcome to DUO Demo!');
	}
	public round = num => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};
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
			mvData.push({ date: nextPrice.date, MV: mvBeforeReset });
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet,
				dataMV: mvData,
				assets: newAssets,
				lastResetETHPrice: nextPrice.ETH,
				msgType: "<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .8)'>Reset (" +
					nextPrice.ResetType +
					') triggered.</div>',
				msgShow: 1
			});
		} else {
			mvData.push({ date: nextPrice.date, MV: marketValue });
			this.setState({
				currentDayCounter: i + 1,
				currentPriceData: dataSet,
				dataMV: mvData
			});
		}
	};
	public handleRefresh = () => {
		this.setState({
			dataMV: [{ date: '2017/10/1', MV: 50000 }],
			currentmvdata: {} as IMVDatum,
			currentDayCounter: 1,
			currentPriceData: mockdata.slice(0, 2),
			assets: {
				ETH: 100,
				ClassA: 0,
				ClassB: 0
			},
			ETH: 0,
			lastResetETHPrice: mockdata[0].ETH,
			Creation: 0,
			Redemption: 0,
			ClassA: 0,
			ClassB: 0,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			history: []
		});
	};
	public pickedPriceDatum = () => {
		this.setState({});
	};
	public pickedMVDatum = () => {
		this.setState({});
	};
	public handleBuyClassA = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, ClassA, history } = this.state;
		const valueClassA = this.state.ClassA * currentPrice.ClassA;
		const valueETH = assets.ETH * currentPrice.ETH;
		if (ClassA && ClassA > 0) {
			if (valueClassA <= valueETH) {
				const rETH = (valueETH - valueClassA) / currentPrice.ETH;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: assets.ClassA + ClassA,
					ClassB: assets.ClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Bought ' +
						d3.formatPrefix(',.2', 1)(ClassA) +
						' ClassA with ' +
						d3.formatPrefix(',.6', 1)(valueClassA / currentPrice.ETH) +
						' ETH.'
				);
				this.setState({
					ClassA: 0,
					ClassAIn: '',
					assets: newAssets,
					history: newHistory,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(ClassA) +
						" ClassA</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassA / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassA: 0,
					ClassAIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassA: 0,
				ClassAIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public handleSellClassA = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, ClassA, history } = this.state;
		const valueClassA = this.state.ClassA * currentPrice.ClassA;
		if (ClassA && ClassA > 0) {
			if (ClassA <= assets.ClassA) {
				const newAssets: IAssets = {
					ETH: assets.ETH + valueClassA / currentPrice.ETH,
					ClassA: assets.ClassA - ClassA,
					ClassB: assets.ClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Sold ' +
						d3.formatPrefix(',.2', 1)(ClassA) +
						' ClassA for ' +
						d3.formatPrefix(',.6', 1)(valueClassA / currentPrice.ETH) +
						' ETH.'
				);
				this.setState({
					ClassA: 0,
					ClassAIn: '',
					assets: newAssets,
					history: newHistory,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(ClassA) +
						" ClassA</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassA / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassA: 0,
					ClassAIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassA: 0,
				ClassAIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public handleBuyClassB = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, ClassB, history } = this.state;
		const valueClassB = this.state.ClassB * currentPrice.ClassB;
		const valueETH = assets.ETH * currentPrice.ETH;
		if (ClassB && ClassB > 0) {
			if (valueClassB <= valueETH) {
				const rETH = (valueETH - valueClassB) / currentPrice.ETH;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB + ClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Bought ' +
						d3.formatPrefix(',.2', 1)(ClassB) +
						' ClassB with ' +
						d3.formatPrefix(',.6', 1)(valueClassB / currentPrice.ETH) +
						' ETH.'
				);
				this.setState({
					ClassB: 0,
					ClassBIn: '',
					assets: newAssets,
					history: newHistory,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(ClassB) +
						" ClassB</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassB / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassB: 0,
					ClassBIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassB: 0,
				ClassBIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public handleSellClassB = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, ClassB, history } = this.state;
		const valueClassB = this.state.ClassB * currentPrice.ClassB;
		if (ClassB && ClassB > 0) {
			if (ClassB <= assets.ClassB) {
				//const rClassB = assets.ClassB - ClassB;
				const newAssets: IAssets = {
					ETH: assets.ETH + valueClassB / currentPrice.ETH,
					ClassA: assets.ClassA,
					ClassB: assets.ClassB - ClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Sold ' +
						d3.formatPrefix(',.2', 1)(ClassB) +
						' ClassB for ' +
						d3.formatPrefix(',.6', 1)(valueClassB / currentPrice.ETH) +
						' ETH.'
				);
				this.setState({
					ClassB: 0,
					ClassBIn: '',
					assets: newAssets,
					history: newHistory,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(ClassB) +
						" ClassB</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassB / currentPrice.ETH) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					ClassB: 0,
					ClassBIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassB balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				ClassB: 0,
				ClassBIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public handleCreation = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, lastResetETHPrice, Creation, history } = this.state;
		const valuelastResetETHPrice = this.state.Creation * lastResetETHPrice;
		if (Creation && Creation > 0) {
			if (Creation <= assets.ETH) {
				const rETH = assets.ETH - Creation;
				const splitOutcome = valuelastResetETHPrice / 2;
				const rClassA = assets.ClassA + splitOutcome,
					rClassB = assets.ClassB + splitOutcome;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Split ' +
						d3.formatPrefix(',.2', 1)(Creation) +
						' ETH into ' +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B.'
				);
				this.setState({
					Creation: 0,
					CreationIn: '',
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Split <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(Creation) +
						" ETH</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B</span>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					Creation: 0,
					CreationIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				Creation: 0,
				CreationIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public handleRedemption = () => {
		const currentPrice = this.state.currentPriceData[this.state.currentPriceData.length - 2];
		const { assets, lastResetETHPrice, Redemption, history } = this.state;
		if (Redemption && Redemption > 0) {
			if (Redemption <= (d3.min([assets.ClassA, assets.ClassB]) || 0)) {
				const rClassA = assets.ClassA - Redemption,
					rClassB = assets.ClassB - Redemption;
				const combineOutcome = Redemption * 2;
				const rETH = assets.ETH + combineOutcome / lastResetETHPrice;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				const newHistory = history;
				newHistory.push(
					format(new Date(Date.parse(currentPrice.date))) +
						': Combine ' +
						d3.formatPrefix(',.2', 1)(Redemption) +
						' ClassA/B into ' +
						d3.formatPrefix(',.6', 1)(combineOutcome / lastResetETHPrice) +
						' ETH.'
				);
				this.setState({
					Redemption: 0,
					RedemptionIn: '',
					assets: newAssets,
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(Redemption) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(combineOutcome / lastResetETHPrice) +
						' ETH</span>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					Redemption: 0,
					RedemptionIn: '',
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA/B balance.</div>",
					msgShow: 1
				});
				return;
			}
		} else {
			this.setState({
				Redemption: 0,
				RedemptionIn: '',
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};
	public closeMSG = (e: number) => {
		this.setState({
			msgShow: e
		});
	};
	public render() {
		const { dataPrice, dataMV, currentPriceData, assets, history } = this.state;
		const showData = currentPriceData.slice(0, currentPriceData.length - 1);
		const currentPrice = currentPriceData[currentPriceData.length - 2];
		const marketValue =
			assets.ETH * currentPrice.ETH +
			assets.ClassA * currentPrice.ClassA +
			assets.ClassB * currentPrice.ClassB;
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
					<div className="header-wrapper">
						<div className="header">
							<div className="icon-wrapper">
								<img src={duoIcon} />
							</div>
							<div className="nav-button-wrapper">
								<a href="https://duo.network">HOME</a>
							</div>
						</div>
					</div>
					{/* Current Price, Asset Information Bar */}
					<div className="info-bar">
						<div className="info-bar-row">
							<div className="price-tag-wrapper">
								<div className="price-tag-date">
									<span>
										{'Date  ' + format(new Date(Date.parse(currentPrice.date)))}
									</span>
								</div>
								<div className="price-tag">
									<div className="bg-logo">
										<img src={ethIcon} />
									</div>
									<div className="tag-title">
										<h3>ETH</h3>
									</div>
									<div className="tag-content">
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<div className="tag-price usdL">
												{d3.formatPrefix(',.2', 1)(currentPrice.ETH)}
											</div>
											<div className="tag-unit">USD</div>
										</div>
									</div>
								</div>
								<div className="price-tag">
									<div className="bg-logo">
										<img src={classAIcon} />
									</div>
									<div className="tag-title">
										<h3>Class A</h3>
									</div>
									<div className="tag-content">
										<div>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div className="tag-price-1 usd">
													{d3.formatPrefix(',.4', 1)(currentPrice.ClassA)}
												</div>
												<div className="tag-unit-1">USD</div>
											</div>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div className="tag-price-1 eth">
													{d3.formatPrefix(',.6', 1)(
														currentPrice.ClassA / currentPrice.ETH
													)}
												</div>
												<div className="tag-unit-1">ETH</div>
											</div>
										</div>
									</div>
								</div>
								<div className="price-tag">
									<div className="bg-logo">
										<img src={classBIcon} />
									</div>
									<div className="tag-title">
										<h3>Class B</h3>
									</div>
									<div className="tag-content">
										<div>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div className="tag-price-2 usd">
													{d3.formatPrefix(',.4', 1)(currentPrice.ClassB)}
												</div>
												<div className="tag-unit-2">USD</div>
											</div>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div className="tag-price-2 eth">
													{d3.formatPrefix(',.6', 1)(
														currentPrice.ClassB / currentPrice.ETH
													)}
												</div>
												<div className="tag-unit-2">ETH</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="asset-tag-wrapper">
								<div className="asset-tag-name">
									<span>Assets</span>
								</div>
								<div className="asset-tag">
									<div className="asset-tag-title">
										<h3>Market Value</h3>
									</div>
									<div className="asset-tag-content">
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											<div className="tag-price mv-usd">
												{d3.formatPrefix(',.2', 1)(marketValue)}
											</div>
											<div className="tag-unit">USD</div>
										</div>
									</div>
								</div>
								<div className="asset-tag">
									<div className="asset-tag-title">
										<h3>Holdings</h3>
									</div>
									<div className="asset-tag-content">
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<div className="tag-unit-3">ETH</div>
											<div className="tag-price-3">
												{d3.formatPrefix(',.2', 1)(assets.ETH)}
											</div>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<div className="tag-unit-3">Class A</div>
											<div className="tag-price-3">
												{d3.formatPrefix(',.2', 1)(assets.ClassA)}
											</div>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<div className="tag-unit-3">Class B</div>
											<div className="tag-price-3">
												{d3.formatPrefix(',.2', 1)(assets.ClassB)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* D3 Price Chart and Market Value Chart */}
					<div className="d3chart-container">
						<div className="d3chart-row">
							<div className="d3chart-wrapper">
								<h3>Price Chart</h3>
								<PriceChart
									name="pricechart"
									data={dataPrice}
									movedata={showData}
									pickedPriceDatum={this.pickedPriceDatum}
								/>
							</div>
							<div className="d3chart-wrapper">
								<h3>Market Value Chart</h3>
								<MVChart
									name="mvchart"
									data={dataMV}
									pickedMVDatum={this.pickedMVDatum}
								/>
							</div>
						</div>
					</div>
					{/* Transaction History Card */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'row',
								width: '960px'
							}}
						>
							<div style={{ width: '600px' }}>
								<HistroyCard history={history} />
							</div>
							<div style={{ width: '360px' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										flexDirection: 'row',
										color: 'white'
									}}
								>
									<table className="transaction">
										<tbody>
											<tr style={{ textAlign: 'center' }}>
												<td>Transaction</td>
												<td>Input</td>
												<td>Action</td>
												<td>Currently Own</td>
											</tr>
											<tr>
												<td>Creation</td>
												<td className="trans-input-wrapper">
													Number of ETH
													<input
														onChange={e =>
															this.setState({
																CreationIn: e.target.value,
																Creation: this.round(
																	Number(e.target.value)
																)
															})
														}
														value={this.state.CreationIn}
														className="trans-input"
													/>
												</td>
												<td>
													<button onClick={this.handleCreation}>
														Create
													</button>
												</td>
												<td style={{ textAlign: 'right' }}>
													{assets.ETH.toFixed(2)}
												</td>
											</tr>
											<tr>
												<td>Redemption</td>
												<td className="trans-input-wrapper">
													Number of ClassA/B
													<input
														onChange={e =>
															this.setState({
																RedemptionIn: e.target.value,
																Redemption: this.round(
																	Number(e.target.value)
																)
															})
														}
														value={this.state.RedemptionIn}
														className="trans-input"
													/>
												</td>
												<td>
													<button onClick={this.handleRedemption}>
														Redeem
													</button>
												</td>
												<td style={{ textAlign: 'right' }}>
													{(
														d3.min([assets.ClassA, assets.ClassB]) || 0
													).toFixed(2)}
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
																ClassA: this.round(
																	Number(e.target.value)
																)
															})
														}
														value={this.state.ClassAIn}
														className="trans-input"
													/>
												</td>
												<td>
													<button
														onClick={this.handleBuyClassA}
														style={{ marginBottom: '2px' }}
													>
														Buy
													</button>
													<button onClick={this.handleSellClassA}>
														Sell
													</button>
												</td>
												<td style={{ textAlign: 'right' }}>
													{assets.ClassA.toFixed(2)}
												</td>
											</tr>
											<tr>
												<td>ClassB</td>
												<td className="trans-input-wrapper">
													Number of ClassB
													<input
														onChange={e =>
															this.setState({
																ClassBIn: e.target.value,
																ClassB: this.round(
																	Number(e.target.value)
																)
															})
														}
														value={this.state.ClassBIn}
														className="trans-input"
													/>
												</td>
												<td>
													<button
														onClick={this.handleBuyClassB}
														style={{ marginBottom: '2px' }}
													>
														Buy
													</button>
													<button onClick={this.handleSellClassB}>
														Sell
													</button>
												</td>
												<td style={{ textAlign: 'right' }}>
													{assets.ClassB.toFixed(2)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
