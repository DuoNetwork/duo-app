import * as CST from '../common/constants';
import dynamoUtil from '../common/dynamoUtil';
import * as reduxTypes from '../common/reduxTypes';

export function statusUpdate(status: object): reduxTypes.Action {
	return {
		type: CST.AC_DNM_STATUS,
		value: status
	};
}

export function scanStatus(): reduxTypes.ThunkAction {
	return async dispatch => {
		const states = await dynamoUtil.scanStatus();
		dispatch(statusUpdate(states));
	};
}
