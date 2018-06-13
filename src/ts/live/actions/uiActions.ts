import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
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
		dispatch(contractActions.accountUpdate(await contractUtil.getCurrentAddress()));
		dispatch(contractActions.getNetwork());
		dispatch(contractActions.getBalances());
		dispatch(contractActions.getCustodianStates());
		dispatch(contractActions.getCustodianPrices());
		dispatch(dynamoActions.scanStatus());
		dispatch(dynamoActions.fetchHourly());
		dispatch(dynamoActions.fetchMinutely());
		dispatch(dynamoActions.fetchPrices());
		dispatch(dynamoActions.fetchConversions());
		dispatch(refreshUpdate());
	};
}
