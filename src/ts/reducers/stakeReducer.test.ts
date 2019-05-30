// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import * as CST from 'ts/common/constants';
import { initialState, stakeReducer } from './stakeReducer';

describe('stake reducer', () => {
	let state = initialState;

	test('default', () => {
		state = stakeReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('stakeStates', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_STATES,
			value: {
				canStake: false,
				canUnstake: false,
				lockMinTimeInSecond: 300,
				minStakeAmt: 500,
				maxStakePerOracle: 100000,
				totalAwardsToDistribute: 0
			}
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeAddress', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_ADDRESSES,
			value: {
				operator: WrapperConstants.DUMMY_ADDR,
				priceFeedList: []
			}
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeBalance', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_BALANCE,
			value: 1000
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub On', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});
	test('stakeSub Off', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('userStake', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_USERSTAKE,
			value: {}
		});
		expect(state).toMatchSnapshot();
	});
	test('oracleStake', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_ORACLESTAKE,
			value: {}
		});
		expect(state).toMatchSnapshot();
	});
	test('userAward', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_AWARD,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
	test('contractDUO', () => {
		state = stakeReducer(state, {
			type: CST.AC_STK_CONTRACTDUO,
			value: 0
		});
		expect(state).toMatchSnapshot();
	});
});
