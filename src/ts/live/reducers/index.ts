import { combineReducers } from 'redux';
import { contractReducer } from './contractReducer';
import { dynamoReducer } from './dynamoReducer';
import { uiReducer } from './uiReducer';

const reducers = combineReducers({
	contract: contractReducer,
	dynamo: dynamoReducer,
	ui: uiReducer,
});

export default reducers;
