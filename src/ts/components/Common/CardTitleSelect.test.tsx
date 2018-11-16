import { shallow } from 'enzyme';
import * as React from 'react';
import { SCardTitleSelector } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import CardTitleSelect from './CardTitleSelect';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const name = 'test';
		const source = 'test';
		const onlySource = true;
		const onSelect = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(<CardTitleSelect name={name} source={source} onSelect={onSelect} onlySource={onlySource}/>);
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find(SCardTitleSelector)
				.at(0)
				.simulate('select', {target: { value: '123'} });
			expect(wrapper).toMatchSnapshot();
		});
	});
});
