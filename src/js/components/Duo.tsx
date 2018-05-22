import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import calculator from '../common/calculator';
import { IAssets, ITimeSeriesData } from '../common/types';
import Message from '../containers/Common/MessageContainer';
import AssetCard from './Cards/AssetCard';
import PriceCard from './Cards/PriceCard';
import TimeSeriesCard from './Cards/TimeSeriesCard';
import TransactionCard from './Cards/TransactionCard';
import Header from './Header';

interface IProp {
	eth: ITimeSeriesData[];
	classA: ITimeSeriesData[];
	classB: ITimeSeriesData[];
	reset: ITimeSeriesData[];
	mv: ITimeSeriesData[];
	assets: IAssets;
	history: string[];
	refresh: () => void;
	addHistory: (tx: string) => void;
	message: (type: string, content: string) => void;
	addMV: (mv: ITimeSeriesData) => void;
	updateAssets: (assets: IAssets) => void;
	resetPrice: number;
	beta: number;
	updateResetPrice: (px: number) => void;
	updateBeta: (beta: number) => void;
	dayCount: number;
	upwardResetCount: number;
	downwardResetCount: number;
	periodicResetCount: number;
	updateDayCount: (count: number) => void;
	updateUpwardResetCount: (count: number) => void;
	updateDownwardResetCount: (count: number) => void;
	updatePeriodicResetCount: (count: number) => void;
}

export default class Duo extends React.PureComponent<IProp> {
	public handleNextDay = () => {
		const {
			eth,
			classA,
			classB,
			message,
			addMV,
			assets,
			updateAssets,
			resetPrice,
			beta,
			updateResetPrice,
			updateBeta,
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
			updateDayCount,
			updateUpwardResetCount,
			updateDownwardResetCount,
			updatePeriodicResetCount
		} = this.props;

		const newDayCount = dayCount + 1;
		const newEthPx = eth[newDayCount].value;
		const newNavA =
			classA[newDayCount + upwardResetCount + downwardResetCount + periodicResetCount].value;
		const newNavB = classB[newDayCount + upwardResetCount + downwardResetCount].value;

		const mv = assets.ETH * newEthPx + assets.ClassA * newNavA + assets.ClassB * newNavB;
		let newAssets: IAssets;
		let newBeta = beta;
		let newResetPrice = resetPrice;
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
			newBeta = calculator.updateBeta(beta, newEthPx, resetPrice, newNavA, 1);
			newResetPrice = newEthPx;
			msg = "<div style='color: rgba(255,255,255, .8)'>Reset (periodic) triggered.</div>";
			newPeriodicCount++;
		} else newAssets = assets;

		if (msg) message("<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>", msg);

		addMV({ datetime: eth[newDayCount].datetime, value: mv });
		updateAssets(newAssets);
		updateResetPrice(newResetPrice);
		updateBeta(newBeta);
		updateDayCount(newDayCount);
		updateUpwardResetCount(newUpwardCount);
		updateDownwardResetCount(newDownwardCount);
		updatePeriodicResetCount(newPeriodicCount);
	};

	public handleBuySell = (amount: number, isA: boolean): boolean => {
		const {
			eth,
			classA,
			classB,
			addHistory,
			message,
			assets,
			updateAssets,
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
		} = this.props;

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
				addHistory(
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
						': Bought ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						' with ' +
						d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
						' ETH.'
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
						' ETH</span>.</div>'
				);
				updateAssets(newAssets);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>"
				);
				return false;
			}
		else if (amount < 0)
			if (amount <= assets.ClassA) {
				const newAssets: IAssets = {
					ETH: assets.ETH - valueClassAB / ethPx,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				addHistory(
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
						': Sold ' +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						' for ' +
						d3.formatPrefix(',.6', 1)(Math.abs(valueClassAB) / ethPx) +
						' ETH.'
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>You sold <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> for <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(Math.abs(valueClassAB) / ethPx) +
						' ETH</span>.</div>'
				);
				updateAssets(newAssets);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient Class " +
						(isA ? 'A' : 'B') +
						' balance.</div>'
				);
				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);
			return false;
		}
	};

	public handleCreation = (amount: number): boolean => {
		const { eth, addHistory, message, assets, updateAssets, resetPrice, beta, dayCount } = this.props;

		const valuelastResetETHPrice = amount * resetPrice * beta;
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
				addHistory(
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
						': Split ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' ETH into ' +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B.'
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>Split <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ETH</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B</span>'
				);
				updateAssets(newAssets);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>"
				);

				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);

			return false;
		}
	};

	public handleRedemption = (amount: number): boolean => {
		const { eth, addHistory, message, assets, updateAssets, resetPrice, beta, dayCount } = this.props;
		if (amount && amount > 0)
			if (amount <= (d3.min([assets.ClassA, assets.ClassB]) || 0)) {
				const rClassA = assets.ClassA - amount,
					rClassB = assets.ClassB - amount;
				const combineOutcome = amount * 2;
				const rETH = assets.ETH + combineOutcome / resetPrice / beta;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: rClassA,
					ClassB: rClassB
				};
				addHistory(
					moment(eth[dayCount].datetime).format('YYYY-MM-DD') +
						': Combine ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' ClassA/B into ' +
						d3.formatPrefix(',.6', 1)(combineOutcome / resetPrice) +
						' ETH.'
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(combineOutcome / resetPrice) +
						' ETH</span>'
				);
				updateAssets(newAssets);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient Class A/B balance.</div>"
				);

				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);

			return false;
		}
	};

	public render() {
		const {
			eth,
			classA,
			classB,
			reset,
			history,
			mv,
			assets,
			resetPrice,
			beta,
			refresh,
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount
		} = this.props;
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
				<Message />
				<div style={{ zIndex: 10 }}>
					{/* Next Day, Refresh button */}
					<div className="play-button">
						<button disabled={true} className="day-button settings" />
						<button className="day-button next-day" onClick={this.handleNextDay} />
						<button className="day-button refresh" onClick={refresh} />
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
										data: mv,
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
						resetPrice={resetPrice}
						beta={beta}
						handleBuySell={this.handleBuySell}
						handleCreation={this.handleCreation}
						handleRedemption={this.handleRedemption}
						history={history}
					/>
				</div>
			</div>
		);
	}
}
