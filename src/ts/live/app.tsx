import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../css/liveStyle.css';
import '../../static/GettingStarted.pdf';
import '../../static/GettingStarted_CN.pdf';
import '../../static/GettingStarted_JP.pdf';
import * as contractActions from './actions/contractActions';
import * as dynamoActions from './actions/dynamoActions';
import * as uiActions from './actions/uiActions';
import contractUtil from './common/contractUtil';
import Duo from './containers/DuoContainer';
import store from './store/store';

store.dispatch(contractActions.getCustodianStates());
store.dispatch(contractActions.getAllBalances(0, 20));
store.dispatch(uiActions.refresh());
store.dispatch(contractActions.getNetwork());
store.dispatch(dynamoActions.scanStatus());

setInterval(() => {
	store.dispatch(uiActions.refresh());
	store.dispatch(contractActions.getNetwork());
	store.dispatch(dynamoActions.scanStatus());
}, 60000);

contractUtil.onWeb3AccountUpdate((addr: string, network: number) => {
	if (
		addr.toLowerCase() !== store.getState().contract.account.toLowerCase() ||
		network !== store.getState().contract.network
	)
		store.dispatch(uiActions.refresh());
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Duo />
		</Router>
	</Provider>,
	document.getElementById('app')
);
