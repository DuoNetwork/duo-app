import moment from 'moment';
import * as CST from './constants';
import { IUIState } from './reduxTypes';
import { IAssets, IRawData, ITimeSeriesData } from './types';

class Calculator {
	public getAllTimeSeriesFromEth(
		rawData: IRawData[],
		alpha: number = 1,
		coupon: number = 0.0002,
		upperLimit: number = 2,
		lowerLimit: number = 0.25,
		periodLimit: number = 1.02
	) {
		const eth: ITimeSeriesData[] = [],
			classA: ITimeSeriesData[] = [],
			classB: ITimeSeriesData[] = [],
			resetPrice: ITimeSeriesData[] = [],
			beta: ITimeSeriesData[] = [],
			upward: ITimeSeriesData[] = [],
			downward: ITimeSeriesData[] = [],
			periodic: ITimeSeriesData[] = [];
		let count = -1;
		let lastResetDatetime = moment(rawData[0].Date, 'YYYY-MM-DD').valueOf();
		let lastResetPrice = rawData[0].Price;
		let currentBeta = 1;
		rawData.forEach(d => {
			count++;
			const datetime = moment(d.Date, 'YYYY-MM-DD').valueOf();
			const ethPx = d.Price;
			eth.push({
				datetime: datetime,
				value: ethPx
			});

			let [navA, navB] = this.calculateNav(
				ethPx,
				lastResetPrice,
				alpha,
				currentBeta,
				count,
				coupon
			);

			if (navB >= upperLimit || navB <= lowerLimit || navA >= periodLimit) {
				lastResetPrice = ethPx;
				lastResetDatetime = datetime;
				count = 0;
				if (navB >= upperLimit)
					upward.push({
						datetime: datetime,
						value: 1
					});
				else if (navB <= lowerLimit)
					downward.push({
						datetime: datetime,
						value: 1
					});
				else
					periodic.push({
						datetime: datetime,
						value: 1
					});

				// class B does not reset in periodic reset
				if (navA < periodLimit) {
					classB.push({
						datetime: datetime,
						value: navB
					});
					navB = 1;
					currentBeta = 1;
				} else
					currentBeta = this.updateBeta(currentBeta, ethPx, lastResetPrice, navA, alpha);

				classA.push({
					datetime: datetime,
					value: navA
				});

				navA = 1;
			}

			classA.push({
				datetime: datetime,
				value: navA
			});

			classB.push({
				datetime: datetime,
				value: navB
			});

			resetPrice.push({
				datetime: lastResetDatetime,
				value: lastResetPrice
			});

			beta.push({
				datetime: datetime,
				value: currentBeta
			});
		});
		return [eth, classA, classB, resetPrice, beta, upward, downward, periodic];
	}

	public calculateNav(
		price: number,
		resetPrice: number,
		alpha: number,
		beta: number,
		periodCount: number,
		coupon: number
	) {
		let navParent = price / resetPrice / beta * (1 + alpha);

		let navA = 1 + periodCount * coupon;
		let navAAdj = navA * alpha;
		if (navParent <= navAAdj) return [navParent / alpha, 0];
		else return [navA, navParent - navAAdj];
	}

	public updateBeta(
		prevBeta: number,
		price: number,
		resetPrice: number,
		navA: number,
		alpha: number
	) {
		return (
			(1 + alpha) * price / ((1 + alpha) * price - resetPrice * alpha * prevBeta * (navA - 1))
		);
	}

	public assetUpwardReset(assets: IAssets, eth: number, navA: number, navB: number): IAssets {
		return {
			ETH: assets.ETH + ((navA - 1) * assets.ClassA + (navB - 1) * assets.ClassB) / eth,
			ClassA: assets.ClassA,
			ClassB: assets.ClassB
		};
	}

	public assetDownwardReset(assets: IAssets, eth: number, navA: number, navB: number): IAssets {
		return {
			ETH: assets.ETH + (navA - navB) * assets.ClassA / eth,
			ClassA: assets.ClassA * navB,
			ClassB: assets.ClassB * navB
		};
	}

	public assetPeriodicReset(assets: IAssets, eth: number, navA: number): IAssets {
		return {
			ETH: assets.ETH + (navA - 1) * assets.ClassA / eth,
			ClassA: assets.ClassA,
			ClassB: assets.ClassB
		};
	}

