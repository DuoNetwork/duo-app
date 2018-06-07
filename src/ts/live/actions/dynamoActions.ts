import moment from 'moment';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import dynamoUtil from '../common/dynamoUtil';
import { IPrice, IPriceBars } from '../common/types';

export function statusUpdate(status: object) {
	return {
		type: CST.AC_DNM_STATUS,
		value: status
	};
}

export function scanStatus() {
	return async dispatch => {
		const states = await dynamoUtil.scanStatus();
		dispatch(statusUpdate(states));
	};
}

export function hourlyUpdate(hourly: IPriceBars) {
	return {
		type: CST.AC_DMN_HOURLY,
		value: hourly
	};
}

export function fetchHourly() {
	return async dispatch => {
		const dates: string[] = [];
		const date = moment.utc();
		for (let i = 0; i < 7; i++) {
			dates.push(date.format('YYYY-MM-DD'))
			date.subtract(1, 'day');
		}
		const promistList = CST.EXCHANGES.map(src => dynamoUtil.queryHourlyOHLC(src, dates));
		const results = await Promise.all(promistList);
		const hourly: IPriceBars = {
			bitfinex: [],
			gemini: [],
			kraken: [],
			gdax: []
		};
		results.forEach((r, i) => (hourly[CST.EXCHANGES[i].toLowerCase()] = chartUtil.interpolate(r, true)));
		dispatch(hourlyUpdate(hourly));
	};
}

export function minutelyUpdate(minutely: IPriceBars) {
	return {
		type: CST.AC_DMN_MINUTELY,
		value: minutely
	};
}

export function fetchMinutely() {
	return async dispatch => {
		const dates: string[] = [];
		const date = moment.utc();
		for (let i = 0; i < 2; i++) {
			dates.push(date.format('YYYY-MM-DD-HH'))
			date.subtract(1, 'hour');
		}
		const promistList = CST.EXCHANGES.map(src => dynamoUtil.queryMinutelyOHLC(src, dates));
		const results = await Promise.all(promistList);
		const minutely: IPriceBars = {
			bitfinex: [],
			gemini: [],
			kraken: [],
			gdax: []
		};
		results.forEach((r, i) => (minutely[CST.EXCHANGES[i].toLowerCase()] = chartUtil.interpolate(r, false)));
		dispatch(minutelyUpdate(minutely));
	};
}

export function pricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_DMN_PRICES,
		value: prices
	};
}

export function fetchPrices() {
	return async dispatch => {
		const dates: string[] = [];
		const date = moment.utc();
		for (let i = 0; i < 7; i++) {
			dates.push(date.format('YYYY-MM-DD'))
			date.subtract(1, 'day');
		}
		dates.sort((a, b) => a.localeCompare(b));
		const result = await dynamoUtil.queryAcceptPriceEvent(dates);
		dispatch(pricesUpdate(result));
	};
}
