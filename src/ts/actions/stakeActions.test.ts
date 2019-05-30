// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import util from 'ts/common/util';
import { stakeWrapper } from 'ts/common/wrappers';
import * as stakeActions from './stakeActions';

const stakeStore = configureMockStore([thunk]);

describe('actions', () => {
	stakeWrapper.getStates = jest.fn(() =>
		Promise.resolve({
			canStake: false,
			canUnstake: false,
			lockMinTimeInSecond: 0,
			minStakeAmt: 0,
			maxStakePerOracle: 0,
			totalAwardsToDistribute: 0
		})
	);
	stakeWrapper.getAddresses = jest.fn(() =>
		Promise.resolve({
			operator: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0',
			priceFeedList: [
				'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
				'0x002002812b42601Ae5026344F0395E68527bb0F8',
				'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
			]
		})
	);

	test('balancesUpdate', () => {
		expect(stakeActions.balancesUpdate(123)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.getBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('addressesUpdate', () => {
		expect(
			stakeActions.addressesUpdate({
				operator: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0',
				priceFeedList: [
					'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
					'0x002002812b42601Ae5026344F0395E68527bb0F8',
					'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
				]
			})
		).toMatchSnapshot();
	});
	test('getAddresses', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('userStakeUpdate', () => {
		expect(stakeActions.userStakeUpdate({} as any)).toMatchSnapshot();
	});

	test('getUserStake', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.getUserStake());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('userAwardUpdate', () => {
		expect(stakeActions.userAwardUpdate({} as any)).toMatchSnapshot();
	});

	test('getUserAward', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.getUserAward());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('oracleStakeUpdate', () => {
		expect(stakeActions.oracleStakeUpdate({} as any)).toMatchSnapshot();
	});

	test('getOracleStake', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.getOracleStake());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('contractDUOUpdate', () => {
		expect(stakeActions.contractDUOUpdate({} as any)).toMatchSnapshot();
	});

	test('gerContractDUO', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.gerContractDUO());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('refresh', () => {
		util.getDates = jest.fn(() => ['1970-01-15']);
		const store: any = stakeStore({
			stake: {
				states: {},
				addresses: []
			},
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});

		store.dispatch(stakeActions.refresh());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(stakeActions.subscriptionUpdate(123)).toMatchSnapshot();
	});

	test('subscribe', () => {
		window.setInterval = jest.fn(() => 123);
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeActions.subscribe());
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
