// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import { SCardTitleSelector } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import CardTitleSelect from './CardTitleSelect';

describe('CardTitleSelect Test', () => {
	describe('User Login', () => {
		const name = 'test';
		const source = 'test';
		const onlySource = true;
		const onSelect = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(
				<CardTitleSelect
					name={name}
					source={source}
					custodian={'custodian'}
					onSelect={onSelect}
					onlySource={onlySource}
				/>
			);
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find(SCardTitleSelector)
				.at(0)
				.simulate('select', { target: { value: '123' } });
			expect(wrapper).toMatchSnapshot();
		});
	});
});
