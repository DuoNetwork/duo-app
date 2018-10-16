import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';
import '../../css/liveStyle.css';
import '../../static/GettingStarted.pdf';
import '../../static/GettingStarted_CN.pdf';
import '../../static/GettingStarted_JP.pdf';
import * as contractActions from './actions/contractActions';
import * as dynamoActions from './actions/dynamoActions';
import * as uiActions from './actions/uiActions';
import * as wsActions from './actions/wsActions';
import * as CST from './common/constants';
import contract from './common/contract';
import wsUtil from './common/wsUtil';
import Duo from './containers/DuoContainer';
import store from './store/store';

const config = require(`../keys/aws.ui.${__KOVAN__ ? 'dev' : 'live'}.json`);
dynamoUtil.init(config, !__KOVAN__, '', contract);

store.dispatch(contractActions.getCustodianStates());
store.dispatch(contractActions.getAllBalances(0, 20));
store.dispatch(uiActions.refresh());
store.dispatch(contractActions.getNetwork());
store.dispatch(dynamoActions.scanStatus());
wsUtil.init(CST.RELAYER_WS_URL);
wsUtil.onOrderBooks(orderBooks => store.dispatch(wsActions.orderBooksUpdate(orderBooks)));

setInterval(() => {
	store.dispatch(uiActions.refresh());
	store.dispatch(contractActions.getNetwork());
	store.dispatch(dynamoActions.scanStatus());
}, 60000);

contract.onWeb3AccountUpdate((addr: string, network: number) => {
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
