import { IRewardList, IStakeAddress, IStakeLot, IStakeV2States } from '@finbook/duo-contract-wrapper';
//import moment from 'moment';
import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
//import util from 'ts/common/util';
import { stakeV2Wrapper, web3Wrapper } from 'ts/common/wrappers';

export function statesUpdate(states: IStakeV2States) {
	return {
		type: CST.AC_STK_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	console.log('Get States');
	return async dispatch => {
		const states = await stakeV2Wrapper.getStates();
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
			web3Wrapper.contractAddresses.StakesV2[0].address
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
		const addr = await stakeV2Wrapper.getAddresses();
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
		const pfList = await stakeV2Wrapper.getOracleList();
		const userStake = await stakeV2Wrapper.getUserStakes(account, pfList);
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
		const addr = await stakeV2Wrapper.getAddresses();
		const oracleStake = await stakeV2Wrapper.getOracleStakes(addr.priceFeedList);
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
		const userAward = await stakeV2Wrapper.getUserReward(account);
		dispatch(userAwardUpdate(userAward));
	};
}
export function contractDUOUpdate(duoAmount: number) {
	return {
		type: CST.AC_STK_CONTRACTDUO,
		value: duoAmount
	};
}

export function getContractDUO(): VoidThunkAction {
	return async dispatch => {
		const duoAmount = await web3Wrapper.getErc20Balance(
			web3Wrapper.contractAddresses.DUO.address,
			web3Wrapper.contractAddresses.StakesV2[0].address
		);
		dispatch(contractDUOUpdate(duoAmount));
	};
}

export function stagingAddUpdate(rewards: IRewardList, index: number) {
	return {
		type: CST.AC_STK_STAGINGADD,
		value: rewards,
		index: index
	};
}

export function getStagingAdd(start: number, end: number): VoidThunkAction {
	return async dispatch => {
		for (let i = start; i <= end; i++)
			stakeV2Wrapper.getStagingAddReward(i).then(reward => dispatch(stagingAddUpdate(reward, i)));
	};
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_STK_SUB,
		id: intervalId
	};
}

export function refresh(): VoidThunkAction {
	console.log('Refresh');
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getBalances());
		dispatch(getAllowance());
		dispatch(getAddresses());
		dispatch(getUserStake());
		dispatch(getOracleStake());
		dispatch(getUserAward());
		dispatch(getContractDUO());
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
