import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IDynamoState } from '../common/types';

export const initialState: IDynamoState = {
	status: [],
	hourly: {
		bitfinex: [],
		gemini: [],
		kraken: [],
		gdax: []
	},
	minutely: {
		bitfinex: [],
		gemini: [],
		kraken: [],
		gdax: []
	},
	prices: []
};

export function dynamoReducer(state: IDynamoState = initialState, action: AnyAction): IDynamoState {
	switch (action.type) {
		case CST.AC_DNM_STATUS:
			return Object.assign({}, state, {
				status: action.value
			});
		case CST.AC_DMN_HOURLY:
			return Object.assign({}, state, {
				hourly: action.value
			});
		case CST.AC_DMN_MINUTELY:
			return Object.assign({}, state, {
				minutely: action.value
			});
		case CST.AC_DMN_PRICES:
			return Object.assign({}, state, {
				prices: action.value
			});
		default:
			return state;
	}
}
