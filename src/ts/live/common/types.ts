import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
export * from '../../../../../duo-admin/src/common/types';
import * as adminTypes from '../../../../../duo-admin/src/common/types';

export interface ISourceData<T> {
	// bitfinex: T;
	gemini: T;
	kraken: T;
	gdax: T;
	[source: string]: T;
}

export interface IState {
	readonly beethovan: IBeethovanState;
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

export interface IBeethovanState {
	readonly states: adminTypes.IBeethovanStates;
	readonly addresses: adminTypes.ICustodianAddresses;
	readonly exchangePrices: adminTypes.IPrice[];
	readonly acceptedPrices: adminTypes.IAcceptedPrice[];
	readonly conversions: adminTypes.IConversion[];
	readonly balances: {
		a: number;
		b: number;
	}
}

export interface IDynamoState {
	readonly status: adminTypes.IStatus[];
}

export interface IUIState {
	readonly period: number;
	readonly source: string;
	readonly locale: string;
}

export type VoidThunkAction = ThunkAction<void, IState, undefined, AnyAction>;

export interface ITableRecord {
	[key: string]: any
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
