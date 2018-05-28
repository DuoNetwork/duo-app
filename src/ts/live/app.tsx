import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import contractUtil from './common/contractUtil';
import * as contractActions from './actions/contractActions';
import Duo from './containers/DuoContainer';
import store from './store/store';

store.dispatch(contractActions.getCustodianStates());

ReactDOM.render(
	<Provider store={store}>
		<Duo />
	</Provider>,
	document.getElementById('app')
);
