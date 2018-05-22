//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import * as uiActions from './uiActions';

//const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('refresh', () => {
		expect(uiActions.refresh()).toMatchSnapshot();
	});

	test('addHistory', () => {
		expect(uiActions.addHistory('test')).toMatchSnapshot();
	});
});
