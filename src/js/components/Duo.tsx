import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import calculator from '../calculator';
import { IAssets, ITimeSeriesData } from '../types';
import AssetCard from './Cards/AssetCard';
import PriceCard from './Cards/PriceCard';
import TimeSeriesCard from './Cards/TimeSeriesCard';
import TransactionCard from './Cards/TransactionCard';
import Message from './Common/Message';
import Header from './Header';

interface IProp {
	eth: ITimeSeriesData[];
	classA: ITimeSeriesData[];
	classB: ITimeSeriesData[];
	reset: ITimeSeriesData[];
}

interface IState {
	dataMV: ITimeSeriesData[];
	dayCount: number;
	assets: IAssets;
	lastResetPrice: number;
	beta: number;
	msgType: string;
	msgContent: string;
	msgShow: number;
	resetToggle: boolean;
	upwardResetCount: number;
	downwardResetCount: number;
	periodicResetCount: number;
	showTFGlobal: boolean;
	typeTF: string;
	history: string[];
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
			dayCount: 0,
			assets: INITIAL_ASSETS,
			lastResetPrice: this.props.eth[0].value,
			beta: 1,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			resetToggle: false,
			upwardResetCount: 0,
			downwardResetCount: 0,
			periodicResetCount: 0,
			showTFGlobal: false,
			typeTF: '',
			history: []
		};
	}

	public handleNextDay = () => {
		const { eth, classA, classB } = this.props;
		const {
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
			assets,
			dataMV,
			beta,
			lastResetPrice
		} = this.state;

		const newDayCount = dayCount + 1;
		const newEthPx = eth[newDayCount].value;
		const newNavA =
			classA[newDayCount + upwardResetCount + downwardResetCount + periodicResetCount].value;
		const newNavB = classB[newDayCount + upwardResetCount + downwardResetCount].value;

		const mv = assets.ETH * newEthPx + assets.ClassA * newNavA + assets.ClassB * newNavB;
		let newAssets: IAssets;
		let newBeta = beta;
		let newResetPrice = lastResetPrice;
		let msg = '';
		let newUpwardCount = upwardResetCount;
		let newDownwardCount = downwardResetCount;
		let newPeriodicCount = periodicResetCount;
		if (newNavB >= 2) {
			newAssets = {
				ETH:
					assets.ETH +
					((newNavA - 1) * assets.ClassA + (newNavB - 1) * assets.ClassB) / newEthPx,
				ClassA: assets.ClassA,
				ClassB: assets.ClassB
			};
			newBeta = 1;
			newResetPrice = newEthPx;
			msg = "<div style='color: rgba(255,255,255, .8)'>Reset (upward) triggered.</div>";
			newUpwardCount++;
		} else if (newNavB <= 0.25) {
			newAssets = {
				ETH: assets.ETH + (newNavA - newNavB) * assets.ClassA / newEthPx,
				ClassA: assets.ClassA * newNavB,
				ClassB: assets.ClassB * newNavB
			};
			newBeta = 1;
			newResetPrice = newEthPx;
			msg = "<div style='color: rgba(255,255,255, .8)'>Reset (downward) triggered.</div>";
			newDownwardCount++;
		} else if (newNavA >= 1.02) {
			newAssets = {
				ETH: assets.ETH + (newNavA - 1) * assets.ClassA / newEthPx,
				ClassA: assets.ClassA,
				ClassB: assets.ClassB
			};
			newBeta = calculator.updateBeta(beta, newEthPx, lastResetPrice, newNavA, 1);
			newResetPrice = newEthPx;
			msg = "<div style='color: rgba(255,255,255, .8)'>Reset (periodic) triggered.</div>";
			newPeriodicCount++;
		} else newAssets = assets;

		this.setState({
			dayCount: newDayCount,
			dataMV: [...dataMV, { datetime: eth[newDayCount].datetime, value: mv }],
			assets: newAssets,
			lastResetPrice: newResetPrice,
			beta: newBeta,
			msgType: msg ? "<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>" : '',
			msgContent: msg,
			msgShow: msg ? 1 : 0,
			upwardResetCount: newUpwardCount,
			downwardResetCount: newDownwardCount,
			periodicResetCount: newPeriodicCount
		});
	};

	public handleRefresh = () => {
		this.setState({
			dataMV: [{ datetime: INITIAL_DATETIME, value: INITIAL_MV }],
			dayCount: 0,
			assets: INITIAL_ASSETS,
			lastResetPrice: this.props.eth[0].value,
			beta: 1,
			msgType: 'msg type',
			msgContent: 'msg content',
			msgShow: 0,
			resetToggle: !this.state.resetToggle,
			upwardResetCount: 0,
			downwardResetCount: 0,
			periodicResetCount: 0,
			showTFGlobal: false
		});
	};

	public handleBuySell = (amount: number, isA: boolean): void => {
		const { eth, classA, classB } = this.props;
		const {
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
			assets,
			history
		} = this.state;

		const ethPx = eth[dayCount].value;
		const navA =
			classA[dayCount + upwardResetCount + downwardResetCount + periodicResetCount].value;
		const navB = classB[dayCount + upwardResetCount + downwardResetCount].value;
		const valueClassAB = amount * (isA ? navA : navB);
		const valueETH = assets.ETH * ethPx;
		if (amount > 0)
			if (valueClassAB <= valueETH) {
				const rETH = (valueETH - valueClassAB) / ethPx;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				const historyEntry =
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
					': Bought ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' Class ' +
					(isA ? 'A' : 'B') +
					' with ' +
					d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
					' ETH.';
				this.setState({
					assets: newAssets,
					showTFGlobal: false,
					history: [...history, historyEntry],
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		else if (amount < 0)
			if (amount <= assets.ClassA) {
				const newAssets: IAssets = {
					ETH: assets.ETH - valueClassAB / ethPx,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				const historyEntry =
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
					': Sold ' +
					d3.formatPrefix(',.2', 1)(-amount) +
					' Class ' +
					(isA ? 'A' : 'B') +
					' for ' +
					d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
					' ETH.';
				this.setState({
					assets: newAssets,
					showTFGlobal: false,
					history: [...history, historyEntry],
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>You sold <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> for <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(Math.abs(valueClassAB) / ethPx) +
						' ETH</span>.</div>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA balance.</div>",
					msgShow: 1
				});
				return;
			}
		else {
			this.setState({
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};

	public handleCreation = (amount: number): void => {
		const { eth } = this.props;
		const { dayCount, assets, beta, lastResetPrice, history } = this.state;

		const valuelastResetETHPrice = amount * lastResetPrice * beta;
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
				const historyEntry =
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
					': Split ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' ETH into ' +
					d3.formatPrefix(',.2', 1)(splitOutcome) +
					' ClassA/B.';
				this.setState({
					assets: newAssets,
					showTFGlobal: false,
					history: [...history, historyEntry],
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
				return;
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>",
					msgShow: 1
				});
				return;
			}
		else {
			this.setState({
				msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				msgContent:
					"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>",
				msgShow: 1
			});
			return;
		}
	};

	public handleRedemption = (amount: number): void => {
		const { eth } = this.props;
		const { dayCount, assets, beta, lastResetPrice, history } = this.state;
		if (amount && amount > 0)
			if (amount <= (d3.min([assets.ClassA, assets.ClassB]) || 0)) {
				const rClassA = assets.ClassA - amount,
					rClassB = assets.ClassB - amount;
				const combineOutcome = amount * 2;
				const rETH = assets.ETH + combineOutcome / lastResetPrice / beta;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				const historyEntry =
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
					': Combine ' +
					d3.formatPrefix(',.2', 1)(amount) +
					' ClassA/B into ' +
					d3.formatPrefix(',.6', 1)(combineOutcome / lastResetPrice) +
					' ETH.';
				this.setState({
					assets: newAssets,
					showTFGlobal: false,
					history: [...history, historyEntry],
					// set message
					msgType: "<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(combineOutcome / lastResetPrice) +
						' ETH</span>',
					msgShow: 1
				});
				return;
			} else {
				this.setState({
					msgType: "<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					msgContent:
						"<div style='color: rgba(255,255,255, .8)'>Insufficient ClassA/B balance.</div>",
					msgShow: 1
				});
				return;
			}
		else {
			this.setState({
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

	public openTF = (e: boolean, type?: string) => {
		this.setState({
			showTFGlobal: e,
			typeTF: type ? type : ''
		});
	};

	public render() {
		const {
			dataMV,
			assets,
			resetToggle,
			dayCount,
			lastResetPrice,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
			showTFGlobal,
			typeTF,
			history
		} = this.state;
		const openTF = this.openTF;
		const { eth, classA, classB, reset } = this.props;
		const ethPx = eth[dayCount].value;
		const navA =
			classA[dayCount + upwardResetCount + downwardResetCount + periodicResetCount].value;
		const navB = classB[dayCount + upwardResetCount + downwardResetCount].value;
		const timeseries = [
			{
				name: 'ETH',
				data: eth,
				highlight: dayCount,
				color: '255,255,255',
				width: 1.5
			},
			{
				name: 'ClassA',
				data: classA,
				highlight: dayCount + upwardResetCount + downwardResetCount + periodicResetCount,
				rightAxis: true,
				color: '0,186,255'
			},
			{
				name: 'ClassB',
				data: classB,
				highlight: dayCount + upwardResetCount + downwardResetCount,
				rightAxis: true,
				color: '255,129,0'
			},
			{
				name: 'Reset',
				data: reset,
				dotOnly: true,
				highlight: -1,
				rightAxis: true,
				color: 'rgba(214,48,48,0.6)',
				flagLegend: true
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
						<button className="day-button settings" />
						<button className="day-button next-day" onClick={this.handleNextDay} />
						<button className="day-button refresh" onClick={this.handleRefresh} />
					</div>
					{/* Navigation Bar */}
					<Header />
					{/* Current Price, Asset Information Bar */}
					<div className="info-bar">
						<div className="info-bar-row">
							<PriceCard
								price={{
									Date: eth[dayCount].datetime,
									ETH: ethPx,
									ClassA: navA,
									ClassB: navB
								}}
							/>
							<AssetCard
								assets={assets}
								price={{
									Date: eth[dayCount].datetime,
									ETH: ethPx,
									ClassA: navA,
									ClassB: navB
								}}
							/>
						</div>
					</div>
					{/* D3 Price Chart and Market Value Chart */}
					<div className="d3chart-container">
						<div className="d3chart-row">
							<TimeSeriesCard
								name="pricechart"
								title="Price Chart"
								timeseries={timeseries}
							/>
							<TimeSeriesCard
								name="mvchart"
								title="Market Value Chart"
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
					<TransactionCard
						assets={assets}
						currentPrice={{
							Date: eth[dayCount].datetime,
							ETH: ethPx,
							ClassA: navA,
							ClassB: navB
						}}
						lastResetETHPrice={lastResetPrice}
						handleBuySell={this.handleBuySell}
						handleCreation={this.handleCreation}
						handleRedemption={this.handleRedemption}
						resetToggle={resetToggle}
						showTFGlobal={showTFGlobal}
						openTF={openTF}
						typeTF={typeTF}
						history={history}
					/>
				</div>
			</div>
		);
	}
}
