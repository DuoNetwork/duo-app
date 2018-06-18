import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import chartUtil from '../common/chartUtil';
import dynamoUtil from '../common/dynamoUtil';
import * as dynamoActions from './dynamoActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('statusUpdate', () => {
		expect(dynamoActions.statusUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('scanStatus', () => {
		const store = mockStore({});
		dynamoUtil.scanStatus = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(dynamoActions.scanStatus() as any);
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

	test('fetchHourly', () => {
		const store = mockStore({});
		dynamoUtil.queryHourlyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		chartUtil.interpolate = jest.fn(r => r);
		store.dispatch(dynamoActions.fetchHourly() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('minutelyUpdate', () => {
		expect(dynamoActions.minutelyUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('fetchMinutely', () => {
		const store = mockStore({});
		dynamoUtil.queryMinutelyOHLC = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		chartUtil.interpolate = jest.fn(r => r);
		store.dispatch(dynamoActions.fetchMinutely() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('priceUpdate', () => {
		expect(dynamoActions.priceUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchPrice', () => {
		const store = mockStore({});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchPrice() as any);
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
		const store = mockStore({ contract: { account: '0x0' } });
		dynamoUtil.queryConversionEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchConversion() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('totalSupplyUpdate', () => {
		expect(dynamoActions.totalSupplyUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchTotalSupply', () => {
		const store = mockStore({});
		dynamoUtil.queryTotalSupplyEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchTotalSupply() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('uiConversionUpdate', () => {
		expect(dynamoActions.uiConversionUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchConversion', () => {
		const store = mockStore({ contract: { account: '0x0' } });
		dynamoUtil.queryUIConversionEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(dynamoActions.fetchUIConversion() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
