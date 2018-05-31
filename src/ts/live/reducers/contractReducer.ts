import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';

export const initialState: reduxTypes.IContractState = {
	custodianStates: {
		state: 'Unknown',
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
		addrPoolLength: 0
	},
	custodianPrices: {
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
		admin: '0x0',
		feeCollector: '0x0',
		priceFeed1: '0x0',
		priceFeed2: '0x0',
		priceFeed3: '0x0',
		poolManager: '0x0'
	}
};

export function contractReducer(
	state: reduxTypes.IContractState = initialState,
	action: reduxTypes.Action
): reduxTypes.IContractState {
	switch (action.type) {
		case CST.AC_CTD_STATES:
		case CST.AC_CTD_PRICES:
		case CST.AC_BALANCES:
		case CST.AC_ADDRESSES:
			return Object.assign({}, state, {
				[action.type]: (action as reduxTypes.IObjectAction).value
			});
		default:
			return state;
	}
}
