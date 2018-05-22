import * as CST from '../common/constants';
import { Action, IStringAction, IUIState  } from '../common/reduxTypes';

export const initialState: IUIState = {
	history: []
};

export function uiReducer(state: IUIState = initialState, action: Action): IUIState {
	switch (action.type) {
		case CST.AC_REFRESH:
			return initialState;
		case CST.AC_HISTORY:
			return Object.assign({}, state, {
				history: [...state.history, (action as IStringAction).value]
			});
		default:
			return state;
	}
}
