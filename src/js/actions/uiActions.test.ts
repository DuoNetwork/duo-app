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

	test('messsage', () => {
		expect(uiActions.messsage('type', 'content', true)).toMatchSnapshot();
	});

	test('form', () => {
		expect(uiActions.form('type', true)).toMatchSnapshot();
	});

	test('mv', () => {
		expect(uiActions.addMV({datetime: 1234, value: 4321})).toMatchSnapshot();
	});

	test('updateAssets', () => {
		expect(uiActions.updateAssets({ETH: 123, ClassA: 234, ClassB: 345})).toMatchSnapshot();
	});

	test('updateResetPrice', () => {
		expect(uiActions.updateResetPrice(123)).toMatchSnapshot();
	});

	test('updateBeta', () => {
		expect(uiActions.updateBeta(123)).toMatchSnapshot();
	});

	test('updateDayCount', () => {
		expect(uiActions.updateDayCount(123)).toMatchSnapshot();
	});

	test('updateUpwardResetCount', () => {
		expect(uiActions.updateUpwardResetCount(123)).toMatchSnapshot();
	});

	test('updateDownwardResetCount', () => {
		expect(uiActions.updateDownwardResetCount(123)).toMatchSnapshot();
	});

	test('updateBeta', () => {
		expect(uiActions.updatePeriodicResetCount(123)).toMatchSnapshot();
	});
});
