import * as CST from '../common/constants';
import * as reduxTypes from '../common/reduxTypes';

export const initialState: reduxTypes.IDynamoState = {
	status: [],
	hourly: {
		bitfinex: [],
		gemini: [],
		kraken: [],
		gdax: []
	}
};

export function dynamoReducer(
	state: reduxTypes.IDynamoState = initialState,
	action: reduxTypes.Action
): reduxTypes.IDynamoState {
	switch (action.type) {
		case CST.AC_DNM_STATUS:
			return Object.assign({}, state, {
				status: (action as reduxTypes.IObjectAction).value
			});
		case CST.AC_DMN_HOURLY:
			return Object.assign({}, state, {
				hourly: (action as reduxTypes.IObjectAction).value
			});
		default:
			return state;
	}
}
