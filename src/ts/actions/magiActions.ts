import { IMagiStates } from '@finbook/duo-contract-wrapper';
import * as CST from 'ts/common/constants';
import { IAcceptedPrice, VoidThunkAction } from 'ts/common/types';
import util from 'ts/common/util';
import { magiWrapper } from 'ts/common/wrappers';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';

export function acceptedPricesUpdate(acceptedPrices: IAcceptedPrice[]) {
	return {
		type: CST.AC_MAG_ACCEPTED_PX,
		value: acceptedPrices
	};
}

export function statesUpdate(states: IMagiStates) {
	return {
		type: CST.AC_MAG_STATES,
		value: states
	};
}
export function addressesUpdate(addresses: string[]) {
	return {
		type: CST.AC_MAG_ADDRS,
		value: addresses
	};
}

export function fetchAcceptedPrices(contractAddress: string): VoidThunkAction {
	return async dispatch =>
		dispatch(
			acceptedPricesUpdate(
				(await dynamoUtil.queryAcceptPriceEvent(
					contractAddress,
					util.getDates(7, 1, 'day', 'YYYY-MM-DD')
				)).sort((a, b) => -a.timestamp + b.timestamp)
			)
		);
}

export function getStates(): VoidThunkAction {
	return async dispatch => {
		dispatch(statesUpdate(await magiWrapper.getStates()));
	}
}

export function getAddressess(): VoidThunkAction {
	return async dispatch => dispatch(addressesUpdate(await magiWrapper.getAddresses()));
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_MAG_SUB,
		value: intervalId
	};
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		const addrs = await magiWrapper.getAddresses();
		dispatch(statesUpdate(await magiWrapper.getStates()));
		dispatch(fetchAcceptedPrices(magiWrapper.address));
		dispatch(addressesUpdate(addrs));
	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 60000)));
	};
}
