import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';

const reducers = combineReducers({
	ui: uiReducer
});

export default reducers;
