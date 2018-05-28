//import * as CST from '../common/constants';
import * as contractActions from '../actions/contractActions';
import contractUtil from '../common/contractUtil';
import store from './store';

describe('store', () => {
	test('actions', () => {
		contractUtil.read = jest.fn(() => Promise.resolve(1));
		store.dispatch(contractActions.readContractState());
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getState()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
