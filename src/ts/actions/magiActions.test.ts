import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as CST from 'ts/common/constants';
import util from 'ts/common/util';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';
import * as magiActions from './magiActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('acceptedPricesUpdate', () => {
		expect(magiActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(magiActions.fetchAcceptedPrices(CST.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('refresh', () => {
		util.getDates = jest.fn(() => ['1970-01-15']);
		const store: any = mockStore({});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(magiActions.refresh('contract'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(magiActions.subscriptionUpdate(123)).toMatchSnapshot();
	});

	test('subscribe', () => {
		window.setInterval = jest.fn(() => 123);
		const store: any = mockStore({});
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() => Promise.resolve(['test']));
		store.dispatch(magiActions.subscribe('custodian'));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
