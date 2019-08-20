import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IStakeV2State } from 'ts/common/types';

export const initialState: IStakeV2State = {
	duo: 0,
	states: {
		stakingEnabled: false,
		lockMinTimeInSecond: 0,
		minStakeAmt: 0,
		maxStakePerOracle: 0,
		totalRewardsToDistribute: 0
	},
	allowance: 0,
	addresses: {
		operator: WrapperConstants.DUMMY_ADDR,
		priceFeedList: []
	},
	subscription: 0,
	userStake: {},
	oracleStake: {},
	userAward: 0,
	contractDUO: 0,
	stagingAdd: {}
};

export function stakeV2Reducer(
	state: IStakeV2State = initialState,
	action: AnyAction
): IStakeV2State {
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
		case CST.AC_STK_ALLOWANCE:
			return Object.assign({}, state, {
				allowance: action.value
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
		case CST.AC_STK_CONTRACTDUO:
			return Object.assign({}, state, {
				contractDUO: action.value
			});
		case CST.AC_STK_STAGINGADD:
			return Object.assign({}, state, {
				stagingAdd: Object.assign({}, state.stagingAdd, { [action.index]: action.value })
			});
		default:
			return state;
	}
}
