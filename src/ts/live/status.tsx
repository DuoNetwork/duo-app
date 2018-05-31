import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import contractUtil from './common/contractUtil';
import * as contractActions from './actions/contractActions';
import Status from './containers/StatusContainer';
import store from './store/store';

store.dispatch(contractActions.getAddresses());

ReactDOM.render(
	<Provider store={store}>
		<Status />
	</Provider>,
	document.getElementById('app')
);
