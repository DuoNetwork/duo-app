import { IEsplanadeStates, IVotingData } from '@finbook/duo-contract-wrapper';
import * as CST from 'ts/common/constants';
import { VoidThunkAction } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';

export function statesUpdate(states: IEsplanadeStates) {
	return {
		type: CST.AC_ESP_STATES,
		value: states
	};
}

export function moderatorUpdate(address: string, balance: number) {
	return {
		type: CST.AC_ESP_MODERATOR,
		address: address,
		balance: balance
	};
}

export function candidateUpdate(address: string, balance: number) {
	return {
		type: CST.AC_ESP_CANDIDATE,
		address: address,
		balance: balance
	};
}

export function hotPoolAddressUpdate(addr: string, balance: number, index: number) {
	return {
		type: CST.AC_ESP_HOT_ADDR,
		address: addr,
		index: index,
		balance: balance
	};
}

export function coldPoolAddressUpdate(addr: string, balance: number, index: number) {
	return {
		type: CST.AC_ESP_COLD_ADDR,
		address: addr,
		index: index,
		balance: balance
	};
}

export function custodianPoolAddressUpdate(addr: string, balance: number, index: number) {
	return {
		type: CST.AC_ESP_CUSTODIAN_ADDR,
		address: addr,
		index: index,
		balance: balance
	};
}

export function otherContractPoolAddressUpdate(addr: string, balance: number, index: number) {
	return {
		type: CST.AC_ESP_OTHER_CONTRACT_ADDR,
		address: addr,
		index: index,
		balance: balance
	};
}

export function votingDataUpdate(votingData: IVotingData) {
	return {
		type: CST.AC_ESP_VOTING_DATA,
		value: votingData
	};
}

export function getStates(): VoidThunkAction {
	return async dispatch => dispatch(statesUpdate(await esplanadeWrapper.getStates()));
}

export function getAddresses(): VoidThunkAction {
	return async (dispatch, getState) => {
		esplanadeWrapper
			.getModerator()
			.then(address =>
				esplanadeWrapper.web3Wrapper
					.getEthBalance(address)
					.then(balance => dispatch(moderatorUpdate(address, balance)))
			);
		esplanadeWrapper
			.getCandidate()
			.then(address =>
				esplanadeWrapper.web3Wrapper
					.getEthBalance(address)
					.then(balance => dispatch(candidateUpdate(address, balance)))
			);

		const { hot, cold, custodian, otherContract } = getState().esplanade.states.poolSizes;
		for (let i = 0; i < hot; i++)
			esplanadeWrapper
				.getAddressPoolAddress(true, i)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance => dispatch(hotPoolAddressUpdate(address, balance, i)))
				);

		for (let j = 0; j < cold; j++)
			esplanadeWrapper
				.getAddressPoolAddress(false, j)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance => dispatch(coldPoolAddressUpdate(address, balance, j)))
				);

		for (let m = 0; m < custodian; m++)
			esplanadeWrapper
				.getContractPoolAddress(true, m)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance => dispatch(custodianPoolAddressUpdate(address, balance, m)))
				);

		for (let n = 0; n < otherContract; n++)
			esplanadeWrapper
				.getContractPoolAddress(false, n)
				.then(address =>
					esplanadeWrapper.web3Wrapper
						.getEthBalance(address)
						.then(balance =>
							dispatch(otherContractPoolAddressUpdate(address, balance, n))
						)
				);
	};
}

export function getVotingData(): VoidThunkAction {
	return async dispatch => dispatch(votingDataUpdate(await esplanadeWrapper.getVotingData()));
}

export function subscriptionUpdate(intervalId: number) {
	return {
		type: CST.AC_ESP_SUB,
		id: intervalId
	};
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
		dispatch(getVotingData());
	};
}

export function subscribe(): VoidThunkAction {
	return async dispatch => {
		dispatch(subscriptionUpdate(0));
		dispatch(refresh());
		dispatch(subscriptionUpdate(window.setInterval(() => dispatch(refresh()), 60000)));
	};
}
