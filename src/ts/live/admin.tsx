import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as contractActions from './actions/contractActions';
// import * as dynamoActions from './actions/dynamoActions';
import Admin from './containers/AdminContainer';
import store from './store/store';

store.dispatch(contractActions.getAllBalances());
// store.dispatch(dynamoActions.scanStatus());

ReactDOM.render(
	<Provider store={store}>
		<Admin />
	</Provider>,
	document.getElementById('app')
);
