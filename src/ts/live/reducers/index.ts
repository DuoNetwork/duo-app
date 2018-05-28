import { combineReducers } from 'redux';
import { contractReducer } from './contractReducer';

const reducers = combineReducers({
	contract: contractReducer
});

export default reducers;
