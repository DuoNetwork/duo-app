import {
	ICustodianAddresses,
	IDualClassStates,
	IEsplanadeStates,
	IMagiAddresses,
	IMagiStates,
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
	readonly coldAddressPool: IEsplanadeAddresses;
	readonly hotAddressPool: IEsplanadeAddresses;
	readonly custodianPool: IEsplanadeAddresses;
	readonly otherContractPool: IEsplanadeAddresses;
	readonly votingData: IVotingData;
}
export interface IEsplanadeAddresses {
	[address: string]: {
		balance: number;
		index: number;
	};
}

export interface IMagiState {
	readonly subscription: number;
	readonly states: IMagiStates;
	readonly addresses: IMagiAddresses;
	readonly acceptedPrices: IAcceptedPrice[];
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
