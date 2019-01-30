// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import * as uiActions from './uiActions';

describe('actions', () => {

	test('updatePeriod', () => {
		expect(uiActions.updatePeriod(123)).toMatchSnapshot();
	});

	test('SourceUpdate', () => {
		expect(uiActions.updateSource('test')).toMatchSnapshot();
	});

	test('localeUpdate', () => {
		expect(uiActions.localeUpdate('test')).toMatchSnapshot();
	});
});
