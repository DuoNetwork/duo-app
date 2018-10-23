import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import * as CST from '../common/constants';
import contract from '../common/contract';
import util from '../common/util';
import * as beethovanActions from './beethovanActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statesUpdate', () => {
		expect(beethovanActions.statesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getStates', () => {
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() =>
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

	test('pricesUpdate', () => {
		expect(beethovanActions.pricesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getPrices', () => {
		const store: any = mockStore({});
		contract.getCustodianPrices = jest.fn(() =>
			Promise.resolve({
				last: 'last',
				reset: 'reset'
			})
		);
		store.dispatch(beethovanActions.getPrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('balancesUpdate', () => {
		expect(beethovanActions.balancesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = mockStore({ web3: { account: CST.DUMMY_ADDR } });
		contract.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovanActions.getBalances());
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

	test('addressPoolUpdate', () => {
		expect(beethovanActions.addressPoolUpdate([{ test: 'test' }] as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store: any = mockStore({ beethovan: { beethovanStates: { addrPoolLength: 1 } } });
		contract.getCustodianAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		contract.getPoolAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getEthBalance = jest.fn(() => Promise.resolve(123));
		store.dispatch(beethovanActions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('allBalancesUpdate', () => {
		expect(beethovanActions.allBalancesUpdate({ test: 'test' } as any, 123)).toMatchSnapshot();
	});

	test('getAllBalances', () => {
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() => Promise.resolve({ usersLength: 1 }));
		contract.getUserAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(beethovanActions.getAllBalances(123, 125));
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
				beethovanStates: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 }
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
				beethovanStates: {
					addrPoolLength: 1,
					limitUpper: 2,
					limitLower: 0.25,
					limitPeriodic: 1.035
				}
			},
			ui: { period: 5, source: 'test' }
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		contract.getCustodianAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		contract.getPoolAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getEthBalance = jest.fn(() => Promise.resolve(123));
		contract.getCustodianPrices = jest.fn(() =>
			Promise.resolve({
				last: 'last',
				reset: 'reset',
				test: 'test'
			})
		);
		store.dispatch(beethovanActions.refresh());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('adminActions', () => {
		const store: any = mockStore({
			beethovan: { beethovanStates: { addrPoolLength: 1 } }
		});
		contract.getCustodianAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		contract.getPoolAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getEthBalance = jest.fn(() => Promise.resolve(123));
		contract.getCurrentAddress = jest.fn(() => Promise.resolve('0x0'));
		store.dispatch(beethovanActions.adminActions());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('userActions', () => {
		contract.getUserAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() =>
			Promise.resolve({ test: 'test', usersLength: 1 })
		);
		store.dispatch(beethovanActions.userActions(0, 20));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('statusActions', () => {
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(beethovanActions.statusActions());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
