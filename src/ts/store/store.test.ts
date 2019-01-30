// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import store from './store';

describe('store', () => {
	test('actions', () => {
		expect(store.getState()).toMatchSnapshot();
	});
});
