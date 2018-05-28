//import * as CST from '../common/constants';
import * as contractActions from '../actions/contractActions';
import contractUtil from '../common/contractUtil';
import store from './store';

describe('store', () => {
	test('actions', () => {
		contractUtil.getSystemStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		contractUtil.getSystemPrices = jest.fn(() => Promise.resolve(['reset', 'last']));
		store.dispatch(contractActions.getCustodianStates());
		store.dispatch(contractActions.getCustodianPrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getState()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
