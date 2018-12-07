import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IDualClassState } from 'ts/common/types';

export const initialState: IDualClassState = {
	states: {
		lastOperationTime: 0,
		operationCoolDown: 0,
		state: CST.CTD_LOADING,
		minBalance: 0,
		totalSupplyA: 0,
		totalSupplyB: 0,
		ethCollateral: 0,
		navA: 0,
		navB: 0,
		lastPrice: 0,
		lastPriceTime: 0,
		resetPrice: 0,
		resetPriceTime: 0,
		createCommRate: 0,
		redeemCommRate: 0,
		period: 0,
		maturity: 0,
		preResetWaitingBlocks: 0,
		priceFetchCoolDown: 0,
		nextResetAddrIndex: 0,
		totalUsers: 0,
		feeBalance: 0,
		resetState: '',
		alpha: 0,
		beta: 0,
		periodCoupon: 0,
		limitPeriodic: 0,
		limitUpper: 0,
		limitLower: 0,
		iterationGasThreshold: 0
	},
	addresses: {
		operator: CST.DUMMY_ADDR,
		feeCollector: CST.DUMMY_ADDR,
		roleManager: CST.DUMMY_ADDR,
		oracle: CST.DUMMY_ADDR,
		aToken: CST.DUMMY_ADDR,
		bToken: CST.DUMMY_ADDR
	},
	exchangePrices: [],
	acceptedPrices: [],
	conversions: [],
	balances: {
		a: 0,
		b: 0
	},
	type: CST.BEETHOVEN,
	tenor: CST.TENOR_PPT,
	subscription: 0
};

export function dualClassReducer(
	state: IDualClassState = initialState,
	action: AnyAction
): IDualClassState {
	switch (action.type) {
		case CST.AC_DCC_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_DCC_ADDRESSES:
			return Object.assign({}, state, {
				addresses: action.value
			});
		case CST.AC_DCC_EX_PX:
			return Object.assign({}, state, {
				exchangePrices: action.value
			});
		case CST.AC_DCC_ACCEPTED_PX:
			return Object.assign({}, state, {
				acceptedPrices: action.value
			});
		case CST.AC_DCC_CONVERSIONS:
			return Object.assign({}, state, {
				conversions: action.value
			});
		case CST.AC_DCC_BALANCES:
			return Object.assign({}, state, {
				balances: action.value
			});
		case CST.AC_DCC_SUB:
			if (action.id)
				return Object.assign({}, state, {
					type: action.custodianType,
					tenor: action.tenor,
					subscription: action.id
				});
			else {
				window.clearInterval(state.subscription);
				return Object.assign({}, initialState, {
					type: action.custodianType,
					tenor: action.tenor
				});
			}
		default:
			return state;
	}
}
