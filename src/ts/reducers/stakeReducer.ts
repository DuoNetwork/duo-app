import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IStakeState } from 'ts/common/types';

export const initialState: IStakeState = {
	states: {
		canStake: false,
		canUnstake: false,
		lockMinTimeInSecond: 0,
		minStakeAmt: 0,
		maxStakePerOracle: 0,
		totalAwardsToDistribute: 0
	},
	duo: 0,
	addresses: {
		operator: WrapperConstants.DUMMY_ADDR,
		priceFeedList: []
	},
	subscription: 0,
	userStake: {},
	oracleStake: {},
	userAward: 0
};

export function stakeReducer(state: IStakeState = initialState, action: AnyAction): IStakeState {
	switch (action.type) {
		case CST.AC_STK_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_STK_ADDRESSES:
			return Object.assign({}, state, {
				addresses: action.value
			});
		case CST.AC_STK_BALANCE:
			return Object.assign({}, state, {
				duo: action.value
			});
		case CST.AC_STK_SUB:
			return Object.assign({}, state, {
				subscription: action.id
			});
		case CST.AC_STK_USERSTAKE:
			return Object.assign({}, state, {
				userStake: action.value
			});
		case CST.AC_STK_ORACLESTAKE:
			return Object.assign({}, state, {
				oracleStake: action.value
			});
		case CST.AC_STK_AWARD:
			return Object.assign({}, state, {
				userAward: action.value
			});
		default:
			return state;
	}
}
