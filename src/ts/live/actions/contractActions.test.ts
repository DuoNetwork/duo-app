import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as contractActions from './contractActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('accountUpdate', () => {
		expect(contractActions.accountUpdate('test')).toMatchSnapshot();
	});

	test('networkUpdate', () => {
		expect(contractActions.networkUpdate(123)).toMatchSnapshot();
	});

	test('getNetwork', () => {
		const store = mockStore({});
		contractUtil.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		store.dispatch(contractActions.getNetwork() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 2000)
		);
	});

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
		const store = mockStore({ contract: { account: '0x0' } });
		contractUtil.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getBalances() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 2000)
		);
	});

	test('addressesUpdate', () => {
		expect(contractActions.addressesUpdate({ test: 'test' } as any)).toMatchSnapshot();
	});

	test('addressPoolUpdate', () => {
		expect(contractActions.addressPoolUpdate([{ test: 'test' }] as any)).toMatchSnapshot();
	});

	test('getAddresses', () => {
		const store = mockStore({ contract: { states: { addrPoolLength: 1 } } });
		contractUtil.getSystemAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		contractUtil.getPoolAddress = jest.fn(() => Promise.resolve('0x0'));
		contractUtil.getEthBalance = jest.fn(() => Promise.resolve(123));
		store.dispatch(contractActions.getAddresses() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('allBalancesUpdate', () => {
		expect(contractActions.allBalancesUpdate({ test: 'test' } as any, 123)).toMatchSnapshot();
	});

	test('getAllBalances', () => {
		const store = mockStore({});
		contractUtil.getSystemStates = jest.fn(() => Promise.resolve({ usersLength: 1 }));
		contractUtil.getUserAddress = jest.fn(() => Promise.resolve('0x0'));
		contractUtil.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getAllBalances(123, 125) as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});

	test('gasPriceUpdate', () => {
		expect(contractActions.gasPriceUpdate(123)).toMatchSnapshot();
	});

	test('getGasPrice', () => {
		const store = mockStore({});
		contractUtil.getGasPrice = jest.fn(() => Promise.resolve(456));
		store.dispatch(contractActions.getGasPrice() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
