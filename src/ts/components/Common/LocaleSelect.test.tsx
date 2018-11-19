import { shallow } from 'enzyme';
import * as React from 'react';
import { SCardTitleSelector } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import LocaleSelect from './LocaleSelect';

describe('LocaleSelect Test', () => {
	describe('User Login', () => {
		const locale = 'EN';
		const onSelect = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(<LocaleSelect onSelect={onSelect} locale={locale} />);
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find(SCardTitleSelector)
				.at(0)
				.simulate('select', {target: { value: '123'} });
			expect(wrapper).toMatchSnapshot();
		});
	});
});
