import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import {
	IAddresses,
	IBalances,
	ICustodianPrices,
	ICustodianStates,
	VoidThunkAction
} from '../common/types';

export function accountUpdate(account: string) {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function networkUpdate(networkId: number) {
	return {
		type: CST.AC_NETWORK,
		value: networkId
	};
}

export function getNetwork(): VoidThunkAction {
	return async dispatch => dispatch(networkUpdate(await contractUtil.getCurrentNetwork()));
}

export function custodianStatesUpdate(states: ICustodianStates) {
	return {
		type: CST.AC_CTD_STATES,
		value: states
	};
}

export function getCustodianStates(): VoidThunkAction {
	return async dispatch => {
		const states = await contractUtil.getSystemStates();
		dispatch(custodianStatesUpdate(states));
	};
}

export function custodianPricesUpdate(prices: ICustodianPrices) {
	return {
		type: CST.AC_CTD_PRICES,
		value: prices
	};
}

export function getCustodianPrices(): VoidThunkAction {
	return async dispatch => dispatch(custodianPricesUpdate(await contractUtil.getSystemPrices()));
}

export function balancesUpdate(balance: IBalances) {
	return {
		type: CST.AC_BALANCES,
		value: balance
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) =>
		dispatch(balancesUpdate(await contractUtil.getBalances(getState().contract.account)));
}

export function addressesUpdate(addr: IAddresses) {
	return {
		type: CST.AC_ADDRESSES,
		value: addr
	};
}

export function getAddresses(): VoidThunkAction {
	return async dispatch => dispatch(addressesUpdate(await contractUtil.getSystemAddresses()));
}
