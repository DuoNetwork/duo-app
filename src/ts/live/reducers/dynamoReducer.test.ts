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
			value: [{
				process: 'test'
			}]
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

	test('dynamoMinutely', () => {
		state = dynamoReducer(state, {
			type: CST.AC_DMN_MINUTELY,
			value: {
				test: 'test'
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('dynamoPrices', () => {
		state = dynamoReducer(state, {
			type: CST.AC_DMN_PRICE,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('conversion', () => {
		state = dynamoReducer(state, {
			type: CST.AC_CONVERSION,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('ui conversion', () => {
		state = dynamoReducer(state, {
			type: CST.AC_UI_CONVERSION,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});

	test('totalSupply', () => {
		state = dynamoReducer(state, {
			type: CST.AC_TOTAL_SUPPLY,
			value: ['test']
		});
		expect(state).toMatchSnapshot();
	});
});
