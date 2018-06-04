import * as CST from '../common/constants';
import { dynamoReducer, initialState } from './dynamoReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = dynamoReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('dynamoStatus', () => {
		state = dynamoReducer(state, {
			type: CST.AC_DNM_STATUS,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('dynamoHourly', () => {
		state = dynamoReducer(state, {
			type: CST.AC_DMN_HOURLY,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});
});
