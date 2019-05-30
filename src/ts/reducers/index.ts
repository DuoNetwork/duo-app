import { combineReducers } from 'redux';
import { dualClassReducer } from './dualClassReducer';
import { dynamoReducer } from './dynamoReducer';
import { espReducer } from './esplanadeReducer';
import { magiReducer } from './magiReducer';
import { stakeReducer } from './stakeReducer'
import { uiReducer } from './uiReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	dualClass: dualClassReducer,
	esplanade: espReducer,
	dynamo: dynamoReducer,
	magi: magiReducer,
	ui: uiReducer,
	web3: web3Reducer,
	stake: stakeReducer
});

export default reducers;
