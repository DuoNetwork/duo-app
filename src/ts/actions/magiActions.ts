import * as CST from 'ts/common/constants';
import { IAcceptedPrice, VoidThunkAction } from 'ts/common/types';
import util from 'ts/common/util';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';

export function acceptedPricesUpdate(acceptedPrices: IAcceptedPrice[]) {
	return {
		type: CST.AC_MAG_ACCEPTED_PX,
		value: acceptedPrices
	};
}

export function fetchAcceptedPrices(contractAddress: string): VoidThunkAction {
	return async dispatch =>
		dispatch(
			acceptedPricesUpdate(
				(await dynamoUtil.queryAcceptPriceEvent(
					contractAddress,
					util.getDates(7, 1, 'day', 'YYYY-MM-DD')
				)).sort((a, b) => - a.timestamp + b.timestamp)
			)
		);
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_MAG_SUB,
		value: intervalId
	};
}

export function refresh(contractAddress: string): VoidThunkAction {
	return async dispatch => dispatch(fetchAcceptedPrices(contractAddress));
}

export function subscribe(contractAddress: string): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh(contractAddress));
		dispatch(
			subscriptionUpdate(
				window.setInterval(() => dispatch(refresh(contractAddress)), 1800000)
			)
		);
	};
}
