import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IStakeState } from 'ts/common/types';

export const initialState: IStakeState = {
	duo: 0,
	states: [
		{
			canStake: false,
			canUnstake: false,
			lockMinTimeInSecond: 0,
			minStakeAmt: 0,
			maxStakePerOracle: 0,
			totalAwardsToDistribute: 0
		},
		{
			canStake: false,
			canUnstake: false,
			lockMinTimeInSecond: 0,
			minStakeAmt: 0,
			maxStakePerOracle: 0,
			totalAwardsToDistribute: 0
		}
	],
	allowance: [0, 0],
	addresses: [
		{
			operator: WrapperConstants.DUMMY_ADDR,
			priceFeedList: []
		},
		{
			operator: WrapperConstants.DUMMY_ADDR,
			priceFeedList: []
		}
	],
	subscription: [0, 0],
	userStake: [{}, {}],
	oracleStake: [{}, {}],
	userAward: [0, 0],
	contractDUO: [0, 0]
};

export function stakeReducer(state: IStakeState = initialState, action: AnyAction): IStakeState {
	switch (action.type) {
		case CST.AC_STK_STATES:
			return Object.assign({}, state, {
				states: action.index === 0 ? [action.value, state.states[1]] : [state.states[0], action.value]
			});
		case CST.AC_STK_ADDRESSES:
			return Object.assign({}, state, {
				addresses: action.index === 0 ? [action.value, state.addresses[1]] : [state.addresses[0], action.value]
			});
		case CST.AC_STK_BALANCE:
			return Object.assign({}, state, {
				duo: action.value
			});
		case CST.AC_STK_ALLOWANCE:
			return Object.assign({}, state, {
				allowance: action.index === 0 ? [action.value, state.allowance[1]] : [state.allowance[0], action.value]
			});
		case CST.AC_STK_SUB:
			return Object.assign({}, state, {
				subscription: action.id
			});
		case CST.AC_STK_USERSTAKE:
			return Object.assign({}, state, {
				userStake: action.index === 0 ? [action.value, state.userStake[1]] : [state.userStake[0], action.value]
			});
		case CST.AC_STK_ORACLESTAKE:
			return Object.assign({}, state, {
				oracleStake: action.index === 0 ? [action.value, state.oracleStake[1]] : [state.oracleStake[0], action.value]
			});
		case CST.AC_STK_AWARD:
			return Object.assign({}, state, {
				userAward: action.index === 0 ? [action.value, state.userAward[1]] : [state.userAward[0], action.value]
			});
		case CST.AC_STK_CONTRACTDUO:
			return Object.assign({}, state, {
				contractDUO: action.index === 0 ? [action.value, state.contractDUO[1]] : [state.contractDUO[0], action.value]
			});
		default:
			return state;
	}
}
