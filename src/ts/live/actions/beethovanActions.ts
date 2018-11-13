import moment from 'moment';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import {
	IAcceptedPrice,
	IBeethovanStates,
	IConversion,
	ICustodianAddresses,
	IPrice,
	VoidThunkAction
} from '../common/types';
import util from '../common/util';
import { beethovanWapper } from '../common/wrappers';

export function statesUpdate(states: IBeethovanStates) {
	return {
		type: CST.AC_BTV_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	return async dispatch => {
		const states = await beethovanWapper.getStates();
		dispatch(statesUpdate(states));
	};
}

export function balancesUpdate(a: number, b: number) {
	return {
		type: CST.AC_BTV_BALANCES,
		value: {
			a: a,
			b: b
		}
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const { aToken, bToken } = beethovanWapper.web3Wrapper.contractAddresses.Beethovan;
		const aBalance = await beethovanWapper.web3Wrapper.getErc20Balance(aToken, account);
		const bBalance = await beethovanWapper.web3Wrapper.getErc20Balance(bToken, account);
		dispatch(balancesUpdate(aBalance, bBalance));
	};
}

export function addressesUpdate(addr: ICustodianAddresses) {
	return {
		type: CST.AC_BTV_ADDRESSES,
		value: addr
	};
}

export function getAddresses(): VoidThunkAction {
	return async dispatch => {
		dispatch(addressesUpdate(await beethovanWapper.getAddresses()));
	};
}
export function exchangePricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_BTV_EX_PX,
		value: prices
	};
}

export function fetchExchangePrices(): VoidThunkAction {
	return async (dispatch, state) => {
		const source = state().ui.source;
		const period = state().ui.period;
		const start =
			period === 60
				? util.getUTCNowTimestamp() - period * 96 * 60000
				: util.getUTCNowTimestamp() - 400 * 60000;
		dispatch(
			exchangePricesUpdate(
				await dynamoUtil.getPrices(source, period === 60 ? 60 : 1, start, 0, 'ETH|USD')
			)
		);
	};
}

export function acceptedPricesUpdate(acceptedPrices: IAcceptedPrice[]) {
	return {
		type: CST.AC_BTV_ACCEPTED_PX,
		value: acceptedPrices
	};
}

export function fetchAcceptedPrices(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const dates = util.getDates(4, 1, 'day', 'YYYY-MM-DD');
		const priceData = await dynamoUtil.queryAcceptPriceEvent(contractAddress, dates);
		const states = getState().beethovan.states;
		dispatch(
			acceptedPricesUpdate(
				chartUtil.mergeReset(
					priceData,
					chartUtil.reset(
						priceData,
						states.limitUpper,
						states.limitLower,
						states.limitPeriodic
					)
				)
			)
		);
	};
}

export function conversionsUpdate(conversions: IConversion[]) {
	return {
		type: CST.AC_BTV_CONVERSIONS,
		value: conversions
	};
}

export function fetchConversions(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const nowTimestamp = util.getUTCNowTimestamp();
		const dates = util.getDates(7, 1, 'day', 'YYYY-MM-DD');
		const account = getState().web3.account;
		const conversion = await dynamoUtil.queryConversionEvent(contractAddress, account, dates);
		(await dynamoUtil.queryUIConversionEvent(contractAddress, account)).forEach(uc => {
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

export function refresh(): VoidThunkAction {
	return async dispatch => {
		const custodian = beethovanWapper.web3Wrapper.contractAddresses.Beethovan.custodian;
		await dispatch(getStates());
		dispatch(getBalances());
		dispatch(fetchExchangePrices());
		dispatch(fetchAcceptedPrices(custodian));
		dispatch(fetchConversions(custodian));
	};
}
