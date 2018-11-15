import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import ProviderRadio from './ProviderRadio';

describe('AuthCard Test', () => {
	describe('User Login', () => {

		const refresh = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(<ProviderRadio refresh={refresh} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
