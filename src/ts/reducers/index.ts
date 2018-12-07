import { combineReducers } from 'redux';
import { dualClassReducer } from './dualClassReducer';
import { dynamoReducer } from './dynamoReducer';
import { magiReducer } from './magiReducer';
import { uiReducer } from './uiReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	dualClass: dualClassReducer,
	dynamo: dynamoReducer,
	magi: magiReducer,
	ui: uiReducer,
	web3: web3Reducer
});

export default reducers;
