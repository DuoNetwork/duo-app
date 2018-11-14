import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';

export function statusUpdate(status: object) {
	return {
		type: CST.AC_DNM_STATUS,
		value: status
	};
}

export function scanStatus(): VoidThunkAction {
	return async dispatch => {
		const states = await dynamoUtil.scanStatus();
		dispatch(statusUpdate(states));
	};
}
