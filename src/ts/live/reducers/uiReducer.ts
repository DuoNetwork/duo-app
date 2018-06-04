import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';
import util from '../common/util';

export const initialState: reduxTypes.IUIState = {
	refresh: 0
};

export function uiReducer(
	state: reduxTypes.IUIState = initialState,
	action: reduxTypes.Action
): reduxTypes.IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, state, {
				refresh: util.getNowTimestamp()
			});
		default:
			return state;
	}
}
