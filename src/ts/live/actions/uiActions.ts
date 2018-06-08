import * as CST from '../common/constants';
import { VoidThunkAction } from '../common/types';
import * as contractActions from './contractActions';
import * as dynamoActions from './dynamoActions';

export function refreshUpdate() {
	return {
		type: CST.AC_REFRESH
	};
}
export function refresh(): VoidThunkAction {
	return async dispatch => {
		dispatch(contractActions.getCustodianStates());
		dispatch(contractActions.getCustodianPrices());
		dispatch(contractActions.getBalances());
		dispatch(dynamoActions.fetchHourly());
		dispatch(dynamoActions.fetchMinutely());
		dispatch(dynamoActions.fetchPrices());
		dispatch(refreshUpdate());
	};
}
