import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IEsplanadeState } from 'ts/common/types';

export const initialState: IEsplanadeState = {
	esplanadeStates: {
		isStarted: false,
		votingStage: '',
		poolAddrsHot: [],
		poolAddrsCold: [],
		custodianContractAddrs: [],
		otherContractAddrs: [],
		operationCoolDown: 0,
		lastOperationTime: 0,
		votingData: {
			started: 0,
			votedFor: 0,
			votedAgainst: 0,
			totalVoters: 0
		}
	},
	esplanadeAddrs: {
		moderator: {
			address:  CST.DUMMY_ADDR,
			balance: 0
		},
		candidate: {
			address: CST.DUMMY_ADDR,
			balance: 0
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
		case CST.AC_ESP_ADDRS:
			return Object.assign({}, state, {
				esplanadeAddrs: action.value
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
		default:
			return state;
	}
}
