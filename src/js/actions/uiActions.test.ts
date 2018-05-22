//import configureMockStore from 'redux-mock-store';
//import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import * as uiActions from './uiActions';

//const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('refresh', () => {
		expect(uiActions.refresh()).toMatchSnapshot();
	});

	test('messsage', () => {
		expect(uiActions.messsage('type', 'content', true)).toMatchSnapshot();
	});

	test('form', () => {
		expect(uiActions.form('type', true)).toMatchSnapshot();
	});

	test('next', () => {
		expect(uiActions.next()).toMatchSnapshot();
	});

	test('trade', () => {
		expect(uiActions.trade('test', {ETH: 123, ClassA: 234, ClassB: 345})).toMatchSnapshot();
	});
});
