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

	test('beethovanPrices', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_PRICES,
			value: {
				reset: 'reset',
				last: 'last'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('beethovanBalances', () => {
		state = beethovanReducer(state, {
			type: CST.AC_BTV_BALANCES,
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

	test('allBalances', () => {
		state = beethovanReducer(state, {
			type: CST.AC_ALL_BALANCES,
			value: {
				123: {
					test: 'test'
				}
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('addressPool', () => {
		state = beethovanReducer(state, {
			type: CST.AC_ADDR_POOL,
			value: {
				123: {
					test: 'test'
				}
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
});
