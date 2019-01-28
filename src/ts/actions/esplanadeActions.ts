import * as CST from 'ts/common/constants';
import { IEsplanadeStates, VoidThunkAction } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';

export function statesUpdate(states: IEsplanadeStates) {
	return {
		type: CST.AC_ESP_STATES,
		value: states
	};
}

export function addressUpdate(isHot: boolean, index: number, addr: string, balance: number) {
	return {
		type: CST.AC_ESP_POOL_ADDR,
		value: {
			address: addr,
			isHot: isHot,
			index: index,
			balance: balance
		}
	};
}

export function custodianAddressUpdate(
	isCustodian: boolean,
	index: number,
	addr: string,
	balance: number
) {
	return {
		type: CST.AC_ESP_CONTRACT_ADDR,
		value: {
			address: addr,
			isCustodian: isCustodian,
			index: index,
			balance: balance
		}
	};
}

export function getStates(): VoidThunkAction {
	return async dispatch => {
		const states = await esplanadeWrapper.getStates();
		dispatch(statesUpdate(states));
	};
}

export function getAddresses(): VoidThunkAction {
	return async dispatch => {
		const hotPoolSize = await esplanadeWrapper.getPoolSize(true);
		const coldPoolSize = await esplanadeWrapper.getPoolSize(false);
		const custodianSize = await esplanadeWrapper.getContractSize(true);
		const otherContractSize = await esplanadeWrapper.getContractSize(false);
		for (let i = 0; i < hotPoolSize; i++)
			esplanadeWrapper
				.getPoolAddr(true, i)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance => dispatch(addressUpdate(true, i, address, balance)))
				);

		for (let j = 0; j < coldPoolSize; j++)
			esplanadeWrapper
				.getPoolAddr(false, j)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance => dispatch(addressUpdate(true, j, address, balance)))
				);

		for (let m = 0; m < custodianSize; m++)
			esplanadeWrapper
				.getContractAddr(true, m)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance =>
							dispatch(custodianAddressUpdate(true, m, address, balance))
						)
				);

		for (let n = 0; n < otherContractSize; n++)
			esplanadeWrapper
				.getContractAddr(false, n)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance =>
							dispatch(custodianAddressUpdate(false, n, address, balance))
						)
				);
	};
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_ESP_SUB,
		id: intervalId
	};
}

// export function refresh(): VoidThunkAction {
// 	return async dispatch => {
// 		await dispatch(getStates());
// 	};
// }

// export function subscribe(): VoidThunkAction {
// 	return async dispatch => {
// 		dispatch(subscriptionUpdate(0));
// 		dispatch(refresh());
// 		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 60000)));
// 	};
// }

export function refreshAdmin(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
	};
}

export function subscribeAdmin(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refreshAdmin());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refreshAdmin()), 60000)));
	};
}