	public calculateNextDayState(state: IUIState): object {
		const { eth, classA, classB, assets, day, upward, downward, periodic, mv } = state;
		const newDayCount = day + 1;
		if (newDayCount >= eth.length) return {};
		else {
			const newDatetime = eth[newDayCount].datetime;
			const newEthPx = eth[newDayCount].value;
			const upwardSoFar = upward.filter(d => d.datetime <= newDatetime);
			const downwardSoFar = downward.filter(d => d.datetime <= newDatetime);
			const periodicSoFar = periodic.filter(d => d.datetime <= newDatetime);
			const isUpward =
				upwardSoFar.length && upwardSoFar[upwardSoFar.length - 1].datetime === newDatetime;
			const isDownward =
				downwardSoFar.length &&
				downwardSoFar[downwardSoFar.length - 1].datetime === newDatetime;
			const isPeriodic =
				periodicSoFar.length &&
				periodicSoFar[periodicSoFar.length - 1].datetime === newDatetime;
			const upwardCount = upwardSoFar.length - (isUpward ? 1 : 0);
			const downwardCount = downwardSoFar.length - (isDownward ? 1 : 0);
			const periodicCount = periodicSoFar.length - (isPeriodic ? 1 : 0);
			const newNavA = classA[newDayCount + upwardCount + downwardCount + periodicCount].value;
			const newNavB = classB[newDayCount + upwardCount + downwardCount].value;

			let newAssets: IAssets;
			let msg = '';
			if (isUpward) {
				newAssets = calculator.assetUpwardReset(assets, newEthPx, newNavA, newNavB);
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (upward) triggered.</div>";
			} else if (isDownward) {
				newAssets = calculator.assetDownwardReset(assets, newEthPx, newNavA, newNavB);
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (downward) triggered.</div>";
			} else if (isPeriodic) {
				newAssets = calculator.assetPeriodicReset(assets, newEthPx, newNavA);
				msg = "<div style='color: rgba(255,255,255, .8)'>Reset (periodic) triggered.</div>";
			} else newAssets = assets;

			return Object.assign(
				{
					[CST.AC_MV]: [
						...mv,
						{
							datetime: newDatetime,
							value:
								assets.ETH * newEthPx +
								assets.ClassA * newNavA +
								assets.ClassB * newNavB
						}
					],
					[CST.AC_ASSETS]: newAssets,
					[CST.AC_DAY]: newDayCount,
					[CST.AC_PRICE]: {
						Date: newDatetime,
						ETH: newEthPx,
						ClassA:
							classA[
								newDayCount +
									upwardSoFar.length +
									downwardSoFar.length +
									periodicSoFar.length
							].value,
						ClassB:
							classB[newDayCount + upwardSoFar.length + downwardSoFar.length].value
					}
				},
				msg
					? {
							[CST.AC_MESSAGE]: {
								type: "<div style='color: rgba(0,186,255,0.7)'>INFORMATION</div>",
								content: msg,
								visible: true
							}
					}
					: {}
			);
		}
	}

	public calculateForwardState(state: IUIState): object {
		const { eth, classA, classB, assets, day, upward, downward, periodic, mv } = state;
		const currentDatetime = eth[day].datetime;
		const endDatetime = eth[eth.length - 1].datetime;
		const upwardSoFar = upward.filter(d => d.datetime <= currentDatetime);
		const downwardSoFar = downward.filter(d => d.datetime <= currentDatetime);
		const periodicSoFar = periodic.filter(d => d.datetime <= currentDatetime);
		const nextUpward = upward[upwardSoFar.length]
			? upward[upwardSoFar.length].datetime
			: endDatetime;
		const nextDownward = downward[downwardSoFar.length]
			? downward[downwardSoFar.length].datetime
			: endDatetime;
		const nextPeriodic = periodic[periodicSoFar.length]
			? periodic[periodicSoFar.length].datetime
			: endDatetime;
		const nextResetDate = Math.min(nextUpward, nextDownward, nextPeriodic);
		let curDate = day + 1;
		let newMV = [...mv];
		let newDatetime = eth[curDate].datetime;
		if (newDatetime === nextResetDate) return this.calculateNextDayState(state);

		let newEthPx, newNavA, newNavB;
		while (curDate < eth.length && eth[curDate].datetime < nextResetDate) {
			newDatetime = eth[curDate].datetime;
			newEthPx = eth[curDate].value;
			newNavA =
				classA[curDate + upwardSoFar.length + downwardSoFar.length + periodicSoFar.length]
					.value;
			newNavB = classB[curDate + upwardSoFar.length + downwardSoFar.length].value;
			newMV.push({
				datetime: newDatetime,
				value: assets.ETH * newEthPx + assets.ClassA * newNavA + assets.ClassB * newNavB
			});
			curDate++;
		}
		curDate--;
		return {
			[CST.AC_MV]: newMV,
			[CST.AC_DAY]: curDate,
			[CST.AC_PRICE]: {
				Date: newDatetime,
				ETH: newEthPx,
				ClassA:
					classA[
						curDate + upwardSoFar.length + downwardSoFar.length + periodicSoFar.length
					].value,
				ClassB: classB[curDate + upwardSoFar.length + downwardSoFar.length].value
			}
		};
	}
}

const calculator = new Calculator();
export default calculator;
