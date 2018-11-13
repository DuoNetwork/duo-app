import * as CST from '../common/constants';
import { beethovenReducer, initialState } from './beethovenReducer';

describe('beethoven reducer', () => {
	let state = initialState;

	test('default', () => {
		state = beethovenReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('beethovenStates', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_STATES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenAddresses', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_ADDRESSES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenExchangePrices', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_EX_PX,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenAcceptedPrices', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_ACCEPTED_PX,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenConversions', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_CONVERSIONS,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenBalances', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_BALANCES,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenSubscription on', () => {
		state = beethovenReducer(state, {
			type: CST.AC_BTV_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovenSubscription off', () => {
		window.clearInterval = jest.fn();
		state = beethovenReducer(state, {
			type: CST.AC_BTV_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
		expect((window.clearInterval as jest.Mock<Promise<void>>).mock.calls).toMatchSnapshot();
	});
});
