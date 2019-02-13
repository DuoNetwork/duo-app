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
			numOfPrices: 1,
			lastOperationTime: 0,
			operationCoolDown: 1234
		})
	);
	magiWrapper.getAddresses = jest.fn(() =>
		Promise.resolve({
			operator: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0',
			roleManagerAddress: '0x08cb8054201a9FdfE63fbdB1b3028E12d284D0dD',
			priceFeed: [
				'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
				'0x002002812b42601Ae5026344F0395E68527bb0F8',
				'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
			]
		})
	);
	dynamoUtil.queryAcceptPriceEvent = jest.fn(() =>
		Promise.resolve([
			{ timestamp: 1234567890000, price: 100 },
			{ timestamp: 1234567880000, price: 102 }
		] as any)
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
			] as any)
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
