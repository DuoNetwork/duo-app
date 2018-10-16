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
			}, 1000)
		);
	});

	test('hourlyUpdate', () => {
		expect(dynamoActions.hourlyUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	// test('fetchHourly', () => {
	// 	const store: any = mockStore({});
	// 	dynamoUtil.queryHourlyOHLC = jest.fn(() =>
	// 		Promise.resolve({
	// 			test: 'test'
	// 		})
	// 	);
	// 	chartUtil.interpolate = jest.fn(r => r);
	// 	store.dispatch(dynamoActions.fetchHourly());
	// 	return new Promise(resolve =>
	// 		setTimeout(() => {
	// 			expect(store.getActions()).toMatchSnapshot();
	// 			resolve();
	// 		}, 1000)
	// 	);
	// });

	test('minutelyUpdate', () => {
		expect(dynamoActions.minutelyUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	// test('fetchMinutely', () => {
	// 	const store: any = mockStore({});
	// 	dynamoUtil.queryMinutelyOHLC = jest.fn(() =>
	// 		Promise.resolve({
	// 			test: 'test'
	// 		})
	// 	);
	// 	chartUtil.interpolate = jest.fn(r => r);
	// 	store.dispatch(dynamoActions.fetchMinutely());
	// 	return new Promise(resolve =>
	// 		setTimeout(() => {
	// 			expect(store.getActions()).toMatchSnapshot();
	// 			resolve();
	// 		}, 1000)
	// 	);
	// });

	test('priceUpdate', () => {
		expect(dynamoActions.priceUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchPrice', () => {
		const store: any = mockStore({
			contract: { states: { limitUpper: 2, limitLower: 0.25, limitPeriodic: 1.035 } }
		});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchPrice());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('conversionUpdate', () => {
		expect(dynamoActions.conversionUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchConversion', () => {
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
		store.dispatch(dynamoActions.fetchConversion());
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

	test('totalSupplyUpdate', () => {
		expect(dynamoActions.totalSupplyUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchTotalSupply', () => {
		const store: any = mockStore({});
		dynamoUtil.queryTotalSupplyEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchTotalSupply());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
