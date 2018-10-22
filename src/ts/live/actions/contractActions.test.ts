import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as CST from '../common/constants';
import contract from '../common/contract';
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
		const store: any = mockStore({});
		contract.getCurrentNetwork = jest.fn(() => Promise.resolve(123));
		store.dispatch(contractActions.getNetwork());
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
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() =>
			Promise.resolve({
				test: 'test'
			})
		);
		store.dispatch(contractActions.getCustodianStates());
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
		const store: any = mockStore({});
		contract.getCustodianPrices = jest.fn(() =>
			Promise.resolve({
				last: 'last',
				reset: 'reset'
			})
		);
		store.dispatch(contractActions.getCustodianPrices());
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
		const store: any = mockStore({ contract: { account: CST.DUMMY_ADDR } });
		contract.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getBalances());
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
		const store: any = mockStore({ contract: { states: { addrPoolLength: 1 } } });
		contract.getCustodianAddresses = jest.fn(() => Promise.resolve({ test: 'test' }));
		contract.getPoolAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getEthBalance = jest.fn(() => Promise.resolve(123));
		store.dispatch(contractActions.getAddresses());
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
		const store: any = mockStore({});
		contract.getCustodianStates = jest.fn(() => Promise.resolve({ usersLength: 1 }));
		contract.getUserAddress = jest.fn(() => Promise.resolve(CST.DUMMY_ADDR));
		contract.getBalances = jest.fn(() => Promise.resolve({ test: 'test' }));
		store.dispatch(contractActions.getAllBalances(123, 125));
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
		const store: any = mockStore({});
		contract.getGasPrice = jest.fn(() => Promise.resolve(456));
		store.dispatch(contractActions.getGasPrice());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
