import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let middleWares = [thunk];
if (__DEV__) middleWares.push(createLogger());

const store = createStore(reducers, {}, applyMiddleware(...middleWares));

export default store;
