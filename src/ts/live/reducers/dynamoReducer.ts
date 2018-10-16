import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IDynamoState } from '../common/types';
import util from '../common/util';

export const initialState: IDynamoState = {
	status: [],
	last: {
		bitfinex: {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		},
		kraken: {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		},
		gemini: {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		},
		gdax: {
			address: CST.DUMMY_ADDR,
			price: 0,
			timestamp: 0
		}
	},
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
	price: [],
	conversion: [],
	totalSupply: []
};

export function dynamoReducer(state: IDynamoState = initialState, action: AnyAction): IDynamoState {
	switch (action.type) {
		case CST.AC_DNM_STATUS:
			return Object.assign({}, state, {
				status: action.value,
				last: util.getLastPriceFromStatus(action.value)
			});
		case CST.AC_DMN_HOURLY:
			return Object.assign({}, state, {
				hourly: action.value
			});
		case CST.AC_DMN_MINUTELY:
			return Object.assign({}, state, {
				minutely: action.value
			});
		case CST.AC_DMN_PRICE:
			return Object.assign({}, state, {
				price: action.value
			});
		case CST.AC_CONVERSION:
		case CST.AC_TOTAL_SUPPLY:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
