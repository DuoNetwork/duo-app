import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import dynamoUtil from '../../../../duo-admin/src/utils/dynamoUtil';
import '../../css/liveStyle.css';
import '../../static/GettingStarted.pdf';
import '../../static/GettingStarted_CN.pdf';
import '../../static/GettingStarted_JP.pdf';
import * as beethovanActions from './actions/beethovanActions';
import * as dynamoActions from './actions/dynamoActions';
import * as web3Actions from './actions/web3Actions';
import contract from './common/contract';
import Duo from './containers/DuoContainer';
import store from './store/store';

const config = require(`../keys/aws.ui.${__KOVAN__ ? 'dev' : 'live'}.json`);
dynamoUtil.init(config, !__KOVAN__, '', contract);

store.dispatch(web3Actions.refresh());
store.dispatch(dynamoActions.scanStatus());

setInterval(() => {
	store.dispatch(web3Actions.refresh());
	store.dispatch(beethovanActions.refresh());
	store.dispatch(dynamoActions.scanStatus());
}, 60000);

contract.onWeb3AccountUpdate((addr: string, network: number) => {
	if (
		addr.toLowerCase() !== store.getState().web3.account.toLowerCase() ||
		network !== store.getState().web3.network
	) {
		store.dispatch(web3Actions.accountUpdate(addr));
		store.dispatch(web3Actions.networkUpdate(network));
		store.dispatch(beethovanActions.refresh());
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Duo />
		</Router>
	</Provider>,
	document.getElementById('app')
);
