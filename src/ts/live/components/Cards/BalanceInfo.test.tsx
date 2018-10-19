import { shallow } from 'enzyme';
import * as React from 'react';
import { SRefreshButton } from './_styled';
import BalanceInfo from './BalanceInfo';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const mobile = true;
		const account = '0x0';
		const locale = 'EN';
		const icon = 'test';
		const name = '123';
		const value = 123;
		const allowance = 234;

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					allowance={allowance}
					mobile={mobile}
					account={account}
					locale={locale}
				/>
			);
			expect(wrapper).toMatchSnapshot();
			const wrapper1 = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					allowance={undefined}
					mobile={mobile}
					account={account}
					locale={locale}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					allowance={undefined}
					mobile={mobile}
					account={account}
					// locale={locale}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
			wrapper
				.find(SRefreshButton)
				.at(0)
				.simulate('click');
			expect(wrapper).toMatchSnapshot();
		});
	});
});
