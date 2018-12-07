import { shallow } from 'enzyme';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import BalanceCard from './BalanceCard';

describe('BalanceCard Test', () => {
	describe('Test Snapshot', () => {
		const mobile = true;
		const account = '0x0';
		const locale = 'EN';
		const refreshBalance = jest.fn(() => 123);

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<BalanceCard
					type={CST.BEETHOVEN}
					tenor={CST.TENOR_PPT}
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
					type={CST.BEETHOVEN}
					tenor={CST.TENOR_PPT}
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
