import moment from 'moment';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import {
	IAcceptedPrice,
	IConversion,
	IPrice,
	// ITotalSupply,
	VoidThunkAction
} from '../common/types';
import util from '../common/util';

export function statusUpdate(status: object) {
	return {
		type: CST.AC_STATUS,
		value: status
	};
}

export function scanStatus(): VoidThunkAction {
	return async dispatch => {
		const states = await dynamoUtil.scanStatus();
		dispatch(statusUpdate(states));
	};
}

export function pricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_PRICES,
		value: prices
	};
}

export function fetchPrices(): VoidThunkAction {
	return async (dispatch, state) => {
		const source = state().ui.source;
		const period = state().ui.period;
		dispatch(
			pricesUpdate(
				await dynamoUtil.getPrices(
					source,
					period,
					util.getUTCNowTimestamp() - period * 96 * 60000,
					0,
					'ETH|USD'
				)
			)
		);
	};
}

export function acceptedPricesUpdate(acceptedPrices: IAcceptedPrice[]) {
	return {
		type: CST.AC_ACCEPTED_PRICES,
		value: acceptedPrices
	};
}

export function fetchAcceptedPrices(): VoidThunkAction {
	return async (dispatch, getState) => {
		const dates = util.getDates(4, 1, 'day', 'YYYY-MM-DD');
		const priceData = await dynamoUtil.queryAcceptPriceEvent(dates);
		const custodianStates = getState().contract.states;
		dispatch(
			acceptedPricesUpdate(
				chartUtil.mergeReset(
					priceData,
					chartUtil.reset(
						priceData,
						custodianStates.limitUpper,
						custodianStates.limitLower,
						custodianStates.limitPeriodic
					)
				)
			)
		);
	};
}

export function conversionsUpdate(conversions: IConversion[]) {
	return {
		type: CST.AC_CONVERSIONS,
		value: conversions
	};
}

export function fetchConversions(): VoidThunkAction {
	return async (dispatch, getState) => {
		const nowTimestamp = util.getUTCNowTimestamp();
		const dates = util.getDates(7, 1, 'day', 'YYYY-MM-DD');
		const account = getState().contract.account;
		const conversion = await dynamoUtil.queryConversionEvent(
			getState().contract.account,
			dates
		);
		(await dynamoUtil.queryUIConversionEvent(account)).forEach(uc => {
			if (
				!dates.includes(moment.utc(uc.timestamp).format('YYYY-MM-DD')) ||
				conversion.some(c => c.transactionHash === uc.transactionHash) ||
				(uc.pending && nowTimestamp - uc.timestamp > CST.PENDING_TX_TIMEOUT)
			)
				dynamoUtil.deleteUIConversionEvent(account, uc);
			else conversion.push(uc);
		});
		conversion.sort((a, b) => -a.timestamp + b.timestamp);
		dispatch(conversionsUpdate(conversion));
	};
}

// export function totalSupplyUpdate(totalSupply: ITotalSupply[]) {
// 	return {
// 		type: CST.AC_TOTAL_SUPPLY,
// 		value: totalSupply
// 	};
// }

// export function fetchTotalSupply(): VoidThunkAction {
// 	return async dispatch => {
// 		const dates = util.getDates(75, 1, 'hour', 'YYYY-MM-DD-HH');
// 		dispatch(totalSupplyUpdate(await dynamoUtil.queryTotalSupplyEvent(dates)));
// 	};
// }
