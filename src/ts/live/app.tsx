import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import contractUtil from './common/contractUtil';
import '../../css/liveStyle.css';
import * as uiActions from './actions/uiActions';
import Duo from './containers/DuoContainer';
import store from './store/store';

store.dispatch(uiActions.refresh() as any);
setInterval(() => store.dispatch(uiActions.refresh() as any), 60000);

ReactDOM.render(
	<Provider store={store}>
		<Duo />
	</Provider>,
	document.getElementById('app')
);
