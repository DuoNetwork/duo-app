import * as React from 'react';
import * as ReactDOM from 'react-dom';
import contractUtil from './common/contractUtil';
import Duo from './components/Duo';

ReactDOM.render(<Duo state={'loading'} />, document.getElementById('app'));

contractUtil
	.read('state')
	.then(state => ReactDOM.render(<Duo state={state} />, document.getElementById('app')));
