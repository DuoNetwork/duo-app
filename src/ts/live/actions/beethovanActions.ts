import moment from 'moment';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import contract from '../common/contract';
import {
	IAcceptedPrice,
	IAccountBalances,
	IAddress,
	IBeethovanAddresses,
	IBeethovanBalances,
	IBeethovanPrices,
	IBeethovanStates,
	IConversion,
	IPrice,
	VoidThunkAction
} from '../common/types';
import util from '../common/util';
import * as web3Actions from './web3Actions';

export function statesUpdate(states: IBeethovanStates) {
	return {
		type: CST.AC_BTV_STATES,
		value: states
	};
}

export function getStates(): VoidThunkAction {
	return async dispatch => {
		const states = await contract.getCustodianStates();
		dispatch(statesUpdate(states));
	};
}

export function pricesUpdate(prices: IBeethovanPrices) {
	return {
		type: CST.AC_BTV_PRICES,
		value: prices
	};
}

export function getPrices(): VoidThunkAction {
	return async dispatch => dispatch(pricesUpdate(await contract.getCustodianPrices()));
}

export function balancesUpdate(balance: IBeethovanBalances) {
	return {
		type: CST.AC_BTV_BALANCES,
		value: balance
	};
}

export function getBalances(): VoidThunkAction {
	return async (dispatch, getState) =>
		dispatch(balancesUpdate(await contract.getBalances(getState().web3.account)));
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

export function addressesUpdate(addr: IBeethovanAddresses) {
	return {
		type: CST.AC_BTV_ADDRESSES,
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
		const poolLength = getState().beethovan.beethovanStates.addrPoolLength;
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

export function exchangePricesUpdate(prices: IPrice[]) {
	return {
		type: CST.AC_BTV_EX_PX,
		value: prices
	};
}

export function fetchExchangePrices(): VoidThunkAction {
	return async (dispatch, state) => {
		const source = state().ui.source;
		const period = state().ui.period;
		const start =
			period === 60
				? util.getUTCNowTimestamp() - period * 96 * 60000
				: util.getUTCNowTimestamp() - 400 * 60000;
		dispatch(
			exchangePricesUpdate(
				await dynamoUtil.getPrices(source, period === 60 ? 60 : 1, start, 0, 'ETH|USD')
			)
		);
	};
}

export function acceptedPricesUpdate(acceptedPrices: IAcceptedPrice[]) {
	return {
		type: CST.AC_BTV_ACCEPTED_PX,
		value: acceptedPrices
	};
}

export function fetchAcceptedPrices(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const dates = util.getDates(4, 1, 'day', 'YYYY-MM-DD');
		const priceData = await dynamoUtil.queryAcceptPriceEvent(contractAddress, dates);
		const states = getState().beethovan.beethovanStates;
		dispatch(
			acceptedPricesUpdate(
				chartUtil.mergeReset(
					priceData,
					chartUtil.reset(
						priceData,
						states.limitUpper,
						states.limitLower,
						states.limitPeriodic
					)
				)
			)
		);
	};
}

export function conversionsUpdate(conversions: IConversion[]) {
	return {
		type: CST.AC_BTV_CONVERSIONS,
		value: conversions
	};
}

export function fetchConversions(contractAddress: string): VoidThunkAction {
	return async (dispatch, getState) => {
		const nowTimestamp = util.getUTCNowTimestamp();
		const dates = util.getDates(7, 1, 'day', 'YYYY-MM-DD');
		const account = getState().web3.account;
		const conversion = await dynamoUtil.queryConversionEvent(contractAddress, account, dates);
		(await dynamoUtil.queryUIConversionEvent(contractAddress, account)).forEach(uc => {
			if (
				!dates.includes(moment.utc(uc.timestamp).format('YYYY-MM-DD')) ||
				conversion.some(c => c.transactionHash === uc.transactionHash) ||
				(uc.pending && nowTimestamp - uc.timestamp > CST.PENDING_TX_TIMEOUT)
			)
				dynamoUtil.deleteUIConversionEvent(account, uc);
			else conversion.push(uc);
		});
		conversion.sort((a, b) => -a.timestamp + b.timestamp);
		dispatch(conversionsUpdate(conversion));
	};
}

export function refresh(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getPrices());
		dispatch(getBalances());
		dispatch(getAddresses());
		dispatch(fetchExchangePrices());
		dispatch(fetchAcceptedPrices(contract.custodianAddr));
		dispatch(fetchConversions(contract.custodianAddr));
		window.setInterval(async () => {
			await dispatch(getStates());
			dispatch(getPrices());
			dispatch(getBalances());
			dispatch(getAddresses());
			dispatch(fetchExchangePrices());
			dispatch(fetchAcceptedPrices(contract.custodianAddr));
			dispatch(fetchConversions(contract.custodianAddr));
		}, 60000);
	};
}

export function adminActions(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAddresses());
		dispatch(web3Actions.getAccount());
		window.setInterval(async () => {
			await dispatch(getStates());
			dispatch(getAddresses());
			dispatch(web3Actions.getAccount());
		}, 60000);
	};
}

export function userActions(start: number, end: number): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		dispatch(getAllBalances(start, end));
		window.setInterval(async () => {
			await dispatch(getStates());
			dispatch(getAllBalances(start, end));
		}, 60000);
	};
}

export function statusActions(): VoidThunkAction {
	return async dispatch => {
		await dispatch(getStates());
		window.setInterval(async () => {
			await dispatch(getStates());
		}, 60000);
	};
}
