import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chartUtil from '../common/chartUtil';
import * as CST from '../common/constants';
import contract from '../common/contract';
import dynamoUtil from '../common/dynamoUtil';
import * as uiActions from './uiActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('refresh', () => {
		const store: any = mockStore({
			contract: {
				account: CST.DUMMY_ADDR,
				states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 }
			}
		});
		contract.getCustodianStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		contract.getCustodianPrices = jest.fn(() => Promise.resolve(['reset', 'last']));
		contract.getCurrentAddress = jest.fn(() => Promise.resolve('test'));
		contract.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		contract.getGasPrice = jest.fn(() => Promise.resolve(123));
		contract.getBalances = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		contract.getCustodianAddresses = jest.fn(() =>
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
		dynamoUtil.queryMinutelyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		dynamoUtil.queryConversionEvent = jest.fn(() =>
			Promise.resolve([
				{
					transactionHash: 'aaa'
				}
			])
		);
		dynamoUtil.queryUIConversionEvent = jest.fn(() =>
			Promise.resolve([
				{
					transactionHash: 'aaa'
				},
				{
					transactionHash: 'bbb'
				}
			])
		);
		dynamoUtil.queryTotalSupplyEvent = jest.fn(() => Promise.resolve(['test']));
		chartUtil.interpolate = jest.fn(r => r);
		dynamoUtil.deleteUIConversionEvent = jest.fn(() => Promise.resolve());
		store.dispatch(uiActions.refresh());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 2000)
		);
	});

	test('localeUpdate', () => {
		expect(uiActions.localeUpdate('test')).toMatchSnapshot();
	});
});
