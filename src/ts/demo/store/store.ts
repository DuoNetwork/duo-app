import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const middleWares: Middleware[] = [];
if (__DEV__) middleWares.push(createLogger());

const store = createStore(reducers, {}, applyMiddleware(...middleWares));

export default store;
