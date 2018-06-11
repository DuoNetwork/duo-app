import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as adminTypes from '../../../../../duo-admin/src/types';

export interface ICustodianPrice {
	address: string;
	price: number;
	timestamp: number;
}

export interface ICustodianStates {
	state: string;
	navA: number;
	navB: number;
	totalSupplyA: number;
	totalSupplyB: number;
	alpha: number;
	beta: number;
	feeAccumulated: number;
	periodCoupon: number;
	limitPeriodic: number;
	limitUpper: number;
	limitLower: number;
	commissionRate: number;
	period: number;
	iterationGasThreshold: number;
	ethDuoFeeRatio: number;
	preResetWaitingBlocks: number;
	priceTol: number;
	priceFeedTol: number;
	priceFeedTimeTol: number;
	priceUpdateCoolDown: number;
	numOfPrices: number;
	nextResetAddrIndex: number;
	lastAdminTime: number;
	adminCoolDown: number;
	usersLength: number;
	addrPoolLength: number;
}

export interface ICustodianPrices {
	first: ICustodianPrice;
	second: ICustodianPrice;
	reset: ICustodianPrice;
	last: ICustodianPrice;
}

export interface IBalances {
	eth: number;
	duo: number;
	allowance: number;
	tokenA: number;
	tokenB: number;
}

export interface IAddresses {
	admin: string;
	feeCollector: string;
	priceFeed1: string;
	priceFeed2: string;
	priceFeed3: string;
	poolManager: string;
}

export interface IStatus {
	process: string;
	timestamp: number;
}

export interface IPriceStatus extends IStatus {
	price: number;
	volume: number;
}

export import IPriceBar = adminTypes.IPriceBar;

export interface IPriceBars {
	bitfinex: IPriceBar[];
	gemini: IPriceBar[];
	kraken: IPriceBar[];
	gdax: IPriceBar[];
}

export interface IAcceptedPrice {
	price: number;
	navA: number;
	navB: number;
	timestamp: number;
}

export interface IState {
	readonly contract: IContractState;
	readonly dynamo: IDynamoState;
	readonly ui: IUIState;
}

export interface IContractState {
	readonly states: ICustodianStates;
	readonly prices: ICustodianPrices;
	readonly balances: IBalances;
	readonly addresses: IAddresses;
	readonly account: string;
	readonly network: number;
}

export interface IDynamoState {
	readonly status: IStatus[];
	readonly hourly: IPriceBars;
	readonly minutely: IPriceBars;
	readonly prices: IAcceptedPrice[];
}

export interface IUIState {
	readonly refresh: number;
}

export type VoidThunkAction = ThunkAction<void, IState, undefined, AnyAction>;
