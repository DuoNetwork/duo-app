import moment from 'moment';
import chartUtil from 'ts/common/chartUtil';
import * as CST from 'ts/common/constants';
import {
	IAcceptedPrice,
	IBeethovenStates,
	IConversion,
	ICustodianAddresses,
	IPrice,
	VoidThunkAction
} from 'ts/common/types';
import util from 'ts/common/util';
import { getBeethovenAddressByTenor, getBeethovenWrapperByTenor } from 'ts/common/wrappers';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';

export function statesUpdate(states: IBeethovenStates) {
	return {
		type: CST.AC_BTV_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	return async (dispatch, getState) => {
		const beethovenWapper = getBeethovenWrapperByTenor(getState().beethoven.tenor);
		const states = await beethovenWapper.getStates();
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
		const beethovenWapper = getBeethovenWrapperByTenor(getState().beethoven.tenor);
		const account = getState().web3.account;
		const { aToken, bToken } = getBeethovenAddressByTenor(getState().beethoven.tenor);
		const aBalance = await beethovenWapper.web3Wrapper.getErc20Balance(aToken.address, account);
		const bBalance = await beethovenWapper.web3Wrapper.getErc20Balance(bToken.address, account);
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
	return async (dispatch, getState) => {
		const beethovenWapper = getBeethovenWrapperByTenor(getState().beethoven.tenor);
		dispatch(addressesUpdate(await beethovenWapper.getAddresses()));
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
		const states = getState().beethoven.states;
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

export function subscriptionUpdate(tenor: string, intervalId: number) {
	return {
		type: CST.AC_BTV_SUB,
		tenor: tenor,
		id: intervalId
	};
}

export function refresh(full: boolean): VoidThunkAction {
	return async (dispatch, getState) => {
		const contractAddress = getBeethovenAddressByTenor(getState().beethoven.tenor).custodian
			.address;
		await dispatch(getStates());
		dispatch(getBalances());
		if (full) {
			dispatch(fetchExchangePrices());
			dispatch(fetchAcceptedPrices(contractAddress));
		}
		dispatch(fetchConversions(contractAddress));
	};
}

export function subscribe(tenor: string): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(tenor, 0));
		dispatch(refresh(true));
		dispatch(subscriptionUpdate(tenor, window.setInterval(() => dispatch(refresh(true)), 60000)));
	};
}

export function refreshAdmin(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
	};
}

export function subscribeAdmin(tenor: string): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(tenor, 0));
		dispatch(refreshAdmin());
		dispatch(
			subscriptionUpdate(tenor, window.setInterval(() => dispatch(refreshAdmin()), 60000))
		);
	};
}
