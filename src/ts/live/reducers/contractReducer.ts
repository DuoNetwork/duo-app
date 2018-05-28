import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';

export const initialState: reduxTypes.IContractState = {
	state: 'UNKNOWN'
};

export function contractReducer(
	state: reduxTypes.IContractState = initialState,
	action: reduxTypes.Action
): reduxTypes.IContractState {
	switch (action.type) {
		case CST.AC_CT_STATE:
			return Object.assign({}, state, {
				[CST.CT_STATE]: (action as reduxTypes.IStringAction).value
			});
		default:
			return state;
	}
}
