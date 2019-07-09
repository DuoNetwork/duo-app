import {
	ICustodianAddresses,
	IDualClassStates,
	IEsplanadeStates,
	IMagiStates,
	IStakeAddress,
	IStakeLot,
	IStakeStates,
	IVotingData
} from '@finbook/duo-contract-wrapper';
import { IAcceptedPrice, IConversion, IPrice, IStatus } from '@finbook/duo-market-data';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface ISourceData<T> {
	// bitfinex: T;
	gemini: T;
	kraken: T;
	gdax: T;
	[source: string]: T;
}

export interface IState {
	readonly dualClass: IDualClassState;
	readonly magi: IMagiState;
	readonly esplanade: IEsplanadeState;
	readonly web3: IWeb3State;
	readonly dynamo: IDynamoState;
	readonly ui: IUIState;
	readonly stake: IStakeState;
}

export interface IWeb3State {
	readonly account: string;
	readonly network: number;
	readonly gasPrice: number;
	readonly balance: number;
}

export interface IDualClassState {
	readonly type: string;
	readonly tenor: string;
	readonly subscription: number;
	readonly states: IDualClassStates;
	readonly addresses: ICustodianAddresses;
	readonly exchangePrices: IPrice[];
	readonly acceptedPrices: IAcceptedPrice[];
	readonly conversions: IConversion[];
	readonly balances: {
		a: number;
		b: number;
	};
}

export interface IStakeState {
	readonly duo: number;
	readonly states: IStakeStates[];
	readonly allowance: number[];
	readonly subscription: number[];
	readonly addresses: IStakeAddress[];
	readonly userStake: Array<{ [key: string]: IStakeLot[] }>;
	readonly oracleStake: Array<{ [key: string]: number }>;
	readonly userAward: number[];
	readonly contractDUO: number[];
}

export interface IEsplanadeState {
	readonly subscription: number;
	readonly states: IEsplanadeStates;
	readonly moderator: {
		address: string;
		balance: number;
	};
	readonly candidate: {
		address: string;
		balance: number;
	};
	readonly coldAddressPool: IAddresses;
	readonly hotAddressPool: IAddresses;
	readonly custodianPool: IAddresses;
	readonly otherContractPool: IAddresses;
	readonly votingData: IVotingData;
}
export interface IAddresses {
	[address: string]: {
		index: number;
		balance?: number;
		label?: string;
	};
}

export interface IMagiState {
	readonly subscription: number;
	readonly states: IMagiStates;
	readonly operator: IAccount;
	readonly roleManager: IAccount;
	readonly priceFeeds: IMagiPriceFeed;
	readonly acceptedPrices: IAcceptedPrice[];
}

export interface IAccount {
	balance: number;
	address: string;
}

export interface IMagiPriceFeed {
	[address: string]: {
		balance: number;
		index: number;
	};
}

export interface IDynamoState {
	readonly status: IStatus[];
}

export interface IUIState {
	readonly period: number;
	readonly source: string;
	readonly locale: string;
}

export type VoidThunkAction = ThunkAction<void, IState, undefined, AnyAction>;

export interface ITableRecord {
	[key: string]: any;
}

export enum WsChannelMessageTypes {
	Add = 'add',
	Update = 'update',
	Cancel = 'cancel',
	Subscribe = 'subscribe'
}

export enum WsChannelName {
	Orderbook = 'orderbook',
	Order = 'order'
}

export interface IReferral {
	address: string;
	referralCode: string;
	signHash: string;
}

export interface IStakingChild {
	address: string;
	daily: number;
	accumulated: number;
}

export interface IStakingNode {
	name: string;
	daily: number;
	accumulated: number;
}
export interface IAddressInfo {
	children: IStakingChild[],
	staking0: IStakingNode[],
	staking60: IStakingNode[]
}
