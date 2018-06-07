import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import { IAddresses, IBalances, ICustodianPrices, ICustodianStates } from '../common/types';

export function accountUpdate(account: string) {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function custodianStatesUpdate(states: ICustodianStates) {
	return {
		type: CST.AC_CTD_STATES,
		value: states
	};
}

export function getCustodianStates() {
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

export function getCustodianPrices() {
	return async dispatch => dispatch(custodianPricesUpdate(await contractUtil.getSystemPrices()));
}

export function balancesUpdate(balance: IBalances) {
	return {
		type: CST.AC_BALANCES,
		value: balance
	};
}

export function getBalances() {
	return async dispatch => {
		const account = await contractUtil.getCurrentAddress();
		dispatch(accountUpdate(account));
		dispatch(balancesUpdate(await contractUtil.getBalances(account)));
	};
}

export function addressesUpdate(addr: IAddresses) {
	return {
		type: CST.AC_ADDRESSES,
		value: addr
	};
}

export function getAddresses() {
	return async dispatch => dispatch(addressesUpdate(await contractUtil.getSystemAddresses()));
}
