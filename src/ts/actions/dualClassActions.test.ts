// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import util from 'ts/common/util';
import { dualClassWrappers } from 'ts/common/wrappers';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';
import * as dualClassActions from './dualClassActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statesUpdate', () => {
		expect(dualClassActions.statesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getStates', () => {
		const store: any = mockStore({
			dualClass: {
				type: WrapperConstants.BEETHOVEN,
				tenor: WrapperConstants.TENOR_PPT
			}
		});
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(dualClassActions.getStates());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('balancesUpdate', () => {
		expect(dualClassActions.balancesUpdate(1, 2)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = mockStore({
			dualClass: {
				type: WrapperConstants.BEETHOVEN,
				tenor: WrapperConstants.TENOR_PPT
			},
			web3: { account: WrapperConstants.DUMMY_ADDR }
		});
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].web3Wrapper.getErc20Balance = jest.fn(() => {
			Promise.resolve(123);
		});
		store.dispatch(dualClassActions.getBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				expect(
					(dualClassWrappers[WrapperConstants.BEETHOVEN][WrapperConstants.TENOR_PPT]
						.web3Wrapper.getErc20Balance as jest.Mock).mock.calls
				).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('addressesUpdate', () => {
		expect(dualClassActions.addressesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store: any = mockStore({
			dualClass: {
				type: WrapperConstants.BEETHOVEN,
				tenor: WrapperConstants.TENOR_PPT
			}
		});
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(dualClassActions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('exchangePricesUpdate', () => {
		expect(dualClassActions.exchangePricesUpdate(['test'] as any)).toMatchSnapshot();
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
		store.dispatch(dualClassActions.fetchExchangePrices());
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
		store.dispatch(dualClassActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('acceptedPricesUpdate', () => {
		expect(dualClassActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({
			dualClass: {
				states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 }
			}
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dualClassActions.fetchAcceptedPrices(WrapperConstants.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('conversionsUpdate', () => {
		expect(dualClassActions.conversionsUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchConversions', () => {
		const store: any = mockStore({ web3: { account: WrapperConstants.DUMMY_ADDR } });
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
		store.dispatch(dualClassActions.fetchConversions(WrapperConstants.DUMMY_ADDR));
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
			web3: { account: WrapperConstants.DUMMY_ADDR },
			dualClass: {
				type: WrapperConstants.BEETHOVEN,
				tenor: WrapperConstants.TENOR_PPT,
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
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(dualClassActions.refresh(true));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(dualClassActions.subscriptionUpdate('type', 'tenor', 123)).toMatchSnapshot();
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
			web3: { account: WrapperConstants.DUMMY_ADDR },
			dualClass: {
				type: WrapperConstants.BEETHOVEN,
				tenor: WrapperConstants.TENOR_PPT,
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
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getStates = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(
			dualClassActions.subscribe(WrapperConstants.BEETHOVEN, WrapperConstants.TENOR_PPT)
		);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('refreshAdmin', () => {
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		const store: any = mockStore({
			dualClass: { type: WrapperConstants.BEETHOVEN, tenor: WrapperConstants.TENOR_PPT }
		});
		store.dispatch(dualClassActions.refreshAdmin());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(dualClassActions.refreshAdmin()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscribeAdmin', () => {
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].getStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		const store: any = mockStore({
			dualClass: { type: WrapperConstants.BEETHOVEN, tenor: WrapperConstants.TENOR_PPT }
		});
		store.dispatch(
			dualClassActions.subscribeAdmin(WrapperConstants.BEETHOVEN, WrapperConstants.TENOR_PPT)
		);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(
					dualClassActions.subscribeAdmin(
						WrapperConstants.BEETHOVEN,
						WrapperConstants.TENOR_PPT
					)
				).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
