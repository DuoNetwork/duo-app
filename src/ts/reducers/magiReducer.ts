import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IMagiState } from 'ts/common/types';

export const initialState: IMagiState = {
	acceptedPrices: [],
	subscription: 0
};

export function magiReducer(
	state: IMagiState = initialState,
	action: AnyAction
): IMagiState {
	switch (action.type) {
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
