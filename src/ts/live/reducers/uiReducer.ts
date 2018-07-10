import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IUIState } from '../common/types';
import util from '../common/util';

export const initialState: IUIState = {
	refresh: 0,
	locale: CST.LOCALE_EN
};

export function uiReducer(state: IUIState = initialState, action: AnyAction): IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, state, {
				refresh: util.getNowTimestamp()
			});
		case CST.AC_LOCALE:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
