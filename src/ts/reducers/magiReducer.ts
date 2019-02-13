import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IMagiState } from 'ts/common/types';

export const initialState: IMagiState = {
	acceptedPrices: [],
	states: {
		isStarted: false,
		firstPrice: {
			price: 0,
			timestamp: 0,
			source: ''
		},
		secondPrice: {
			price: 0,
			timestamp: 0,
			source: ''
		},
		priceTolerance: 0,
		priceFeedTolerance: 0,
		priceFeedTimeTolerance: 0,
		priceUpdateCoolDown: 0,
		numOfPrices: 0,
		lastOperationTime: 0,
		operationCoolDown: 0
	},
	addresses: {
		priceFeed: [],
		operator: '',
		roleManagerAddress: ''
	},
	subscription: 0
};

export function magiReducer(state: IMagiState = initialState, action: AnyAction): IMagiState {
	switch (action.type) {
		case CST.AC_MAG_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_MAG_ADDRS:
			return Object.assign({}, state, {
				addresses: action.value
			});
		case CST.AC_MAG_ACCEPTED_PX:
			return Object.assign({}, state, {
				acceptedPrices: action.value
			});
		case CST.AC_MAG_SUB:
			if (action.value)
				return Object.assign({}, state, {
					subscription: action.value
				});
			else {
				window.clearInterval(state.subscription);
				return initialState;
			}
		default:
			return state;
	}
}
