import { shallow } from 'enzyme';
import * as React from 'react';
import BalanceCard from './BalanceCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const mobile = true;
		const account = '0x0';
		const balances = { eth: 0, duo: 0, allowance: 0, tokenA: 0, tokenB: 0 };
		const locale = 'EN';
		const refreshBalance = jest.fn(() => 123);

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<BalanceCard
					refreshBalance={refreshBalance}
					mobile={mobile}
					account={account}
					balances={balances}
					locale={locale}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
