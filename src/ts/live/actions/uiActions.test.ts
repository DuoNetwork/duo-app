// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
// import chartUtil from '../common/chartUtil';
// import * as CST from '../common/constants';
// import contract from '../common/contract';
import * as uiActions from './uiActions';

// const mockStore = configureMockStore([thunk]);

describe('actions', () => {

	test('updatePeriod', () => {
		expect(uiActions.updatePeriod(123)).toMatchSnapshot();
	});

	test('refreshUpdate', () => {
		expect(uiActions.refreshUpdate()).toMatchSnapshot();
	});

	test('SourceUpdate', () => {
		expect(uiActions.updateSource('test')).toMatchSnapshot();
	});

	test('localeUpdate', () => {
		expect(uiActions.localeUpdate('test')).toMatchSnapshot();
	});
});
