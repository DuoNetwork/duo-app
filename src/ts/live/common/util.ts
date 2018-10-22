import * as d3 from 'd3';
import moment, { DurationInputArg2 } from 'moment';
import * as CST from './constants';
import { ICustodianPrice, IPriceStatus, ISourceData, IStatus } from './types';

class Util {
	public convertUpdateTime(timestamp: number): string {
		const diff = this.getUTCNowTimestamp() - timestamp;
		if (diff < 60000) return 'Just Now';
		else if (diff < 3600000) return Math.floor(diff / 60000) + ' Minutes Ago';
		else if (diff < 86400000) return Math.floor(diff / 3600000) + ' Hours Ago';
		else if (diff < 2592000000) return Math.floor(diff / 86400000) + ' Days Ago';
		else return 'Long Time Ago';
	}

	public getUTCNowTimestamp() {
		return moment().valueOf();
	}

	public calculateNav(
		price: number,
		time: number,
		resetPrice: number,
		resetTime: number,
		alpha: number,
		beta: number,
		period: number,
		coupon: number
	) {
		const navParent = (price / resetPrice / beta) * (1 + alpha);

		const navA = 1 + Math.floor((time - resetTime) / 1000 / period) * coupon;
		const navAAdj = navA * alpha;
		if (navParent <= navAAdj) return [navParent / alpha, 0];
		else return [navA, navParent - navAAdj];
	}

	public getDates(length: number, step: number, stepSize: DurationInputArg2, format: string) {
		const dates: string[] = [];
		const date = moment.utc();
		for (let i = 0; i < length; i++) {
			dates.push(date.format(format));
			date.subtract(step, stepSize);
		}
		dates.sort((a, b) => a.localeCompare(b));

		return dates;
	}

	public round(num: number) {
		return +(Math.floor((num + 'e+8') as any) + 'e-8');
	}

	public range(start: number, end: number) {
		const subArray = Array.apply(null, { length: end }).map(Number.call, Number);
		return subArray.slice(start, end);
	}

	public formatBalance(num: number) {
		if (Math.abs(num) < 1e-8) return '0.000';
		return d3
			.format(Math.abs(num) > 1 ? ',.4s' : ',.4n')(num)
			.toUpperCase()
			.replace(/G/g, 'B');
	}

	public formatNumber(num: number) {
		if (Math.abs(num) < 1e-8) return '0.000';
		if (Math.abs(num) < 1) return d3.format(',.4n')(num);
		if (Math.abs(num) < 100000) return d3.format(',.2f')(num);
		return d3
			.format(',.4s')(num)
			.toUpperCase()
			.replace(/G/g, 'B');
	}

	public getCurrentPath(location: any) {
		return location.pathname === '/' ? location.pathname + 'beethoven' : location.pathname;
	}

	public getLastPriceFromStatus(status: IStatus[]): ISourceData<ICustodianPrice> {
		// const bitfinex: ICustodianPrice = {
		// 	address: CST.DUMMY_ADDR,
		// 	price: 0,
		// 	timestamp: 0
		// };
		const kraken: ICustodianPrice = {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		};
		const gemini: ICustodianPrice = {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		};
		const gdax: ICustodianPrice = {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		};
		status.forEach(s => {
			// if (s.process === 'PRICE_AWS_PUBLIC_BITFINEX') {
			// 	bitfinex.price = (s as IPriceStatus).price;
			// 	bitfinex.timestamp = (s as IPriceStatus).timestamp;
			// } else
			if (s.process === 'TRADE_AWS_PUBLIC_GEMINI') {
				gemini.price = (s as IPriceStatus).price;
				gemini.timestamp = (s as IPriceStatus).timestamp;
			} else if (s.process === 'TRADE_AWS_PUBLIC_KRAKEN') {
				kraken.price = (s as IPriceStatus).price;
				kraken.timestamp = (s as IPriceStatus).timestamp;
			} else if (s.process === 'TRADE_AWS_PUBLIC_GDAX') {
				gdax.price = (s as IPriceStatus).price;
				gdax.timestamp = (s as IPriceStatus).timestamp;
			}
		});

		return {
			// bitfinex,
			kraken,
			gemini,
			gdax
		};
	}
}

const util = new Util();
export default util;
