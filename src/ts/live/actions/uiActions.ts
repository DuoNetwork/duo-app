import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import * as contractActions from './contractActions';
import * as dynamoActions from './dynamoActions';

export function refreshUpdate(): reduxTypes.Action {
	return {
		type: CST.AC_REFRESH
	};
}
export function refresh(): reduxTypes.ThunkAction {
	return async dispatch => {
		dispatch(contractActions.getCustodianStates());
		dispatch(contractActions.getCustodianPrices());
		dispatch(contractActions.getBalances());
		dispatch(dynamoActions.fetchHourly());
		dispatch(dynamoActions.fetchMinutely());
		dispatch(refreshUpdate());
	};
}
