import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as contractActions from './actions/contractActions';
import * as dynamoActions from './actions/dynamoActions';
import Status from './containers/StatusContainer';
import store from './store/store';

store.dispatch(contractActions.getAddresses());
store.dispatch(dynamoActions.scanStatus());

ReactDOM.render(
	<Provider store={store}>
		<Status />
	</Provider>,
	document.getElementById('app')
);
