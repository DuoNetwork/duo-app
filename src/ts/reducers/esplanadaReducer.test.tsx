import * as CST from 'ts/common/constants';
import { espReducer, initialState } from './esplanadeReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('espStates', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_STATES,
			value: [{ esplanadeStates: 'test' }]
		});
		expect(state).toMatchSnapshot();
	});

	test('espAddrs', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_ADDRS,
			value: [{ esplanadeAddrs: 'test' }]
		});
		expect(state).toMatchSnapshot();
	});

	test('espSubscription', () => {
		state = espReducer(state, {
			type: CST.AC_ESP_SUB,
			value: [{ subscription: 'test' }]
		});
		expect(state).toMatchSnapshot();
	});

	test('default', () => {
		state = espReducer(state, { type: CST.AC_ESP_SUB, value: null });
		expect(state).toMatchSnapshot();
	});
});
