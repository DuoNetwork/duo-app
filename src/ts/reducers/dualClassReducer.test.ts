// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import * as CST from 'ts/common/constants';
import { dualClassReducer, initialState } from './dualClassReducer';

describe('dualClass reducer', () => {
	let state = initialState;

	test('default', () => {
		state = dualClassReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('dualClassStates', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_STATES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassAddresses', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_ADDRESSES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassExchangePrices', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_EX_PX,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassAcceptedPrices', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_ACCEPTED_PX,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassConversions', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_CONVERSIONS,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassBalances', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_BALANCES,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassSubscription on', () => {
		state = dualClassReducer(state, {
			type: CST.AC_DCC_SUB,
			custodianType: 'on type',
			tenor: 'on tenor',
			id: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('dualClassSubscription off', () => {
		window.clearInterval = jest.fn();
		state = dualClassReducer(state, {
			type: CST.AC_DCC_SUB,
			custodianType: 'off type',
			tenor: 'off tenor',
			id: 0
		});
		expect(state).toMatchSnapshot();
		expect((window.clearInterval as jest.Mock<Promise<void>>).mock.calls).toMatchSnapshot();
	});
});
