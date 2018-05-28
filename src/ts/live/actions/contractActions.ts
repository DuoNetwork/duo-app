import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as reduxTypes from '../common/reduxTypes';

export function contractStateUpdate(state: string): reduxTypes.Action {
	return {
		type: CST.AC_CT_STATE,
		value: state
	};
}

export function readContractState(): reduxTypes.ThunkAction {
	return async dispatch => {
		const state = await contractUtil.read(CST.CT_STATE);
		let stateString = '';
		switch (state) {
			case '0':
				stateString = 'Inception';
				break;
			case '1':
				stateString = 'Trading';
				break;
			case '2':
				stateString = 'PreReset';
				break;
			case '3':
				stateString = 'UpwardReset';
				break;
			case '4':
				stateString = 'DownwardReset';
				break;
			case '5':
				stateString = 'PeriodicReset';
				break;
			default:
				stateString = 'Unknown';
				break;
		}
		dispatch(contractStateUpdate(stateString));
	};
}
