// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import * as CST from 'ts/common/constants';
import { initialState, stakeV2Reducer } from './stakeV2Reducer';

describe('stake reducer', () => {
	let state = initialState;

	test('default', () => {
		state = stakeV2Reducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('stakeStates', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_STATES,
			value: {
				canStake: false,
				canUnstake: false,
				lockMinTimeInSecond: 300,
				minStakeAmt: 500,
				maxStakePerOracle: 100000,
				totalAwardsToDistribute: 0,
				stakingEnabled: false,
				totalRewardsToDistribute: 0,
			}
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeAddress', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_ADDRESSES,
			value: {
				operator: WrapperConstants.DUMMY_ADDR,
				priceFeedList: []
			}
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeBalance', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_BALANCE,
			value: 1000
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeAllowance', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_ALLOWANCE,
			value: 1000
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub On', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub Off', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('userStake', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_USERSTAKE,
			value: {}
		});
		expect(state).toMatchSnapshot();
	});
	test('oracleStake', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_ORACLESTAKE,
			value: {}
		});
		expect(state).toMatchSnapshot();
	});
	test('userAward', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_AWARD,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('contractDUO', () => {
		state = stakeV2Reducer(state, {
			type: CST.AC_STK_CONTRACTDUO,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
});
