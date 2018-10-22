import { combineReducers } from 'redux';
import { beethovanReducer } from './beethovanReducer';
import { dynamoReducer } from './dynamoReducer';
import { uiReducer } from './uiReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	beethovan: beethovanReducer,
	dynamo: dynamoReducer,
	ui: uiReducer,
	web3: web3Reducer
});

export default reducers;
