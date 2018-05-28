import * as CST from '../common/constants';
import { contractReducer, initialState } from './contractReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = contractReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('state', () => {
		state = contractReducer(state, {
			type: CST.AC_CT_STATE,
			value: 'state'
		});
		expect(state).toMatchSnapshot();
	});
});
