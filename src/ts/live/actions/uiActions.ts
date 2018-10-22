import * as CST from '../common/constants';
import { VoidThunkAction } from '../common/types';
import * as contractActions from './contractActions';
import * as dynamoActions from './dynamoActions';

export function refreshUpdate() {
	return {
		type: CST.AC_REFRESH
	};
}

export function updatePeriod(period: number) {
	return { type: CST.AC_PERIOD, value: period };
}

export function updateSource(src: string) {
	return {
		type: CST.AC_SOURCE,
		value: src
	};
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		dynamoActions.dynamoRefresh(dispatch);
		contractActions.contractRefresh(dispatch);
		dispatch(refreshUpdate());
	};
}

export function localeUpdate(locale: string) {
	return {
		type: CST.AC_LOCALE,
		value: locale
	};
}
