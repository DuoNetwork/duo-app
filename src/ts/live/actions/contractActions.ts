import * as CST from '../common/constants';
import contract from '../common/contract';
import {
	IAccountBalances,
	IAddress,
	IAddresses,
	IBalances,
	ICustodianPrices,
	ICustodianStates,
	VoidThunkAction
} from '../common/types';

export function accountUpdate(account: string) {
	return {
		type: CST.AC_ACCOUNT,
		value: account
	};
}

export function networkUpdate(networkId: number) {
	return {
		type: CST.AC_NETWORK,
		value: networkId
	};
}

export function getNetwork(): VoidThunkAction {
	return async dispatch => dispatch(networkUpdate(await contract.getCurrentNetwork()));
}

export function custodianStatesUpdate(states: ICustodianStates) {
	return {
		type: CST.AC_CTD_STATES,
		value: states
	};
}

export function getCustodianStates(): VoidThunkAction {
	return async dispatch => {
		const states = await contract.getCustodianStates();
		dispatch(custodianStatesUpdate(states));
	};
}

export function custodianPricesUpdate(prices: ICustodianPrices) {
	return {
		type: CST.AC_CTD_PRICES,
		value: prices
	};
}

export function getCustodianPrices(): VoidThunkAction {
	return async dispatch => dispatch(custodianPricesUpdate(await contract.getCustodianPrices()));
}

export function balancesUpdate(balance: IBalances) {
	return {
		type: CST.AC_BALANCES,
		value: balance
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) =>
		dispatch(balancesUpdate(await contract.getBalances(getState().contract.account)));
}

export function allBalancesUpdate(balance: IAccountBalances, index: number) {
	return {
		type: CST.AC_ALL_BALANCES,
		value: {
			[index]: balance
		}
	};
}

export function getAllBalances(start: number, end: number): VoidThunkAction {
	return async dispatch => {
		for (let i = start; i < end; i++)
			contract.getUserAddress(i).then((account: any) => {
				if (account)
					contract.getBalances(account).then(balance =>
						dispatch(
							allBalancesUpdate(
								{
									account: account,
									...balance
								},
								i
							)
						)
					);
			});
	};
}

export function addressesUpdate(addr: IAddresses) {
	return {
		type: CST.AC_ADDRESSES,
		value: addr
	};
}

export function addressPoolUpdate(address: IAddress[]) {
	return {
		type: CST.AC_ADDR_POOL,
		value: address
	};
}

export function getAddresses(): VoidThunkAction {
	return async (dispatch, getState) => {
		dispatch(addressesUpdate(await contract.getCustodianAddresses()));
		const poolLength = getState().contract.states.addrPoolLength;
		const addrPool: IAddress[] = [];
		for (let i = 0; i < poolLength; i++) {
			const address = await contract.getPoolAddress(i);
			if (address)
				addrPool.push({
					address: address,
					balance: await contract.getEthBalance(address)
				});
		}
		dispatch(addressPoolUpdate(addrPool));
	};
}

export function gasPriceUpdate(gasPrice: number) {
	return {
		type: CST.AC_GAS_PX,
		value: gasPrice
	}
}

export function getGasPrice(): VoidThunkAction {
	return async (dispatch) =>
		dispatch(gasPriceUpdate(await contract.getGasPrice()));
}
