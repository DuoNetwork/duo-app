import { combineReducers } from 'redux';
import { contractReducer } from './contractReducer';
import { dynamoReducer } from './dynamoReducer';
import { uiReducer } from './uiReducer';
import { wsReducer } from './wsReducer';

const reducers = combineReducers({
	contract: contractReducer,
	dynamo: dynamoReducer,
	ui: uiReducer,
	ws: wsReducer,
});

export default reducers;
