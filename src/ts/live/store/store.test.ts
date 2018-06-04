//import * as CST from '../common/constants';
import * as contractActions from '../actions/contractActions';
import * as dynamoActions from '../actions/dynamoActions';
import contractUtil from '../common/contractUtil';
import dynamoUtil from '../common/dynamoUtil';
import store from './store';

describe('store', () => {
	test('actions', () => {
		contractUtil.getSystemStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		contractUtil.getSystemPrices = jest.fn(() => Promise.resolve(['reset', 'last']));
		contractUtil.getBalances = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		contractUtil.getSystemAddresses = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		dynamoUtil.scanStatus = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		dynamoUtil.queryHourlyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(contractActions.getCustodianStates());
		store.dispatch(contractActions.getCustodianPrices());
		store.dispatch(contractActions.getBalances());
		store.dispatch(contractActions.getAddresses());
		store.dispatch(dynamoActions.scanStatus());
		store.dispatch(dynamoActions.fetchHourly());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getState()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
