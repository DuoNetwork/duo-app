import { combineReducers } from 'redux';
import { contractReducer } from './contractReducer';
import { dynamoReducer } from './dynamoReducer';

const reducers = combineReducers({
	contract: contractReducer,
	dynamo: dynamoReducer
});

export default reducers;
