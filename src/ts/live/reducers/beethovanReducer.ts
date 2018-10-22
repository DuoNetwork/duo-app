import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IBeethovanState } from '../common/types';

export const initialState: IBeethovanState = {
	beethovanStates: {
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
		createCommRate: 0,
		redeemCommRate: 0,
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
	beethovanPrices: {
		first: { address: CST.DUMMY_ADDR, price: 0, timestamp: 0 },
		second: { address: CST.DUMMY_ADDR, price: 0, timestamp: 0 },
		reset: { address: CST.DUMMY_ADDR, price: 0, timestamp: 0 },
		last: { address: CST.DUMMY_ADDR, price: 0, timestamp: 0 }
	},
	beethovanBalances: {
		eth: 0,
		duo: 0,
		allowance: 0,
		tokenA: 0,
		tokenB: 0
	},
	beethovanAddresses: {
		operator: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		feeCollector: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		priceFeed1: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		priceFeed2: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		priceFeed3: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		poolManager: {
			address: CST.DUMMY_ADDR,
			balance: 0
		}
	},
	allBalances: {},
	addressPool: [],
	beethovanExchangePrices: [],
	beethovanAcceptedPrices: [],
	beethovanConversions: []
};

export function beethovanReducer(
	state: IBeethovanState = initialState,
	action: AnyAction
): IBeethovanState {
	switch (action.type) {
		case CST.AC_ALL_BALANCES:
			return Object.assign({}, state, {
				[action.type]: Object.assign({}, state.allBalances, action.value)
			});
		case CST.AC_BTV_STATES:
		case CST.AC_BTV_PRICES:
		case CST.AC_BTV_ADDRESSES:
		case CST.AC_BTV_BALANCES:
		case CST.AC_ADDR_POOL:
		case CST.AC_BTV_EX_PX:
		case CST.AC_BTV_ACCEPTED_PX:
		case CST.AC_BTV_CONVERSIONS:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
