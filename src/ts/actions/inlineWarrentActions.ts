import { IStakeV2States } from '@finbook/duo-contract-wrapper';
import { IPrice } from '@finbook/duo-market-data';
//import moment from 'moment';
import * as CST from 'ts/common/constants';
import dynamoUtil from 'ts/common/dynamoUtil';
import { VoidThunkAction } from 'ts/common/types';
import util from 'ts/common/util';
import warrantUtil from 'ts/common/warrantUtil';
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

export function exchangePricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_DCC_EX_PX,
		value: prices
	};
}

export function fetchExchangePrices(): VoidThunkAction {
	return async dispatch => {
		const source = 'kraken';
		const start = util.getUTCNowTimestamp() - 24 * 60 * 60000;
		dispatch(exchangePricesUpdate(await dynamoUtil.getPrices(source, 1, start, 0, 'ETH|USD')));
	};
}

export function boundariesUpdate(boundaries: number[]) {
	return {
		type: CST.AC_IW_BOUNDARIES,
		value: boundaries
	};
}

export function fetchBoundaries(): VoidThunkAction {
	return async dispatch => {
		const boundaries = await warrantUtil.getBoundaries();
		dispatch(boundariesUpdate(boundaries));
	};
}

export function currentRoundUpdate(currentRoundInfo: object[]) {
	return {
		type: CST.AC_IW_CURRENTROUND,
		value: currentRoundInfo
	};
}

export function fetchCurrentRoundInfo(): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const currentRoundInfo = await warrantUtil.getCurrentRoundInfo(account);
		dispatch(currentRoundUpdate(currentRoundInfo));
	};
}

export function addressInfoUpdate(addressInfo: any) {
	return {
		type: CST.AC_IW_ADDRESSINFO,
		value: addressInfo
	};
}

export function fetchAddressInfo(): VoidThunkAction {
	return async (dispatch, getState) => {
		const account = getState().web3.account;
		const addressInfo = await warrantUtil.getAddressInfo(account);
		dispatch(addressInfoUpdate(addressInfo));
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
		dispatch(getUserAward());
		dispatch(fetchCurrentRoundInfo());
		dispatch(fetchAddressInfo());
		dispatch(fetchBoundaries());
		dispatch(fetchExchangePrices());
	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 10000)));
	};
}

// export function refreshAdmin(): VoidThunkAction {
// 	return async dispatch => {
// 		await dispatch(getStates());
// 		dispatch(getAddresses());
// 	};
// }

// export function subscribeAdmin(): VoidThunkAction {
// 	return async dispatch => {
// 		dispatch(subscriptionUpdate());
// 		dispatch(refreshAdmin());
// 		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refreshAdmin()), 30000)));
// 	};
// }
