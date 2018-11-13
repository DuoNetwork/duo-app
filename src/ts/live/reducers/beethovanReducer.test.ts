import * as CST from '../common/constants';
import { beethovanReducer, initialState } from './beethovanReducer';

describe('beethovan reducer', () => {
	let state = initialState;

	test('default', () => {
		state = beethovanReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('beethovanStates', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_STATES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanAddresses', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_ADDRESSES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanExchangePrices', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_EX_PX,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanAcceptedPrices', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_ACCEPTED_PX,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanConversions', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_CONVERSIONS,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanBalances', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_BALANCES,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanSubscription on', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanSubscription off', () => {
		window.clearInterval = jest.fn();
		state = beethovanReducer(state, {
			type: CST.AC_BTV_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
		expect((window.clearInterval as jest.Mock<Promise<void>>).mock.calls).toMatchSnapshot();
	});
});
