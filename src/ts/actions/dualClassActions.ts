import { ICustodianAddresses, IDualClassStates } from '@finbook/duo-contract-wrapper';
import { IAcceptedPrice, IConversion, IPrice } from '@finbook/duo-market-data';
import moment from 'moment';
import chartUtil from 'ts/common/chartUtil';
import * as CST from 'ts/common/constants';
import dynamoUtil from 'ts/common/dynamoUtil';
import { VoidThunkAction } from 'ts/common/types';
import util from 'ts/common/util';
import {
	getDualClassAddressByTypeTenor,
	getDualClassWrapperByTypeTenor,
	web3Wrapper
} from 'ts/common/wrappers';

export function statesUpdate(states: IDualClassStates) {
	return {
		type: CST.AC_DCC_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	return async (dispatch, getState) => {
		const dualClassWrapper = getDualClassWrapperByTypeTenor(
			getState().dualClass.type,
			getState().dualClass.tenor
		);
		const states = await dualClassWrapper.getStates();
		dispatch(statesUpdate(states));
	};
}

export function balancesUpdate(a: number, b: number, duo: number) {
	return {
		type: CST.AC_DCC_BALANCES,
		value: {
			a: a,
			b: b,
			duo: duo
		}
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) => {
		const dualClassWrapper = getDualClassWrapperByTypeTenor(
			getState().dualClass.type,
			getState().dualClass.tenor
		);
		const account = getState().web3.account;
		const { aToken, bToken } = getDualClassAddressByTypeTenor(
			getState().dualClass.type,
			getState().dualClass.tenor
		);
		const aBalance = await dualClassWrapper.web3Wrapper.getErc20Balance(
			aToken.address,
			account
		);
		const bBalance = await dualClassWrapper.web3Wrapper.getErc20Balance(
			bToken.address,
			account
		);
		const duoBalance = await dualClassWrapper.web3Wrapper.getErc20Balance(
			'0x61ca89cfc5e8099702e64e97d9b5fc457cf1d355',
			account
		);
		dispatch(balancesUpdate(aBalance, bBalance, duoBalance));
	};
}

export function addressesUpdate(addr: ICustodianAddresses) {
	return {
		type: CST.AC_DCC_ADDRESSES,
		value: addr
	};
}

export function getAddresses(): VoidThunkAction {
	return async (dispatch, getState) => {
		const dualClassWrapper = getDualClassWrapperByTypeTenor(
			getState().dualClass.type,
			getState().dualClass.tenor
		);
		dispatch(addressesUpdate(await dualClassWrapper.getAddresses()));
	};
}
export function exchangePricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_DCC_EX_PX,
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
		type: CST.AC_DCC_ACCEPTED_PX,
		value: acceptedPrices
	};
}

export function fetchAcceptedPrices(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const dates = util.getDates(4, 1, 'day', 'YYYY-MM-DD');
		const priceData = await dynamoUtil.queryAcceptPriceEvent(contractAddress, dates);
		const states = getState().dualClass.states;
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
		type: CST.AC_DCC_CONVERSIONS,
		value: conversions
	};
}

export function fetchConversions(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const nowTimestamp = util.getUTCNowTimestamp();
		const dates = util.getDates(7, 1, 'day', 'YYYY-MM-DD');
		const account = getState().web3.account;
		const conversion = await dynamoUtil.queryConversionEvent(contractAddress, account, dates);
		const uiConversions = await dynamoUtil.queryUIConversionEvent(contractAddress, account);
		for (const uc of uiConversions) {
			try {
				const receipt = await web3Wrapper.getTransactionReceipt(uc.transactionHash);
				uc.pending = !receipt;
				uc.reverted = !!receipt && !receipt.status;
			} catch (error) {
				continue;
			}

			if (
				!dates.includes(moment.utc(uc.timestamp).format('YYYY-MM-DD')) ||
				conversion.some(c => c.transactionHash === uc.transactionHash) ||
				(uc.pending && nowTimestamp - uc.timestamp > CST.PENDING_TX_TIMEOUT)
			)
				dynamoUtil.deleteUIConversionEvent(account, uc);
			else conversion.push(uc);
		}

		conversion.sort((a, b) => -a.timestamp + b.timestamp);
		dispatch(conversionsUpdate(conversion));
	};
}

export function subscriptionUpdate(type: string, tenor: string, intervalId: number) {
	return {
		type: CST.AC_DCC_SUB,
		custodianType: type,
		tenor: tenor,
		id: intervalId
	};
}

export function refresh(full: boolean): VoidThunkAction {
	return async (dispatch, getState) => {
		const contractAddress = getDualClassAddressByTypeTenor(
			getState().dualClass.type,
			getState().dualClass.tenor
		).custodian.address;
		await dispatch(getStates());
		dispatch(getBalances());
		if (full) {
			dispatch(fetchExchangePrices());
			dispatch(fetchAcceptedPrices(contractAddress));
		}
		dispatch(fetchConversions(contractAddress));
	};
}

export function subscribe(type: string, tenor: string): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(type, tenor, 0));
		dispatch(refresh(true));
		dispatch(
			subscriptionUpdate(
				type,
				tenor,
				window.setInterval(() => dispatch(refresh(true)), 60000)
			)
		);
	};
}

export function refreshAdmin(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
	};
}

export function subscribeAdmin(type: string, tenor: string): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(type, tenor, 0));
		dispatch(refreshAdmin());
		dispatch(
			subscriptionUpdate(
				type,
				tenor,
				window.setInterval(() => dispatch(refreshAdmin()), 60000)
			)
		);
	};
}
