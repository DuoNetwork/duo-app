// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import 'css/style.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as dualClassActions from './actions/dualClassActions';
import * as dynamoActions from './actions/dynamoActions';
import * as web3Actions from './actions/web3Actions';
import { web3Wrapper } from './common/wrappers';
import InlineWarrantM from './containers/Pages/InlineWarrantMobileContainer';
import StakingM from './containers/Pages/StakingMobileContainer';
import store from './store/store';

store.dispatch(web3Actions.refresh());
store.dispatch(dynamoActions.scanStatus());

setInterval(() => {
	store.dispatch(web3Actions.refresh());
	store.dispatch(dynamoActions.scanStatus());
}, 60000);

web3Wrapper.onWeb3AccountUpdate((addr: string, network: number) => {
	if (
		addr.toLowerCase() !== store.getState().web3.account.toLowerCase() ||
		network !== store.getState().web3.network
	) {
		store.dispatch(web3Actions.accountUpdate(addr));
		store.dispatch(web3Actions.networkUpdate(network));
		store.dispatch(dualClassActions.refresh(true));
	}
});
if ((window as any).ethereum) (window as any).ethereum.enable();
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route
					path={'/flex'}
					component={(props: any) => <StakingM {...props} contractIndex={0} />}
				/>
				<Route component={() => <InlineWarrantM />} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('app')
);
