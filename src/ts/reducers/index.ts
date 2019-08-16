import { combineReducers } from 'redux';
import { dualClassReducer } from './dualClassReducer';
import { dynamoReducer } from './dynamoReducer';
import { espReducer } from './esplanadeReducer';
import { inlineWarrentReducer } from './inlineWarrentReducer';
import { magiReducer } from './magiReducer';
import { stakeReducer } from './stakeReducer';
import { stakeV2Reducer } from './stakeV2Reducer';
import { uiReducer } from './uiReducer';
import { web3Reducer } from './web3Reducer';

const reducers = combineReducers({
	dualClass: dualClassReducer,
	esplanade: espReducer,
	dynamo: dynamoReducer,
	magi: magiReducer,
	ui: uiReducer,
	web3: web3Reducer,
	stake: stakeReducer,
	stakeV2: stakeV2Reducer,
	inlineWarrent: inlineWarrentReducer
});

export default reducers;
