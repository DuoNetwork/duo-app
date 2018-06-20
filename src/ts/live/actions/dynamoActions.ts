import moment from 'moment';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import dynamoUtil from '../common/dynamoUtil';
import {
	IAcceptedPrice,
	IConversion,
	IPriceBar,
	ISourceData,
	ITotalSupply,
	VoidThunkAction
} from '../common/types';
import util from '../common/util';

export function statusUpdate(status: object) {
	return {
		type: CST.AC_DNM_STATUS,
		value: status
	};
}

export function scanStatus(): VoidThunkAction {
	return async dispatch => {
		const states = await dynamoUtil.scanStatus();
		dispatch(statusUpdate(states));
	};
}

export function hourlyUpdate(hourly: ISourceData<IPriceBar[]>) {
	return {
		type: CST.AC_DMN_HOURLY,
		value: hourly
	};
}

export function fetchHourly(): VoidThunkAction {
	return async dispatch => {
		const dates = util.getDates(8, 1, 'day', 'YYYY-MM-DD');
		const promistList = CST.EXCHANGES.map(src => dynamoUtil.queryHourlyOHLC(src, dates));
		const results = await Promise.all(promistList);
		const hourly: ISourceData<IPriceBar[]> = {
			bitfinex: [],
			gemini: [],
			kraken: [],
			gdax: []
		};
		results.forEach(
			(r, i) => (hourly[CST.EXCHANGES[i].toLowerCase()] = chartUtil.interpolate(r, true))
		);
		dispatch(hourlyUpdate(hourly));
	};
}

export function minutelyUpdate(minutely: ISourceData<IPriceBar[]>) {
	return {
		type: CST.AC_DMN_MINUTELY,
		value: minutely
	};
}

export function fetchMinutely(): VoidThunkAction {
	return async dispatch => {
		const dates = util.getDates(3, 1, 'hour', 'YYYY-MM-DD-HH');
		const promistList = CST.EXCHANGES.map(src => dynamoUtil.queryMinutelyOHLC(src, dates));
		const results = await Promise.all(promistList);
		const minutely: ISourceData<IPriceBar[]> = {
			bitfinex: [],
			gemini: [],
			kraken: [],
			gdax: []
		};
		results.forEach(
			(r, i) => (minutely[CST.EXCHANGES[i].toLowerCase()] = chartUtil.interpolate(r, false))
		);
		dispatch(minutelyUpdate(minutely));
	};
}

export function priceUpdate(prices: IAcceptedPrice[]) {
	return {
		type: CST.AC_DMN_PRICE,
		value: prices
	};
}

export function fetchPrice(): VoidThunkAction {
	return async dispatch => {
		const dates = util.getDates(8, 1, 'day', 'YYYY-MM-DD');
		dispatch(priceUpdate(await dynamoUtil.queryAcceptPriceEvent(dates)));
	};
}

export function conversionUpdate(conversions: IConversion[]) {
	return {
		type: CST.AC_CONVERSION,
		value: conversions
	};
}

export function uiConversionUpdate(conversions: IConversion[]) {
	return {
		type: CST.AC_UI_CONVERSION,
		value: conversions
	};
}

export function fetchConversion(): VoidThunkAction {
	return async (dispatch, getState) => {
		const dates = util.getDates(7, 1, 'day', 'YYYY-MM-DD');
		const account = getState().contract.account;
		const conversion = await dynamoUtil.queryConversionEvent(
			getState().contract.account,
			dates
		);
		const uiConversion: IConversion[] = [];
		(await dynamoUtil.queryUIConversionEvent(account)).forEach(uc => {
			if (
				!dates.includes(moment.utc(uc.timestamp).format('YYYY-MM-DD')) ||
				conversion.some(c => c.transactionHash === uc.transactionHash)
			)
				dynamoUtil.deleteUIConversionEvent(account, uc);
			else uiConversion.push(uc);
		});
		dispatch(uiConversionUpdate(uiConversion));
		dispatch(conversionUpdate(conversion));
	};
}

export function totalSupplyUpdate(totalSupplies: ITotalSupply[]) {
	return {
		type: CST.AC_TOTAL_SUPPLY,
		value: totalSupplies
	};
}

export function fetchTotalSupply(): VoidThunkAction {
	return async dispatch => {
		const dates = util.getDates(24, 1, 'hour', 'YYYY-MM-DD-HH');
		dispatch(totalSupplyUpdate(await dynamoUtil.queryTotalSupplyEvent(dates)));
	};
}
