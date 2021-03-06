import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IDynamoState } from 'ts/common/types';

export const initialState: IDynamoState = {
	status: []
};

export function dynamoReducer(state: IDynamoState = initialState, action: AnyAction): IDynamoState {
	switch (action.type) {
		case CST.AC_DNM_STATUS:
			return Object.assign({}, state, {
				status: action.value
			});
		default:
			return state;
	}
}
