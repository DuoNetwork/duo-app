import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
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
		const account = getState().web3.account;
		const duoBalance = await web3Wrapper.getErc20Balance(
			web3Wrapper.contractAddresses.DUO,
			account
		);
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
		dispatch(addressesUpdate(addr));
	};
}

export function userStakeUpdate(userStake: { [key: string]: IStakeLot[] }) {
	return {
		type: CST.AC_STK_USERSTAKE,
		value: userStake
	};
}

export function getUserStake(): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const pfList = await stakeWrapper.getPfList();
		const userStake = await stakeWrapper.getUserStakes(account, pfList);
		dispatch(userStakeUpdate(userStake));
	};
}

export function oracleStakeUpdate(oracleStake: { [key: string]: number }) {
	return {
		type: CST.AC_STK_ORACLESTAKE,
		value: oracleStake
	};
}

export function getOracleStake(): VoidThunkAction {
	return async dispatch => {
		const oracleStake = await stakeWrapper.getOracleStakes();
		dispatch(oracleStakeUpdate(oracleStake));
	};
}

export function userAwardUpdate(userAward: number) {
	return {
		type: CST.AC_STK_AWARD,
		value: userAward
	};
}

export function getUserAward(): VoidThunkAction {
	return async (dispatch, getState) => {
		console.log('Getting Award');
		const account = getState().web3.account;
		const userAward = await stakeWrapper.getUserAward(account);
		console.log('User award: ' + userAward);
		dispatch(userAwardUpdate(userAward));
	};
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_STK_SUB,
		id: intervalId
	};
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getBalances());
		dispatch(getAddresses());
		dispatch(getUserStake());
		dispatch(getOracleStake());
		dispatch(getUserAward());
	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 30000)));
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
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refreshAdmin()), 30000)));
	};
}
