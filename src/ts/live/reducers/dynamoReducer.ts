import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IDynamoState } from '../common/types';

export const initialState: IDynamoState = {
	status: [],
	prices: [],
	acceptedPrices: [],
	conversions: []
	// totalSupply: []
};

export function dynamoReducer(state: IDynamoState = initialState, action: AnyAction): IDynamoState {
	switch (action.type) {
		case CST.AC_STATUS:
		case CST.AC_PRICES:
		case CST.AC_ACCEPTED_PRICES:
		case CST.AC_CONVERSIONS:
			// case CST.AC_TOTAL_SUPPLY:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
