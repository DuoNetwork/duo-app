import { AnyAction } from 'redux';
import * as CST from '../common/constants';
import { IWeb3State } from '../common/types';

export const initialState: IWeb3State = {
	account: CST.DUMMY_ADDR,
	network: 0,
	gasPrice: 0
};

export function web3Reducer(state: IWeb3State = initialState, action: AnyAction): IWeb3State {
	switch (action.type) {
		case CST.AC_ACCOUNT:
		case CST.AC_NETWORK:
		case CST.AC_GAS_PX:
			return Object.assign({}, state, {
				[action.type]: action.value
			});
		default:
			return state;
	}
}
