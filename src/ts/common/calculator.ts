import moment from 'moment';
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
			ETH:
				assets.ETH +
				((navA - 1) * assets.ClassA + (navB - 1) * assets.ClassB) / eth,
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
}

const calculator = new Calculator();
export default calculator;
