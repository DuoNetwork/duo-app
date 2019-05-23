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
		maxStakePerPf: 0,
		totalAwardsToDistribute: 0
	},
	duo: 0,
	addresses: {
		operator: WrapperConstants.DUMMY_ADDR,
		priceFeedList: [],
	},
	subscription: 0,
};

export function stakeReducer(
	state: IStakeState = initialState,
	action: AnyAction
): IStakeState {
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
		default:
			return state;
	}
}
