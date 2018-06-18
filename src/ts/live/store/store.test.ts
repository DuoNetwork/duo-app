//import * as CST from '../common/constants';
import * as contractActions from '../actions/contractActions';
import * as uiActions from '../actions/uiActions';
import chartUtil from '../common/chartUtil';
import contractUtil from '../common/contractUtil';
import dynamoUtil from '../common/dynamoUtil';
import util from '../common/util';
import store from './store';

describe('store', () => {
	test('actions', () => {
		contractUtil.getSystemStates = jest.fn(() =>
			Promise.resolve({
				test: 'test',
				usersLength: 1
			})
		);
		contractUtil.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		contractUtil.getSystemPrices = jest.fn(() => Promise.resolve(['reset', 'last']));
		contractUtil.getCurrentAddress = jest.fn(() => Promise.resolve('test'));
		contractUtil.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		contractUtil.getUserAddress = jest.fn(() => '0x0');
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
			Promise.resolve([{
				process: 'test'
			}])
		);
		dynamoUtil.queryHourlyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		dynamoUtil.queryMinutelyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		dynamoUtil.queryConversionEvent = jest.fn(() => Promise.resolve(['test']));
		dynamoUtil.queryUIConversionEvent = jest.fn(() => Promise.resolve(['test']));
		dynamoUtil.queryTotalSupplyEvent = jest.fn(() => Promise.resolve(['test']));
		chartUtil.interpolate = jest.fn(r => r);
		util.getNowTimestamp = jest.fn(() => 1234567890);
		store.dispatch(contractActions.getAddresses());
		store.dispatch(uiActions.refresh());
		store.dispatch(contractActions.getAllBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getState()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
