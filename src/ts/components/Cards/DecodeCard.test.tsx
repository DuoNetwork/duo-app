import { shallow } from 'enzyme';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { beethovenWappers } from 'ts/common/wrappers';
import { SInput } from './_styled';
import DecodeCard from './DecodeCard';

describe('DecodeCard Test', () => {
	describe('Test Snapshot', () => {
		it('Test Snapshot', () => {
			const wrapper = shallow(<DecodeCard tenor={CST.TENOR_PPT} />);
			expect(wrapper).toMatchSnapshot();
		});

		it('Test SInput Input', async () => {
			beethovenWappers.Perpetual.decode = jest.fn(() => 'decoded');
			const wrapper = shallow(<DecodeCard tenor={CST.TENOR_PPT}/>);
			await wrapper
				.find(SInput)
				.at(0)
				.simulate('change', { target: { value: '123456' } });
			expect(wrapper.state('input')).toBe('123456');
			wrapper
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper.state('output')).toBe(JSON.stringify('decoded', null, 4));
		});
	});
});
