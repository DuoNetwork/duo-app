import { combineReducers } from 'redux';
import { beethovenReducer } from './beethovenReducer';
import { dynamoReducer } from './dynamoReducer';
import { uiReducer } from './uiReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	beethoven: beethovenReducer,
	dynamo: dynamoReducer,
	ui: uiReducer,
	web3: web3Reducer
});

export default reducers;
