import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
import { web3Wrapper } from 'ts/common/wrappers';

export function accountUpdate(account: string) {
	return {
		type: CST.AC_WEB3_ACCOUNT,
		value: account
	};
}

export function getAccount(): VoidThunkAction {
	return async dispatch => dispatch(accountUpdate(await web3Wrapper.getCurrentAddress()));
}

export function networkUpdate(networkId: number) {
	return {
		type: CST.AC_WEB3_NETWORK,
		value: networkId
	};
}

export function getNetwork(): VoidThunkAction {
	return async dispatch => dispatch(networkUpdate(await web3Wrapper.getCurrentNetwork()));
}

export function gasPriceUpdate(gasPrice: number) {
	return {
		type: CST.AC_WEB3_GAS_PX,
		value: gasPrice
	};
}

export function getGasPrice(): VoidThunkAction {
	return async dispatch => dispatch(gasPriceUpdate(await web3Wrapper.getGasPrice()));
}

export function balanceUpdate(balance: number) {
	return {
		type: CST.AC_WEB3_BALACE,
		value: balance
	};
}

export function getBalance(): VoidThunkAction {
	return async (dispatch, getState) =>
		dispatch(balanceUpdate(await web3Wrapper.getEthBalance(getState().web3.account)));
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getAccount());
		dispatch(getGasPrice());
		dispatch(getNetwork());
		dispatch(getBalance());
	};
}
