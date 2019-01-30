import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IEsplanadeState } from 'ts/common/types';

export const initialState: IEsplanadeState = {
	states: {
		isStarted: false,
		votingStage: '',
		operationCoolDown: 0,
		lastOperationTime: 0,
		poolSizes: {
			cold: 0,
			hot: 0,
			custodian: 0,
			otherContract: 0
		}
	},
	moderator: {
		address: WrapperConstants.DUMMY_ADDR,
		balance: 0
	},
	candidate: {
		address: WrapperConstants.DUMMY_ADDR,
		balance: 0
	},
	coldAddressPool: {},
	hotAddressPool: {},
	custodianPool: {},
	otherContractPool: {},
	votingData: {
		started: 0,
		votedFor: 0,
		votedAgainst: 0,
		totalVoters: 0
	},
	subscription: 0
};

export function espReducer(
	state: IEsplanadeState = initialState,
	action: AnyAction
): IEsplanadeState {
	switch (action.type) {
		case CST.AC_ESP_STATES:
			return Object.assign({}, state, {
				states: action.value
			});
		case CST.AC_ESP_CANDIDATE:
			return Object.assign({}, state, {
				candidate: {
					address: action.address,
					balance: action.balance
				}
			});
		case CST.AC_ESP_MODERATOR:
			return Object.assign({}, state, {
				moderator: {
					address: action.address,
					balance: action.balance
				}
			});
		case CST.AC_ESP_HOT_ADDR:
			return Object.assign({}, state, {
				hotAddressPool: Object.assign({}, state.hotAddressPool, {
					[action.address]: {
						balance: action.balance,
						index: action.index
					}
				})
			});
		case CST.AC_ESP_COLD_ADDR:
			return Object.assign({}, state, {
				coldAddressPool: Object.assign({}, state.coldAddressPool, {
					[action.address]: {
						balance: action.balance,
						index: action.index
					}
				})
			});
		case CST.AC_ESP_CUSTODIAN_ADDR:
			return Object.assign({}, state, {
				custodianPool: Object.assign({}, state.custodianPool, {
					[action.address]: {
						balance: action.balance,
						index: action.index
					}
				})
			});

		case CST.AC_ESP_OTHER_CONTRACT_ADDR:
			return Object.assign({}, state, {
				otherContractPool: Object.assign({}, state.otherContractPool, {
					[action.address]: {
						balance: action.balance,
						index: action.index
					}
				})
			});

		case CST.AC_ESP_SUB:
			if (action.value)
				return Object.assign({}, state, {
					subscription: action.value
				});
			else {
				window.clearInterval(state.subscription);
				return initialState;
			}
		case CST.AC_ESP_VOTING_DATA:
			return Object.assign({}, state, {
				votingData: action.value
			});
		default:
			return state;
	}
}
