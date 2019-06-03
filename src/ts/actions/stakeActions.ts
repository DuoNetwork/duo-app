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
			web3Wrapper.contractAddresses.DUO.address,
			account
		);
		dispatch(balancesUpdate(duoBalance));
	};
}

export function allowanceUpdate(duo: number) {
	return {
		type: CST.AC_STK_ALLOWANCE,
		value: duo
	};
}

export function getAllowance(): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const duoAllowance = await web3Wrapper.getErc20Allowance(
			web3Wrapper.contractAddresses.DUO.address,
			account,
			web3Wrapper.contractAddresses.Stake.address
		);
		dispatch(allowanceUpdate(duoAllowance));
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
		const pfList = await stakeWrapper.getOracleList();
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
		const addr = await stakeWrapper.getAddresses();
		const oracleStake = await stakeWrapper.getOracleStakes(addr.priceFeedList);
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
		const account = getState().web3.account;
		const userAward = await stakeWrapper.getUserAward(account);
		dispatch(userAwardUpdate(userAward));
	};
}
export function contractDUOUpdate(duoAmount: number) {
	return {
		type: CST.AC_STK_CONTRACTDUO,
		value: duoAmount
	};
}

export function gerContractDUO(): VoidThunkAction {
	return async dispatch => {
		const duoAmount = await web3Wrapper.getErc20Balance(
			web3Wrapper.contractAddresses.DUO.address,
			web3Wrapper.contractAddresses.Stake.address
		);
		dispatch(contractDUOUpdate(duoAmount));
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
		dispatch(getAllowance());
		dispatch(getAddresses());
		dispatch(getUserStake());
		dispatch(getOracleStake());
		dispatch(getUserAward());
		dispatch(gerContractDUO());
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
