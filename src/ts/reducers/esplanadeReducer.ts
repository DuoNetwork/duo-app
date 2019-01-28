import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IEsplanadeState } from 'ts/common/types';

export const initialState: IEsplanadeState = {
	esplanadeStates: {
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
	esplanadeAddrs: {
		moderator: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		candidate: {
			address: CST.DUMMY_ADDR,
			balance: 0
		},
		poolAddrs: {
			cold: [],
			hot: [],
			custodian: [],
			otherContract: []
		}
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
				esplanadeStates: action.value
			});
		case CST.AC_ESP_POOL_ADDR:
			const { isHot, indexPool, addressPool, balancePool } = action.value;
			if (isHot)
				state.esplanadeAddrs.poolAddrs.hot[indexPool] = {
					balance: balancePool,
					address: addressPool
				};
			else
				state.esplanadeAddrs.poolAddrs.cold[indexPool] = {
					balance: balancePool,
					address: addressPool
				};
			return state;
		case CST.AC_ESP_CONTRACT_ADDR:
			const { isCustodian, indexContract, addressContract, balanceContract } = action.value;
			if (isCustodian)
				state.esplanadeAddrs.poolAddrs.custodian[indexContract] = {
					balance: balanceContract,
					address: addressContract
				};
			else
				state.esplanadeAddrs.poolAddrs.otherContract[indexContract] = {
					balance: balanceContract,
					address: addressContract
				};
			return state;
		case CST.AC_ESP_SUB:
			if (action.value)
				return Object.assign({}, state, {
					subscription: action.value
				});
			else {
				window.clearInterval(state.subscription);
				return initialState;
			}
		default:
			return state;
	}
}
