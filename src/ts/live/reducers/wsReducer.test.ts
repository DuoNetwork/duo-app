import * as CST from '../common/constants';
import { initialState, wsReducer } from './wsReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = wsReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('subscribe', () => {
		state = wsReducer(state, {
			type: CST.AC_SUBSCRIBE
		});
		expect(state).toMatchSnapshot();
	});
});
