import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import * as CST from '../common/constants';
import util from '../common/util';
import { beethovanWapper } from '../common/wrappers';
import * as beethovanActions from './beethovanActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statesUpdate', () => {
		expect(beethovanActions.statesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getStates', () => {
		const store: any = mockStore({});
		beethovanWapper.getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(beethovanActions.getStates());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('addressesUpdate', () => {
		expect(beethovanActions.addressesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store: any = mockStore({ beethovan: { beethovanStates: { addrPoolLength: 1 } } });
		beethovanWapper.getAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovanActions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('exchangePricesUpdate', () => {
		expect(beethovanActions.exchangePricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchExchangePrices 60', () => {
		util.getUTCNowTimestamp = jest.fn(() => 1234567890);
		const store: any = mockStore({
			ui: {
				period: 60,
				source: 'test'
			}
		});
		dynamoUtil.getPrices = jest.fn(
			(src: string, period: number, start: number, end: number, pair: string) =>
				Promise.resolve([src, period, start, end, pair])
		);
		store.dispatch(beethovanActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('fetchExchangePrices 5', () => {
		util.getUTCNowTimestamp = jest.fn(() => 1234567890);
		const store: any = mockStore({
			ui: {
				period: 5,
				source: 'test'
			}
		});
		dynamoUtil.getPrices = jest.fn(
			(src: string, period: number, start: number, end: number, pair: string) =>
				Promise.resolve([src, period, start, end, pair])
		);
		store.dispatch(beethovanActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('acceptedPricesUpdate', () => {
		expect(beethovanActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({
			beethovan: {
				states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 }
			}
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(beethovanActions.fetchAcceptedPrices(CST.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('conversionsUpdate', () => {
		expect(beethovanActions.conversionsUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchConversions', () => {
		const store: any = mockStore({ web3: { account: CST.DUMMY_ADDR } });
		util.getDates = jest.fn(() => ['1970-01-15']);
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
					transactionHash: 'aaa',
					timestamp: 1234567890
				},
				{
					transactionHash: 'bbb',
					timestamp: 1234567890
				},
				{
					transactionHash: 'ccc',
					timestamp: 0
				}
			])
		);
		dynamoUtil.deleteUIConversionEvent = jest.fn(() => Promise.resolve());
		store.dispatch(beethovanActions.fetchConversions(CST.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				expect(
					(dynamoUtil.deleteUIConversionEvent as jest.Mock<Promise<void>>).mock.calls
						.length
				).toBe(2);
				expect(
					(dynamoUtil.deleteUIConversionEvent as jest.Mock<Promise<void>>).mock
						.calls[0][1]
				).toMatchSnapshot();
				expect(
					(dynamoUtil.deleteUIConversionEvent as jest.Mock<Promise<void>>).mock
						.calls[1][1]
				).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('refresh', () => {
		util.getDates = jest.fn(() => ['1970-01-15']);
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
					transactionHash: 'aaa',
					timestamp: 1234567890
				},
				{
					transactionHash: 'bbb',
					timestamp: 1234567890
				},
				{
					transactionHash: 'ccc',
					timestamp: 0
				}
			])
		);
		dynamoUtil.deleteUIConversionEvent = jest.fn(() => Promise.resolve());
		util.getUTCNowTimestamp = jest.fn(() => 1234567890);
		dynamoUtil.getPrices = jest.fn(
			(src: string, period: number, start: number, end: number, pair: string) =>
				Promise.resolve([src, period, start, end, pair])
		);
		const store: any = mockStore({
			web3: { account: CST.DUMMY_ADDR },
			beethovan: {
				states: {
					addrPoolLength: 1,
					limitUpper: 2,
					limitLower: 0.25,
					limitPeriodic: 1.035
				}
			},
			ui: { period: 5, source: 'test' }
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		beethovanWapper.getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovanActions.refresh('custodian'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(beethovanActions.subscriptionUpdate(123)).toMatchSnapshot();
	});

	test('subscribe', () => {
		window.setInterval = jest.fn(() => 123);
		util.getDates = jest.fn(() => ['1970-01-15']);
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
					transactionHash: 'aaa',
					timestamp: 1234567890
				},
				{
					transactionHash: 'bbb',
					timestamp: 1234567890
				},
				{
					transactionHash: 'ccc',
					timestamp: 0
				}
			])
		);
		dynamoUtil.deleteUIConversionEvent = jest.fn(() => Promise.resolve());
		util.getUTCNowTimestamp = jest.fn(() => 1234567890);
		dynamoUtil.getPrices = jest.fn(
			(src: string, period: number, start: number, end: number, pair: string) =>
				Promise.resolve([src, period, start, end, pair])
		);
		const store: any = mockStore({
			web3: { account: CST.DUMMY_ADDR },
			beethovan: {
				states: {
					addrPoolLength: 1,
					limitUpper: 2,
					limitLower: 0.25,
					limitPeriodic: 1.035
				}
			},
			ui: { period: 5, source: 'test' }
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		beethovanWapper.getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovanActions.subscribe('custodian'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
