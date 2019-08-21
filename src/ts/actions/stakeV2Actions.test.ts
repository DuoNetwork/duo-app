// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import util from 'ts/common/util';
import { stakeV2Wrapper, web3Wrapper } from 'ts/common/wrappers';
import * as stakeV2Actions from './stakeV2Actions';

const stakeStore = configureMockStore([thunk]);

describe('actions', () => {
	stakeV2Wrapper.getStates = jest.fn(() =>
		Promise.resolve({
			canStake: false,
			canUnstake: false,
			lockMinTimeInSecond: 0,
			minStakeAmt: 0,
			maxStakePerOracle: 0,
			totalAwardsToDistribute: 0,
			stakingEnabled: false,
			totalRewardsToDistribute: 0
		})
	);
	stakeV2Wrapper.getAddresses = jest.fn(() =>
		Promise.resolve({
			operator: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0',
			priceFeedList: [
				'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
				'0x002002812b42601Ae5026344F0395E68527bb0F8',
				'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
			],
			burnAddress: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355',
			duoTokenAddress: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355',
			uploader: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355'
		})
	);
	stakeV2Wrapper.getOracleList = jest.fn(() =>
		Promise.resolve([
			'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
			'0x002002812b42601Ae5026344F0395E68527bb0F8',
			'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
		])
	);
	stakeV2Wrapper.getUserStakes = jest.fn(() =>
		Promise.resolve({
			'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a': [{ timestamp: 1234567890, amount: 123 }],
			'0x002002812b42601Ae5026344F0395E68527bb0F8': [{ timestamp: 1234567890, amount: 123 }]
		})
	);
	stakeV2Wrapper.getOracleStakes = jest.fn(() =>
		Promise.resolve({
			'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a': 123,
			'0x002002812b42601Ae5026344F0395E68527bb0F8': 234
		})
	);
	stakeV2Wrapper.getUserReward = jest.fn(() => Promise.resolve(500));
	web3Wrapper.getErc20Balance = jest.fn(() => Promise.resolve(100));
	web3Wrapper.getErc20Allowance = jest.fn(() => Promise.resolve(100));

	test('balancesUpdate', () => {
		expect(stakeV2Actions.balancesUpdate(123)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('allowanceUpdate', () => {
		expect(stakeV2Actions.allowanceUpdate(123)).toMatchSnapshot();
	});

	test('getAllowance', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getAllowance());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('addressesUpdate', () => {
		expect(
			stakeV2Actions.addressesUpdate({
				operator: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0',
				priceFeedList: [
					'0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
					'0x002002812b42601Ae5026344F0395E68527bb0F8',
					'0x00476E55e02673B0E4D2B474071014D5a366Ed4E'
				],
				burnAddress: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355',
				duoTokenAddress: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355',
				uploader: '0x61cA89CfC5E8099702e64e97D9b5FC457cf1d355'
			})
		).toMatchSnapshot();
	});
	test('getAddresses', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getAddresses());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('userStakeUpdate', () => {
		expect(stakeV2Actions.userStakeUpdate({} as any)).toMatchSnapshot();
	});

	test('getUserStake', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getUserStake());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('userAwardUpdate', () => {
		expect(stakeV2Actions.userAwardUpdate({} as any)).toMatchSnapshot();
	});

	test('getUserAward', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getUserAward());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('oracleStakeUpdate', () => {
		expect(stakeV2Actions.oracleStakeUpdate({} as any)).toMatchSnapshot();
	});

	test('getOracleStake', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getOracleStake());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('contractDUOUpdate', () => {
		expect(stakeV2Actions.contractDUOUpdate({} as any)).toMatchSnapshot();
	});

	test('getContractDUO', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.getContractDUO());
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

		store.dispatch(stakeV2Actions.refresh());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(stakeV2Actions.subscriptionUpdate(123)).toMatchSnapshot();
	});

	test('subscribe', () => {
		window.setInterval = jest.fn(() => 123);
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.subscribe());
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
	test('refreshAdmin', () => {
		util.getDates = jest.fn(() => ['1970-01-15']);
		const store: any = stakeStore({
			stake: {
				states: {},
				addresses: []
			},
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});

		store.dispatch(stakeV2Actions.refreshAdmin());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('subscribeAdmin', () => {
		window.setInterval = jest.fn(() => 123);
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(stakeV2Actions.subscribeAdmin());
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
