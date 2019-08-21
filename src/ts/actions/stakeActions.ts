import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
//import moment from 'moment';
import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
//import util from 'ts/common/util';
import { stakeWrappers, web3Wrapper } from 'ts/common/wrappers';

export function statesUpdate(states: IStakeStates, index: number) {
	return {
		type: CST.AC_STK_STATES,
		value: states,
		index: index
	};
}

export function getStates(index: number): VoidThunkAction {
	return async dispatch => {
		const states = await stakeWrappers[index].getStates();
		dispatch(statesUpdate(states, index));
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

export function allowanceUpdate(duo: number, index: number) {
	return {
		type: CST.AC_STK_ALLOWANCE,
		value: duo,
		index: index
	};
}

export function getAllowance(index: number): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const duoAllowance = await web3Wrapper.getErc20Allowance(
			web3Wrapper.contractAddresses.DUO.address,
			account,
			web3Wrapper.contractAddresses.Stakes[index].address
		);
		dispatch(allowanceUpdate(duoAllowance, index));
	};
}

export function addressesUpdate(addr: IStakeAddress, index: number) {
	return {
		type: CST.AC_STK_ADDRESSES,
		value: addr,
		index: index
	};
}

export function getAddresses(index: number): VoidThunkAction {
	return async dispatch => {
		const addr = await stakeWrappers[index].getAddresses();
		dispatch(addressesUpdate(addr, index));
	};
}

export function userStakeUpdate(userStake: { [key: string]: IStakeLot[] }, index: number) {
	return {
		type: CST.AC_STK_USERSTAKE,
		value: userStake,
		index: index
	};
}

export function getUserStake(index: number): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const pfList = await stakeWrappers[index].getOracleList();
		const userStake = await stakeWrappers[index].getUserStakes(account, pfList);
		dispatch(userStakeUpdate(userStake, index));
	};
}

export function oracleStakeUpdate(oracleStake: { [key: string]: number }, index: number) {
	return {
		type: CST.AC_STK_ORACLESTAKE,
		value: oracleStake,
		index: index
	};
}

export function getOracleStake(index: number): VoidThunkAction {
	return async dispatch => {
		const addr = await stakeWrappers[index].getAddresses();
		const oracleStake = await stakeWrappers[index].getOracleStakes(addr.priceFeedList);
		dispatch(oracleStakeUpdate(oracleStake, index));
	};
}

export function userAwardUpdate(userAward: number, index: number) {
	return {
		type: CST.AC_STK_AWARD,
		value: userAward,
		index: index
	};
}

export function getUserAward(index: number): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const userAward = await stakeWrappers[index].getUserAward(account);
		dispatch(userAwardUpdate(userAward, index));
	};
}
export function contractDUOUpdate(duoAmount: number, index: number) {
	return {
		type: CST.AC_STK_CONTRACTDUO,
		value: duoAmount,
		index: index
	};
}

export function gerContractDUO(index: number): VoidThunkAction {
	return async dispatch => {
		const duoAmount = await web3Wrapper.getErc20Balance(
			web3Wrapper.contractAddresses.DUO.address,
			web3Wrapper.contractAddresses.Stakes[index].address
		);
		dispatch(contractDUOUpdate(duoAmount, index));
	};
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_STK_SUB,
		id: intervalId
	};
}

export function refresh(index: number): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates(index));
		dispatch(getBalances());
		dispatch(getAllowance(index));
		dispatch(getAddresses(index));
		dispatch(getUserStake(index));
		dispatch(getOracleStake(index));
		dispatch(getUserAward(index));
		dispatch(gerContractDUO(index));
	};
}

export function subscribe(index: number): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(index));
		dispatch(refresh(index));
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh(index)), 30000)));
	};
}

export function refreshAdmin(index: number): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates(index));
		dispatch(getAddresses(index));
	};
}

export function subscribeAdmin(index: number): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(index));
		dispatch(refreshAdmin(index));
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refreshAdmin(index)), 30000)));
	};
}
