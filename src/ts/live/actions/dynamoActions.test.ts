import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import * as CST from '../common/constants';
import util from '../common/util';
import * as dynamoActions from './dynamoActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statusUpdate', () => {
		expect(dynamoActions.statusUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('scanStatus', () => {
		const store: any = mockStore({});
		dynamoUtil.scanStatus = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(dynamoActions.scanStatus());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('pricesUpdate', () => {
		expect(dynamoActions.pricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchPrices 60', () => {
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
		store.dispatch(dynamoActions.fetchPrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('fetchPrices 5', () => {
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
		store.dispatch(dynamoActions.fetchPrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	})

	test('acceptedPricesUpdate', () => {
		expect(dynamoActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({
			contract: { states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 } }
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchAcceptedPrices(CST.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('conversionsUpdate', () => {
		expect(dynamoActions.conversionsUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchConversions', () => {
		const store: any = mockStore({ contract: { account: CST.DUMMY_ADDR } });
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
		store.dispatch(dynamoActions.fetchConversions(CST.DUMMY_ADDR));
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
			}, 1000)
		);
	});
});
