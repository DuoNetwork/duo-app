import * as CST from '../common/constants';
import contract from '../common/contract';
import { VoidThunkAction } from '../common/types';

export function accountUpdate(account: string) {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function getAccount(): VoidThunkAction {
	return async dispatch => dispatch(accountUpdate(await contract.getCurrentAddress()));
}

export function networkUpdate(networkId: number) {
	return {
		type: CST.AC_NETWORK,
		value: networkId
	};
}

export function getNetwork(): VoidThunkAction {
	return async dispatch => dispatch(networkUpdate(await contract.getCurrentNetwork()));
}

export function gasPriceUpdate(gasPrice: number) {
	return {
		type: CST.AC_GAS_PX,
		value: gasPrice
	};
}

export function getGasPrice(): VoidThunkAction {
	return async dispatch => dispatch(gasPriceUpdate(await contract.getGasPrice()));
}

export function refresh(): VoidThunkAction {
	return dispatch => {
		dispatch(getAccount());
		dispatch(getGasPrice());
		dispatch(getNetwork());
	};
}
