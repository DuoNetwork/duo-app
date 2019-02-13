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
	priceFeeds: {},
	operator: {
		address: '',
		balance: 0
	},
	roleManager: {
		address: '',
		balance: 0
	},
	subscription: 0
};

export function magiReducer(state: IMagiState = initialState, action: AnyAction): IMagiState {
	switch (action.type) {
		case CST.AC_MAG_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_MAG_PF:
			return Object.assign({}, state, {
				priceFeeds: Object.assign({}, state.priceFeeds, {
					[action.address]: {
						balance: action.balance,
						index: action.index
					}
				})
			});
		case CST.AC_MAG_OPT:
			return Object.assign({}, state, {
				operator: action.value
			});
		case CST.AC_MAG_ROLE_MNG:
			return Object.assign({}, state, {
				roleManager: action.value
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
