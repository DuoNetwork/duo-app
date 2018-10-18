import * as uiActions from './uiActions';

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
