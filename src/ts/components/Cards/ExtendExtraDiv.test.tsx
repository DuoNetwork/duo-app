import { shallow } from 'enzyme';
import * as React from 'react';
import ExtendExtraDiv from './ExtendExtraDiv';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const accountShow = "123";
		const account = '0x0';
		const locale = 'EN';

		it('Test Snapshot', () => {
			const wrapper = shallow(<ExtendExtraDiv accountShow={accountShow} account={account} locale={locale} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
