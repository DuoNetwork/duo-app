import * as CST from '../common/constants';
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
