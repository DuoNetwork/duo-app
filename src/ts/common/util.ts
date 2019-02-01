import { IContractPrice } from '@finbook/duo-contract-wrapper';
import { IPriceStatus, IStatus } from '@finbook/duo-market-data';
import * as d3 from 'd3';
import moment, { DurationInputArg2 } from 'moment';
import { ISourceData } from './types';

class Util {
	public convertUpdateTime(timestamp: number): string {
		const diff = this.getUTCNowTimestamp() - timestamp;
		if (diff < 60000) return 'Just Now';
		else if (diff < 3600000) return Math.floor(diff / 60000) + ' Minutes Ago';
		else if (diff < 86400000) return Math.floor(diff / 3600000) + ' Hours Ago';
		else if (diff < 2592000000) return Math.floor(diff / 86400000) + ' Days Ago';
		else return 'Long Time Ago';
	}

	public formatTime(e: number) {
		return moment(e).format('YYYY-MM-DD HH:mm:ss');
	}

	public getUTCNowTimestamp() {
		return moment().valueOf();
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

	public getLastPriceFromStatus(status: IStatus[]): ISourceData<IContractPrice> {
		// const bitfinex: ICustodianPrice = {
		// 	price: 0,
		// 	timestamp: 0
		// };
		const kraken: IContractPrice = {
			price: 0,
			timestamp: 0
		};
		const gemini: IContractPrice = {
			price: 0,
			timestamp: 0
		};
		const gdax: IContractPrice = {
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
