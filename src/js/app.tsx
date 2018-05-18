import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../css/style.css';
import calculator from './calculator';
import Duo from './components/Duo';
import { IRawData } from './types';

const rawData: IRawData[] = require('../static/ETH.json');

const [eth, classA, classB, reset] = calculator.getAllTimeSeriesFromEth(rawData);

ReactDOM.render(
	<Duo eth={eth} classA={classA} classB={classB} reset={reset} />,
	document.getElementById('app')
);
