import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as reduxTypes from '../common/reduxTypes';
import { ICustodianStates } from '../common/types';

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
