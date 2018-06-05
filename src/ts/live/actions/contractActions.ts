import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as reduxTypes from '../common/reduxTypes';
import { IAddresses, IBalances, ICustodianPrices, ICustodianStates } from '../common/types';

export function accountUpdate(account: string): reduxTypes.Action {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function custodianStatesUpdate(states: ICustodianStates): reduxTypes.Action {
	return {
		type: CST.AC_CTD_STATES,
		value: states
	};
}

export function getCustodianStates(): reduxTypes.ThunkAction {
	return async dispatch => {
		const states = await contractUtil.getSystemStates();
		dispatch(custodianStatesUpdate(states));
	};
}

export function custodianPricesUpdate(prices: ICustodianPrices): reduxTypes.Action {
	return {
		type: CST.AC_CTD_PRICES,
		value: prices
	};
}

export function getCustodianPrices(): reduxTypes.ThunkAction {
	return async dispatch => dispatch(custodianPricesUpdate(await contractUtil.getSystemPrices()));
}

export function balancesUpdate(balance: IBalances): reduxTypes.Action {
	return {
		type: CST.AC_BALANCES,
		value: balance
	};
}

export function getBalances(): reduxTypes.ThunkAction {
	return async dispatch => {
		const account = await contractUtil.getCurrentAddress();
		dispatch(accountUpdate(account));
		dispatch(balancesUpdate(await contractUtil.getBalances(account)));
	};
}

export function addressesUpdate(addr: IAddresses): reduxTypes.Action {
	return {
		type: CST.AC_ADDRESSES,
		value: addr
	};
}

export function getAddresses(): reduxTypes.ThunkAction {
	return async dispatch => dispatch(addressesUpdate(await contractUtil.getSystemAddresses()));
}
