import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IUIState } from '../common/types';
import util from '../common/util';

const lan = navigator.language.toUpperCase();

export const initialState: IUIState = {
	refresh: 0,
	period: 60,
	source: CST.API_GEMINI,
	locale: lan.includes(CST.LOCALE_CN)
		? CST.LOCALE_CN
		: lan.includes('JA')
			? CST.LOCALE_JP
			: lan.includes(CST.LOCALE_RU)
				? CST.LOCALE_RU
				: CST.LOCALE_EN
};

export function uiReducer(state: IUIState = initialState, action: AnyAction): IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return Object.assign({}, state, {
				refresh: util.getUTCNowTimestamp()
			});
		case CST.AC_LOCALE:
		case CST.AC_SOURCE:
		case CST.AC_PERIOD:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
