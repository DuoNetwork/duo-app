//import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
//import { IStakeState } from 'ts/common/types';

export const initialState = {
	exchangePrices: [],
	duo: 0,
	currentRoundInfo: [],
	addressInfo: {}
};

export function inlineWarrentReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case CST.AC_DCC_EX_PX:
			return Object.assign({}, state, {
				exchangePrices: action.value
			});
		case CST.AC_STK_BALANCE:
			return Object.assign({}, state, {
				duo: action.value
			});
		case CST.AC_IW_CURRENTROUND:
			return Object.assign({}, state, {
				currentRoundInfo: action.value
			});
		case CST.AC_IW_ADDRESSINFO:
			return Object.assign({}, state, {
				addressInfo: action.value
			});
		default:
			return state;
	}
}
