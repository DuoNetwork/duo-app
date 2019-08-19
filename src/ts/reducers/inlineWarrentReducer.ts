//import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
//import { IStakeState } from 'ts/common/types';

export const initialState = {
	states: {
		stakingEnabled: false,
		lockMinTimeInSecond: 0,
		minStakeAmt: 0,
		maxStakePerOracle: 0,
		totalAwardsToDistribute: 0
	},
	duo: 0,
	allowance: 0,
	userAward: 0,
	exchangePrices: [],
	currentRoundInfo: [],
	addressInfo: {},
	boundaries: []
};

export function inlineWarrentReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case CST.AC_STK_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_STK_BALANCE:
			return Object.assign({}, state, {
				duo: action.value
			});
		case CST.AC_STK_ALLOWANCE:
			return Object.assign({}, state, {
				allowance: action.value
			});
		case CST.AC_STK_AWARD:
			return Object.assign({}, state, {
				userAward: action.value
			});
		case CST.AC_DCC_EX_PX:
			return Object.assign({}, state, {
				exchangePrices: action.value
			});
		case CST.AC_IW_CURRENTROUND:
			return Object.assign({}, state, {
				currentRoundInfo: action.value
			});
		case CST.AC_IW_ADDRESSINFO:
			return Object.assign({}, state, {
				addressInfo: action.value
			});
		case CST.AC_IW_BOUNDARIES:
			return Object.assign({}, state, {
				boundaries: action.value
			});
		default:
			return state;
	}
}
