import * as CST from '../common/constants';
import { initialState, uiReducer } from './uiReducer';

describe('ui reducer', () => {
	let state = initialState;

	test('default', () => {
		state = uiReducer(state, { type: 'any' });
		expect(state).toMatchSnapshot();
	});

	test('addHistory', () => {
		state = uiReducer(state, {
			type: CST.AC_HISTORY,
			value: 'test'
		});
		expect(state).toMatchSnapshot();
	});

	test('message', () => {
		state = uiReducer(state, {
			type: CST.AC_MESSAGE,
			value: {
				type: 'type',
				content: 'content',
				visible: true
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('form', () => {
		state = uiReducer(state, {
			type: CST.AC_FORM,
			value: {
				type: 'type',
				visible: true
			}
		});
		expect(state).toMatchSnapshot();
	});

	test('reset', () => {
		state = uiReducer(state, {
			type: CST.AC_REFRESH
		});
		expect(state).toMatchSnapshot();
	});
});
