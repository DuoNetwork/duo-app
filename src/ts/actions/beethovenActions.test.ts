import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as CST from 'ts/common/constants';
import util from 'ts/common/util';
import { beethovenWapper } from 'ts/common/wrappers';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';
import * as beethovenActions from './beethovenActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statesUpdate', () => {
		expect(beethovenActions.statesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getStates', () => {
		const store: any = mockStore({});
		beethovenWapper.getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(beethovenActions.getStates());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('balancesUpdate', () => {
		expect(beethovenActions.balancesUpdate(1, 2)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = mockStore({ web3: { account: CST.DUMMY_ADDR } });
		beethovenWapper.web3Wrapper.getErc20Balance = jest.fn(() => {
			Promise.resolve(123);
		});
		store.dispatch(beethovenActions.getBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
		expect(beethovenActions.getBalances()).toMatchSnapshot();
	});

	test('addressesUpdate', () => {
		expect(beethovenActions.addressesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store: any = mockStore({ beethoven: { beethovenStates: { addrPoolLength: 1 } } });
		beethovenWapper.getAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovenActions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('exchangePricesUpdate', () => {
		expect(beethovenActions.exchangePricesUpdate(['test'] as any)).toMatchSnapshot();
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
		store.dispatch(beethovenActions.fetchExchangePrices());
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
		store.dispatch(beethovenActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('acceptedPricesUpdate', () => {
		expect(beethovenActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({
			beethoven: {
				states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 }
			}
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(beethovenActions.fetchAcceptedPrices(CST.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('conversionsUpdate', () => {
		expect(beethovenActions.conversionsUpdate(['test'] as any)).toMatchSnapshot();
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
		store.dispatch(beethovenActions.fetchConversions(CST.DUMMY_ADDR));
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
			beethoven: {
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
		beethovenWapper.getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovenActions.refresh('custodian'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(beethovenActions.subscriptionUpdate(123)).toMatchSnapshot();
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
			beethoven: {
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
		beethovenWapper.getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovenActions.subscribe('custodian'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('refreshAdmin', () => {
		beethovenWapper.getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		const store: any = mockStore({ beethoven: { beethovenStates: { addrPoolLength: 1 } } });
		store.dispatch(beethovenActions.refreshAdmin());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(beethovenActions.refreshAdmin()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscribeAdmin', () => {
		beethovenWapper.getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		const store: any = mockStore({ beethoven: { beethovenStates: { addrPoolLength: 1 } } });
		store.dispatch(beethovenActions.subscribeAdmin());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(beethovenActions.subscribeAdmin()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
