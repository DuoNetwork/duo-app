import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import contract from '../common/contract';
import * as web3Actions from './web3Actions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('accountUpdate', () => {
		expect(web3Actions.accountUpdate('test')).toMatchSnapshot();
	});

	test('getAccount', () => {
		const store: any = mockStore({});
		contract.getCurrentAddress = jest.fn(() => Promise.resolve('0x0'));
		store.dispatch(web3Actions.getAccount());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('networkUpdate', () => {
		expect(web3Actions.networkUpdate(123)).toMatchSnapshot();
	});

	test('getNetwork', () => {
		const store: any = mockStore({});
		contract.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		store.dispatch(web3Actions.getNetwork());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('gasPriceUpdate', () => {
		expect(web3Actions.gasPriceUpdate(123)).toMatchSnapshot();
	});

	test('getGasPrice', () => {
		const store: any = mockStore({});
		contract.getGasPrice = jest.fn(() => Promise.resolve(456));
		store.dispatch(web3Actions.getGasPrice());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
});
