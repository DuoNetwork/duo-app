import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';

export function refresh(): reduxTypes.Action {
	return {
		type: CST.AC_REFRESH
	};
}

export function addHistory(tx: string): reduxTypes.Action {
	return {
		type: CST.AC_HISTORY,
		value: tx
	};
}
