import * as CST from '../common/constants';
import contract from '../common/contract';
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
		dispatch(contractActions.accountUpdate(await contract.getCurrentAddress()));
		dispatch(contractActions.getGasPrice());
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

export function localeUpdate(locale: string) {
	return {
		type: CST.AC_LOCALE,
		value: locale
	}
}
