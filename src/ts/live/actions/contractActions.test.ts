import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as contractActions from './contractActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('custodianStatesUpdate', () => {
		expect(contractActions.custodianStatesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getCustodianStates', () => {
		const store = mockStore({});
		contractUtil.getSystemStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(contractActions.getCustodianStates() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('custodianPricesUpdate', () => {
		expect(contractActions.custodianPricesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getCustodianPrices', () => {
		const store = mockStore({});
		contractUtil.getSystemPrices = jest.fn(() =>
			Promise.resolve({
				last: 'last',
				reset: 'reset'
			})
		);
		store.dispatch(contractActions.getCustodianPrices() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('balancesUpdate', () => {
		expect(contractActions.balancesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store = mockStore({});
		contractUtil.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getBalances() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('addressesUpdate', () => {
		expect(contractActions.addressesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store = mockStore({});
		contractUtil.getSystemAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getAddresses() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
