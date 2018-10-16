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

	test('prices', () => {
		state = dynamoReducer(state, {
			type: CST.AC_PRICES,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('acceptedPrices', () => {
		state = dynamoReducer(state, {
			type: CST.AC_ACCEPTED_PRICES,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('conversions', () => {
		state = dynamoReducer(state, {
			type: CST.AC_CONVERSIONS,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	// test('totalSupply', () => {
	// 	state = dynamoReducer(state, {
	// 		type: CST.AC_TOTAL_SUPPLY,
	// 		value: ['test']
	// 	});
	// 	expect(state).toMatchSnapshot();
	// });
});
