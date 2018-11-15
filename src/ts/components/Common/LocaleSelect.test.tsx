import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import LocaleSelect from './LocaleSelect';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const locale = 'EN';
		const onSelect = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(<LocaleSelect onSelect={onSelect} locale={locale} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
