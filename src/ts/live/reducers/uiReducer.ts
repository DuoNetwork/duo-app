import * as CST from '../common/constants';
import { IUIState } from '../common/types';
import util from '../common/util';

export const initialState: IUIState = {
	refresh: 0
};

export function uiReducer(
	state: IUIState = initialState,
	action
): IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, state, {
				refresh: util.getNowTimestamp()
			});
		default:
			return state;
	}
}
