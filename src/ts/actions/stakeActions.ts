import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
//import moment from 'moment';
import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
//import util from 'ts/common/util';
import { stakeWrapper, web3Wrapper } from 'ts/common/wrappers';

export function statesUpdate(states: IStakeStates) {
	return {
		type: CST.AC_STK_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	console.log('get State')
	return async dispatch => {
		const states = await stakeWrapper.getStates();
		dispatch(statesUpdate(states));
	};
}

export function balancesUpdate(duo: number) {
	return {
		type: CST.AC_STK_BALANCE,
		value: duo
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) => {
		console.log('get Balance');
		const account = getState().web3.account;
		console.log(account)
		const duoBalance = await web3Wrapper.getErc20Balance(
			web3Wrapper.contractAddresses.DUO,
			account
		);
		console.log(duoBalance);
		dispatch(balancesUpdate(duoBalance));
	};
}

export function addressesUpdate(addr: IStakeAddress) {
	return {
		type: CST.AC_STK_ADDRESSES,
		value: addr
	};
}

export function getAddresses(): VoidThunkAction {
	return async dispatch => {
		const addr = await stakeWrapper.getAddresses();
		console.log("Get Addresses*********")
		console.log(addr)
		dispatch(addressesUpdate(addr))
	};
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_STK_SUB,
		id: intervalId
	};
}

export function refresh(): VoidThunkAction {
	console.log('sub to stake');
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getBalances());
		dispatch(getAddresses());

	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 60000)));
	};
}

export function refreshAdmin(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
	};
}

export function subscribeAdmin(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refreshAdmin());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refreshAdmin()), 60000)));
	};
}
