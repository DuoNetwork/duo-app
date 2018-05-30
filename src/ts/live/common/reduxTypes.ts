import { IBalances, ICustodianPrice, ICustodianStates } from './types';

export interface IState {
	contract: IContractState;
}

export interface IContractState {
	custodianStates: ICustodianStates;
	custodianPrices: {
		reset: ICustodianPrice;
		last: ICustodianPrice;
		// first: ICustodianPrice;
		// second: ICustodianPrice;
	};
	balances: IBalances;
}

export type Action = IBaseAction | IBooleanAction | IStringAction | IObjectAction | INumberAction;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;

export interface IBaseAction {
	type: string;
}

export interface IBooleanAction {
	type: string;
	value: boolean;
}

export interface IStringAction {
	type: string;
	value: string;
}

export interface IObjectAction {
	type: string;
	value: object;
}

export interface INumberAction {
	type: string;
	value: number;
}

export type ThunkAction = (dispatch: Dispatch) => any;
export type PromiseAction = Promise<Action>;
