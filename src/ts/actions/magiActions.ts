import { IMagiStates } from '@finbook/duo-contract-wrapper';
import { IAcceptedPrice } from '@finbook/duo-market-data';
import * as CST from 'ts/common/constants';
import dynamoUtil from 'ts/common/dynamoUtil';
import { VoidThunkAction } from 'ts/common/types';
import util from 'ts/common/util';
import { magiWrapper } from 'ts/common/wrappers';

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
export function priceFeedUpdate(address: string, balance: number, index: number) {
	return {
		type: CST.AC_MAG_PF,
		balance: balance,
		address: address,
		index: index
	};
}

export function operatorUpdate(account: { address: string; balance: number }) {
	return {
		type: CST.AC_MAG_OPT,
		value: account
	};
}

export function roleManagerUpdate(account: { address: string; balance: number }) {
	return {
		type: CST.AC_MAG_ROLE_MNG,
		value: account
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
		magiWrapper.web3Wrapper.getEthBalance(addrs.operator).then(optBalance =>
			dispatch(
				operatorUpdate({
					address: addrs.operator,
					balance: optBalance
				})
			)
		);

		magiWrapper.web3Wrapper.getEthBalance(addrs.roleManagerAddress).then(roleManagerBalance =>
			dispatch(
				roleManagerUpdate({
					address: addrs.operator,
					balance: roleManagerBalance
				})
			)
		);

		addrs.priceFeed.map((pf, i) => {
			magiWrapper.web3Wrapper
				.getEthBalance(pf)
				.then(pfBalance => dispatch(priceFeedUpdate(pf, pfBalance, i)));
		});
	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 60000)));
	};
}
