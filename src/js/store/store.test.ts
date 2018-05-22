//import * as uiActions from '../actions/uiActions';
//import * as CST from '../common/constants';
import store from './store';

describe('store', () => {
	test('actions', () => {
		expect(store.getState()).toMatchSnapshot();
	});
});
