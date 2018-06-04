import * as CST from '../common/constants';
import util from '../common/util';
import { initialState, uiReducer } from './uiReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = uiReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('refresh', () => {
		util.getNowTimestamp = jest.fn(() => 1234567890);
		state = uiReducer(state, {
			type: CST.AC_REFRESH
		});
		expect(state).toMatchSnapshot();
	});
});
