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
});
