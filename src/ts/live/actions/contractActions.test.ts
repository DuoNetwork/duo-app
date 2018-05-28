import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as contractActions from './contractActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('state', () => {
		expect(contractActions.contractStateUpdate('state')).toMatchSnapshot();
	});

	test('readContractState', () => {
		const store = mockStore({});
		contractUtil.read = jest.fn(() => Promise.resolve(1));
		store.dispatch(contractActions.readContractState() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
