import store from './store';

describe('store', () => {
	test('actions', () => {
		expect(store.getState()).toMatchSnapshot();
	});
});
