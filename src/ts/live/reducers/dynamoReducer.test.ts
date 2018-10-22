import * as CST from '../common/constants';
import { dynamoReducer, initialState } from './dynamoReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = dynamoReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('status', () => {
		state = dynamoReducer(state, {
			type: CST.AC_STATUS,
			value: [{
				process: 'test'
			}]
		});
		expect(state).toMatchSnapshot();
	});
});
