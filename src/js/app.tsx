import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../css/style.css';
import Duo from './containers/DuoContainer';
import store from './store/store';

ReactDOM.render(
	<Provider store={store}>
		<Duo />
	</Provider>,
	document.getElementById('app')
);
