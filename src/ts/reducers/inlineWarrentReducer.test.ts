// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
//import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import * as CST from 'ts/common/constants';
import { initialState, inlineWarrentReducer } from './inlineWarrentReducer';

describe('stake reducer', () => {
	let state = initialState;

	test('default', () => {
		state = inlineWarrentReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('stakeStates', () => {
		state = inlineWarrentReducer(state, {
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
	test('stakeBalance', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_STK_BALANCE,
			value: 1000
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeAllowance', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_STK_ALLOWANCE,
			value: 1000
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub On', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_STK_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub Off', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_STK_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('userAward', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_STK_AWARD,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('price', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_DCC_EX_PX,
			value: []
		});
		expect(state).toMatchSnapshot();
	});
	test('currentround', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_IW_CURRENTROUND,
			value: []
		});
		expect(state).toMatchSnapshot();
	});
	test('addressinfo', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_IW_ADDRESSINFO,
			value: {}
		});
		expect(state).toMatchSnapshot();
	});
	test('boundaries', () => {
		state = inlineWarrentReducer(state, {
			type: CST.AC_IW_BOUNDARIES,
			value: []
		});
		expect(state).toMatchSnapshot();
	});
});
