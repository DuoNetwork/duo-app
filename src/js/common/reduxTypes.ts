import {IAssets, ITimeSeriesData} from './types';
export interface IState {
	ui: IUIState
}

export interface IUIState {
	eth: ITimeSeriesData[],
	classA: ITimeSeriesData[],
	classB: ITimeSeriesData[],
	reset: ITimeSeriesData[],
	history: string[],
	message: {
		type: string,
		content: string,
		visible: boolean
	},
	form: {
		type: string,
		visible: boolean
	},
	mv: ITimeSeriesData[],
	assets: IAssets,
	resetPrice: number,
	beta: number,
	day: number,
	upward: number,
	downward: number,
	periodic: number
}

export type Action = IBaseAction | IBooleanAction | IStringAction | IObjectAction | INumberAction;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;

export interface IBaseAction {
	type: string
}

export interface IBooleanAction {
	type: string,
	value: boolean
}

export interface IStringAction {
	type: string,
	value: string
}
export interface IObjectAction {
	type: string,
	value: object
}

export interface INumberAction {
	type: string,
	value: number
}

export type ThunkAction = (dispatch: Dispatch) => any;
export type PromiseAction = Promise<Action>;
