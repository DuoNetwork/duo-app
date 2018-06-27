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

export function refresh(isAdminPage: boolean = false): VoidThunkAction {
	return async dispatch => {
		dispatch(contractActions.accountUpdate(await contractUtil.getCurrentAddress()));
		await dispatch(contractActions.getNetwork());
		await dispatch(contractActions.getCustodianStates());
		dispatch(contractActions.getCustodianPrices());
		if (!isAdminPage) {
			await dispatch(dynamoActions.scanStatus());
			dispatch(contractActions.getBalances());
			dispatch(dynamoActions.fetchHourly());
			dispatch(dynamoActions.fetchMinutely());
			dispatch(dynamoActions.fetchPrice());
			dispatch(dynamoActions.fetchConversion());
			// dispatch(dynamoActions.fetchTotalSupply());
		} else
			dispatch(contractActions.getAddresses());
		dispatch(refreshUpdate());
	};
}
