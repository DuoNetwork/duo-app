import { shallow } from 'enzyme';
import * as React from 'react';
import contract from '../../common/contract';
import { SInput } from './_styled';
import DecodeCard from './DecodeCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		it('Test Snapshot', () => {
			const wrapper = shallow(<DecodeCard />);
			expect(wrapper).toMatchSnapshot();
		});

		it('Test SInput Input', async () => {
			const wrapper = shallow(<DecodeCard />);
			await wrapper
				.find(SInput)
				.at(0)
				.simulate('change', { target: { value: '123456' } });
			expect(wrapper.state('input')).toBe('123456');
			wrapper
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper.state('output')).toBe(JSON.stringify(contract.decode('123456'), null, 4));
		});
	});
});
