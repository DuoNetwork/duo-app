// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dynamoUtil from 'ts/common/dynamoUtil';
import util from 'ts/common/util';
import warrantUtil from 'ts/common/warrantUtil';
import { stakeV2Wrapper, web3Wrapper } from 'ts/common/wrappers';
import * as inlineWarrentActions from './inlineWarrentActions';

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
		expect(inlineWarrentActions.balancesUpdate(123)).toMatchSnapshot();
	});

	test('getBalances', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(inlineWarrentActions.getBalances());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('allowanceUpdate', () => {
		expect(inlineWarrentActions.allowanceUpdate(123)).toMatchSnapshot();
	});

	test('getAllowance', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(inlineWarrentActions.getAllowance());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});
	test('userAwardUpdate', () => {
		expect(inlineWarrentActions.userAwardUpdate({} as any)).toMatchSnapshot();
	});

	test('getUserAward', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(inlineWarrentActions.getUserAward());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('exchangePricesUpdate', () => {
		expect(inlineWarrentActions.exchangePricesUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchExchangePrices', () => {
		util.getUTCNowTimestamp = jest.fn(() => 1234567890);
		const store: any = stakeStore({
			ui: {
				period: 5,
				source: 'test'
			}
		});
		dynamoUtil.getPrices = jest.fn(
			(src: string, period: number, start: number, end: number, pair: string) =>
				Promise.resolve([src, period, start, end, pair] as any)
		);
		store.dispatch(inlineWarrentActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('currentRoundUpdate', () => {
		expect(inlineWarrentActions.currentRoundUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchCurrentRoundInfo', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		warrantUtil.getCurrentRoundInfo = jest.fn((account: string) =>
			Promise.resolve([{ date: 1234567890, amount: 0, txHash: account, status: 'mined' }])
		);
		store.dispatch(inlineWarrentActions.fetchExchangePrices());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('addressInfoUpdate', () => {
		expect(inlineWarrentActions.addressInfoUpdate(['test'] as any)).toMatchSnapshot();
	});

	test('fetchAddressInfo', () => {
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		warrantUtil.getAddressInfo = jest.fn((account: string) =>
			Promise.resolve({
				roundStakingAmount: [100, 100],
				roundReturn: [100, 100],
				settleETH: 200.0,
				date: account,
				boundETH: [200, 200]
			})
		);
		store.dispatch(inlineWarrentActions.fetchExchangePrices());
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

		store.dispatch(inlineWarrentActions.refresh());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 0)
		);
	});

	test('subscriptionUpdate', () => {
		expect(inlineWarrentActions.subscriptionUpdate(123)).toMatchSnapshot();
	});

	test('subscribe', () => {
		window.setInterval = jest.fn(() => 123);
		const store: any = stakeStore({
			web3: { account: '0x415DE7Edfe2c9bBF8449e33Ff88c9be698483CC0' }
		});
		store.dispatch(inlineWarrentActions.subscribe());
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
