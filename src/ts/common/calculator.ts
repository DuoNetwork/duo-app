import moment from 'moment';
import { IRawData, ITimeSeriesData } from './types';

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
			reset: ITimeSeriesData[] = [];
		let count = -1;
		let lastResetPrice = rawData[0].Price;
		let beta = 1;
		rawData.forEach(d => {
			count++;
			const datetime = moment(d.Date, 'YYYY-MM-DD').valueOf();
			const ethPx = d.Price;
			eth.push({
				datetime: datetime,
				value: ethPx
			});

			let [navA, navB] = this.calculateNav(ethPx, lastResetPrice, alpha, beta, count, coupon);

			if (navB >= upperLimit || navB <= lowerLimit || navA >= periodLimit) {
				lastResetPrice = ethPx;
				count = 0;
				reset.push({
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
					beta = 1;
				} else
					beta = this.updateBeta(beta, ethPx, lastResetPrice, navA, alpha);

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
		});
		return [eth, classA, classB, reset];
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
}

const calculator = new Calculator();
export default calculator;
