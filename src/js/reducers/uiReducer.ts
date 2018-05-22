import calculator from '../common/calculator';
import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import { IRawData } from '../common/types';
const rawData: IRawData[] = require('../../static/ETH.json');

const [eth, classA, classB, reset] = calculator.getAllTimeSeriesFromEth(rawData);

export const initialState: reduxTypes.IUIState = {
	eth: eth,
	classA: classA,
	classB: classB,
	reset: reset,
	history: [],
	message: {
		type: '',
		content: '',
		visible: false
	},
	form: {
		type: '',
		visible: false
	},
	mv: [{ datetime: eth[0].datetime, value: eth[0].value * 100 }],
	assets: {
		ETH: 100,
		ClassA: 0,
		ClassB: 0
	},
	resetPrice: eth[0].value,
	beta: 1,
	day: 0,
	upward: 0,
	downward: 0,
	periodic: 0
};

export function uiReducer(
	state: reduxTypes.IUIState = initialState,
	action: reduxTypes.Action
): reduxTypes.IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return initialState;
		case CST.AC_HISTORY:
			return Object.assign({}, state, {
				[CST.AC_HISTORY]: [...state.history, (action as reduxTypes.IStringAction).value]
			});
		case CST.AC_MESSAGE:
			return Object.assign({}, state, {
				[CST.AC_MESSAGE]: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_FORM:
			return Object.assign({}, state, {
				[CST.AC_FORM]: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_MV:
			return Object.assign({}, state, {
				[CST.AC_MV]: [...state.mv, (action as reduxTypes.IObjectAction).value]
			});
		case CST.AC_ASSETS:
			return Object.assign({}, state, {
				[CST.AC_ASSETS]: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_RESET_PRICE:
		case CST.AC_BETA:
		case CST.AC_DAY:
		case CST.AC_UPWARD:
		case CST.AC_DOWNWARD:
		case CST.AC_PERIODIC:
			return Object.assign({}, state, {
				[action.type]: (action as reduxTypes.INumberAction).value
			});
		default:
			return state;
	}
}
