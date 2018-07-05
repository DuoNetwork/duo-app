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
	ethBalance: number;
	duoBalance: number;
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

export interface IAccountBalances extends IBalances {
	account: string;
}

export interface IAddress {
	address: string;
	balance: number;
}

export interface IAddresses {
	operator: IAddress;
	feeCollector: IAddress;
	priceFeed1: IAddress;
	priceFeed2: IAddress;
	priceFeed3: IAddress;
	poolManager: IAddress;
	[role: string]: IAddress;
}

export interface IStatus {
	process: string;
	timestamp: number;
}

export interface IPriceStatus extends IStatus {
	price: number;
	volume: number;
}

export interface INodeStatus extends IStatus {
	block: number;
}

export import IPriceBar = adminTypes.IPriceBar;

export interface ISourceData<T> {
	bitfinex: T;
	gemini: T;
	kraken: T;
	gdax: T;
	[source: string]: T;
}

export interface IBaseEvent {
	timestamp: number;
	transactionHash: string;
	blockNumber: number;
}

export interface IAcceptedPrice extends IBaseEvent {
	price: number;
	navA: number;
	navB: number;
}

export interface ITotalSupply extends IBaseEvent {
	tokenA: number,
	tokenB: number
}

export interface IConversion extends IBaseEvent {
	type: string;
	eth: number;
	tokenA: number;
	tokenB: number;
	ethFee: number;
	duoFee: number;
	pending?: boolean;
	reverted?: boolean;
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
	readonly addressPool: IAddress[];
	readonly account: string;
	readonly network: number;
	readonly gasPrice: number;
	readonly allBalances: {[index: number]: IAccountBalances}
}

export interface IDynamoState {
	readonly status: IStatus[];
	readonly hourly: ISourceData<IPriceBar[]>;
	readonly minutely: ISourceData<IPriceBar[]>;
	readonly price: IAcceptedPrice[];
	readonly last: ISourceData<ICustodianPrice>;
	readonly conversion: IConversion[];
	readonly totalSupply: ITotalSupply[]
}

export interface IUIState {
	readonly refresh: number;
}

export type VoidThunkAction = ThunkAction<void, IState, undefined, AnyAction>;

export interface ITableRecord {
	[key: string]: any
}
