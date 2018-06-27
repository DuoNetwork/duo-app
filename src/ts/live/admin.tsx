import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../../css/liveStyle.css';
import * as uiActions from './actions/uiActions';
import contractUtil from './common/contractUtil';
import Admin from './containers/AdminContainer';
import store from './store/store';

store.dispatch(uiActions.refresh(true));
setInterval(() => store.dispatch(uiActions.refresh(true)), 60000);

contractUtil.onWeb3AccountUpdate((addr: string, network: number) => {
	if (
		addr.toLowerCase() !== store.getState().contract.account.toLowerCase() ||
		network !== store.getState().contract.network
	)
		store.dispatch(uiActions.refresh());
});

ReactDOM.render(
	<Provider store={store}>
		<Admin />
	</Provider>,
	document.getElementById('app')
);
