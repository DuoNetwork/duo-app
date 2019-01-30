import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IWeb3State } from 'ts/common/types';

export const initialState: IWeb3State = {
	account: WrapperConstants.DUMMY_ADDR,
	network: 0,
	gasPrice: 0,
	balance: 0
};

export function web3Reducer(state: IWeb3State = initialState, action: AnyAction): IWeb3State {
	switch (action.type) {
		case CST.AC_WEB3_ACCOUNT:
			return Object.assign({}, state, {
				account: action.value
			});
		case CST.AC_WEB3_NETWORK:
			return Object.assign({}, state, {
				network: action.value
			});
		case CST.AC_WEB3_GAS_PX:
			return Object.assign({}, state, {
				gasPrice: action.value
			});
		case CST.AC_WEB3_BALACE:
			return Object.assign({}, state, {
				balance: action.value
			});
		default:
			return state;
	}
}
