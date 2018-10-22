import * as CST from '../common/constants';
import { initialState, uiReducer } from './uiReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = uiReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('period', () => {
		state = uiReducer(state, {
			type: CST.AC_PERIOD,
			value: 1
		});
		expect(state).toMatchSnapshot();
	});

	test('source', () => {
		state = uiReducer(state, {
			type: CST.AC_SOURCE,
			value: 'test'
		});
		expect(state).toMatchSnapshot();
	});
});
