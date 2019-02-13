// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import * as CST from 'ts/common/constants';
import { initialState, magiReducer } from './magiReducer';

describe('magi reducer', () => {
	let state = initialState;

	test('default', () => {
		state = magiReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('magiAcceptedPrices', () => {
		state = magiReducer(state, {
			type: CST.AC_MAG_ACCEPTED_PX,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('magiStates', () => {
		state = magiReducer(state, {
			type: CST.AC_MAG_STATES,
			value: {
				isStarted: true,
				firstPrice: {
					price: 100,
					timestamp: 1234567890000,
					source: 'pf1'
				},
				secondPrice: {
					price: 102,
					timestamp: 1234567890000,
					source: 'pf2'
				},
				priceTolerance: 1000,
				priceFeedTolerance: 1000,
				priceFeedTimeTolerance: 1000,
				priceUpdateCoolDown: 1000,
				numOfPrices: 1000,
				lastOperationTime: 1000,
				operationCoolDown: 1000
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('magiStates', () => {
		state = magiReducer(state, {
			type: CST.AC_MAG_ADDRS,
			value: {
				priceFeed: ['pf1', 'pf2', 'pf3'],
				operator: 'operator',
				roleManagerAddress: 'roleManagerAddr'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('magiSubscription on', () => {
		state = magiReducer(state, {
			type: CST.AC_MAG_SUB,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('magiSubscription off', () => {
		window.clearInterval = jest.fn();
		state = magiReducer(state, {
			type: CST.AC_MAG_SUB,
			value: 0
		});
		expect(state).toMatchSnapshot();
		expect((window.clearInterval as jest.Mock<Promise<void>>).mock.calls).toMatchSnapshot();
	});
});
