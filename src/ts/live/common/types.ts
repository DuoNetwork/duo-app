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

export import IPrice = adminTypes.IPrice;

export interface IState {
	contract: IContractState;
	dynamo: IDynamoState;
	ui: IUIState;
}

export interface IContractState {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	addresses: IAddresses;
	account: string;
}

export interface IDynamoState {
	status: IStatus[];
	hourly: IPriceBars;
	minutely: IPriceBars;
	prices: IPrice[];
}

export interface IUIState {
	refresh: number;
}
