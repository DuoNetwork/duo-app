// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import BalanceCard from './BalanceCard';

describe('BalanceCard Test', () => {
	describe('Test Snapshot', () => {
		const mobile = true;
		const account = '0x0';
		const locale = 'EN';
		const refreshBalance = jest.fn(() => 123);
		const contractAddress = {
			custodian: {
				code: 'BEETHOVEN-PPT',
				address: '0x95B3BE483e9e3685Ed631e9611b8cDba4C13641E'
			},
			aToken: {
				code: 'aETH',
				address: '0xC600fe64CDa57b607B251aa0879b8386e9FEd9f7'
			},
			bToken: {
				code: 'bETH',
				address: '0xa03b5171fE58fD2d6a018693E8D2CeD83b73ce00'
			}
		};

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<BalanceCard
					contractAddress={contractAddress}
					refresh={refreshBalance}
					mobile={mobile}
					account={account}
					eth={0}
					aToken={0}
					bToken={0}
					locale={locale}
				/>
			);
			expect(wrapper).toMatchSnapshot();
			const wrapper1 = shallow(
				<BalanceCard
					contractAddress={contractAddress}
					refresh={refreshBalance}
					mobile={false}
					account={account}
					eth={0}
					aToken={0}
					bToken={0}
					locale={locale}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
		});
	});
});
