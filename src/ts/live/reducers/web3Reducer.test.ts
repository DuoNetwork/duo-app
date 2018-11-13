import * as CST from '../common/constants';
import { initialState, web3Reducer } from './web3Reducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = web3Reducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('account', () => {
		state = web3Reducer(state, {
			type: CST.AC_WEB3_ACCOUNT,
			value: 'test'
		});
		expect(state).toMatchSnapshot();
	});

	test('network', () => {
		state = web3Reducer(state, {
			type: CST.AC_WEB3_NETWORK,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('gasPrice', () => {
		state = web3Reducer(state, {
			type: CST.AC_WEB3_GAS_PX,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});

	test('balance', () => {
		state = web3Reducer(state, {
			type: CST.AC_WEB3_BALACE,
			value: 123
		});
		expect(state).toMatchSnapshot();
	});
});
