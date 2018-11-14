import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IUIState } from 'ts/common/types';

const lan = navigator.language.toUpperCase();

export const initialState: IUIState = {
	period: 60,
	source: CST.API_KRAKEN,
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
		case CST.AC_UI_LOCALE:
			return Object.assign({}, state, {
				locale: action.value
			});
		case CST.AC_UI_SOURCE:
			return Object.assign({}, state, {
				source: action.value
			});
		case CST.AC_UI_PERIOD:
			return Object.assign({}, state, {
				period: action.value
			});
		default:
			return state;
	}
}
