import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IContractState } from '../common/types';

export const initialState: IContractState = {
	states: {
		state: CST.CTD_LOADING,
		navA: 0,
		navB: 0,
		totalSupplyA: 0,
		totalSupplyB: 0,
		alpha: 0,
		beta: 0,
		feeAccumulated: 0,
		periodCoupon: 0,
		limitPeriodic: 0,
		limitUpper: 0,
		limitLower: 0,
		commissionRate: 0,
		period: 0,
		iterationGasThreshold: 0,
		ethDuoFeeRatio: 0,
		preResetWaitingBlocks: 0,
		priceTol: 0,
		priceFeedTol: 0,
		priceFeedTimeTol: 0,
		priceUpdateCoolDown: 0,
		numOfPrices: 0,
		nextResetAddrIndex: 0,
		lastAdminTime: 0,
		adminCoolDown: 0,
		usersLength: 0,
		addrPoolLength: 0,
		ethBalance: 0,
		duoBalance: 0
	},
	prices: {
		first: { address: '0x0', price: 0, timestamp: 0 },
		second: { address: '0x0', price: 0, timestamp: 0 },
		reset: { address: '0x0', price: 0, timestamp: 0 },
		last: { address: '0x0', price: 0, timestamp: 0 }
	},
	balances: {
		eth: 0,
		duo: 0,
		allowance: 0,
		tokenA: 0,
		tokenB: 0
	},
	addresses: {
		operator: {
			address: '0x0',
			balance: 0
		},
		feeCollector: {
			address: '0x0',
			balance: 0
		},
		priceFeed1: {
			address: '0x0',
			balance: 0
		},
		priceFeed2: {
			address: '0x0',
			balance: 0
		},
		priceFeed3: {
			address: '0x0',
			balance: 0
		},
		poolManager: {
			address: '0x0',
			balance: 0
		}
	},
	account: '0x0',
	network: 0,
	gasPrice: 0,
	allBalances: {},
	addressPool: []
};

export function contractReducer(
	state: IContractState = initialState,
	action: AnyAction
): IContractState {
	switch (action.type) {
		case CST.AC_CTD_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_CTD_PRICES:
			return Object.assign({}, state, {
				prices: action.value
			});
		case CST.AC_ACCOUNT:
			return Object.assign({}, state, {
				[action.type]: action.value || ''
			});
		case CST.AC_ALL_BALANCES:
			return Object.assign({}, state, {
				[action.type]: Object.assign({}, state.allBalances, action.value)
			});
		case CST.AC_BALANCES:
		case CST.AC_ADDRESSES:
		case CST.AC_ACCOUNT:
		case CST.AC_NETWORK:
		case CST.AC_ADDR_POOL:
		case CST.AC_GAS_PX:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
