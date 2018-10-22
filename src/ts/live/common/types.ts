import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
export * from '../../../../../duo-admin/src/common/types';
import * as adminTypes from '../../../../../duo-admin/src/common/types';

export interface IAccountBalances extends adminTypes.IBeethovanBalances {
	account: string;
}

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
}

export interface IBeethovanState {
	readonly beethovanStates: adminTypes.IBeethovanStates;
	readonly beethovanPrices: adminTypes.IBeethovanPrices;
	readonly beethovanAddresses: adminTypes.IBeethovanAddresses;
	readonly beethovanBalances: adminTypes.IBeethovanBalances;
	readonly addressPool: adminTypes.IAddress[];
	readonly allBalances: {[index: number]: IAccountBalances};
	readonly beethovanExchangePrices: adminTypes.IPrice[];
	readonly beethovanAcceptedPrices: adminTypes.IAcceptedPrice[];
	readonly beethovanConversions: adminTypes.IConversion[];
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
