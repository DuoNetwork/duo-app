import * as CST from '../common/constants';
import { contractReducer, initialState } from './contractReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = contractReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('custodianStates', () => {
		state = contractReducer(state, {
			type: CST.AC_CTD_STATES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});
});
