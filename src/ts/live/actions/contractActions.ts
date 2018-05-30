import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as reduxTypes from '../common/reduxTypes';
import { IBalances, ICustodianPrice, ICustodianStates } from '../common/types';

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

export function custodianPricesUpdate(prices: {
	[name: string]: ICustodianPrice;
}): reduxTypes.Action {
	return {
		type: CST.AC_CTD_PRICES,
		value: prices
	};
}

export function getCustodianPrices(): reduxTypes.ThunkAction {
	return async dispatch => {
		const prices = await contractUtil.getSystemPrices();
		dispatch(
			custodianPricesUpdate({
				reset: prices[0],
				last: prices[1]
			})
		);
	};
}

export function balancesUpdate(balance: IBalances): reduxTypes.Action {
	return {
		type: CST.AC_BALANCES,
		value: balance
	};
}

export function getBalances(): reduxTypes.ThunkAction {
	return async dispatch => {
		const balances = await contractUtil.getBalances();
		dispatch(balancesUpdate(balances));
	};
}
