import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../css/liveStyle.css';
import * as contractActions from './actions/contractActions';
// import * as dynamoActions from './actions/dynamoActions';
import User from './containers/UserContainer';
import store from './store/store';

store.dispatch(contractActions.getCustodianStates());
store.dispatch(contractActions.getAllBalances(0, 20));
// store.dispatch(dynamoActions.scanStatus());

ReactDOM.render(
	<Provider store={store}>
		<User />
	</Provider>,
	document.getElementById('app')
);
