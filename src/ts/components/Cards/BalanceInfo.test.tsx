import { shallow } from 'enzyme';
import * as React from 'react';
import BalanceInfo from './BalanceInfo';

describe('BalanceInfo Test', () => {
	describe('Test Snapshot', () => {
		const mobile = true;
		const icon = 'test';
		const name = '123';
		const value = 123;

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					mobile={mobile}
				/>
			);
			expect(wrapper).toMatchSnapshot();
			const wrapper1 = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					mobile={mobile}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(
				<BalanceInfo
					icon={icon}
					name={name}
					value={value}
					mobile={mobile}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
