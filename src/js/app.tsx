import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../css/style.css';
import calculator from './common/calculator';
import { IRawData } from './common/types';
import Duo from './containers/DuoContainer';
import store from './store/store';

const rawData: IRawData[] = require('../static/ETH.json');

const [eth, classA, classB, reset] = calculator.getAllTimeSeriesFromEth(rawData);

ReactDOM.render(
	<Provider store={store}>
		<Duo eth={eth} classA={classA} classB={classB} reset={reset} />
	</Provider>,
	document.getElementById('app')
);
