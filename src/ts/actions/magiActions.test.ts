// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dynamoUtil from 'ts/common/dynamoUtil';
import util from 'ts/common/util';
import { magiWrapper } from 'ts/common/wrappers';
import * as magiActions from './magiActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	magiWrapper.getStates = jest.fn(() =>
		Promise.resolve({
			isStarted: false,
			firstPrice: {
				price: 100,
				timestamp: 1234567890000,
				source: 'source1'
			},
			secondPrice: {
				price: 102,
				timestamp: 1234567890000,
				source: 'source2'
			},
			priceTolerance: 0.1,
			priceFeedTolerance: 0.5,
			priceFeedTimeTolerance: 100,
			priceUpdateCoolDown: 1000,
			numOfPrices: 1
		})
	);
	magiWrapper.getAddresses = jest.fn(() => Promise.resolve(['pf1', 'pf2', 'pf3']));
	dynamoUtil.queryAcceptPriceEvent = jest.fn(() =>
		Promise.resolve([
			{ timestamp: 1234567890000, price: 100 },
			{ timestamp: 1234567880000, price: 102 }
		])
	);

	test('acceptedPricesUpdate', () => {
		expect(magiActions.acceptedPricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAcceptedPrices', () => {
		const store: any = mockStore({});
		store.dispatch(magiActions.fetchAcceptedPrices(WrapperConstants.DUMMY_ADDR));
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('refresh', () => {
		util.getDates = jest.fn(() => ['1970-01-15']);
		const store: any = mockStore({
			magi: {
				states: {},
				addresses: []
			}
		});

		store.dispatch(magiActions.refresh());
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
		store.dispatch(magiActions.subscribe());
		dynamoUtil.queryAcceptPriceEvent = jest.fn(() =>
			Promise.resolve([
				{ timestamp: 1234567870000, price: 106 },
				{ timestamp: 1234567890000, price: 100 },
				{ timestamp: 1234567880000, price: 102 }
			])
		);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				expect((window.setInterval as jest.Mock).mock.calls[0][1]).toMatchSnapshot();

				(window.setInterval as jest.Mock).mock.calls[0][0]();
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
