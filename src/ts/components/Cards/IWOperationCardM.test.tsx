// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import IWOperationCardM from './IWOperationCardM';

describe('IWOperationCard Test', () => {
	describe('Test Snapshot', () => {
		const locale = 'EN';
		const address = '0x00';
		const duoBalance = 0;
		const award = 0;
		const enableApprove = true;
		const enabled = true;
		const refresh = jest.fn(() => 123);
		const phase = 1

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<IWOperationCardM
					locale={locale}
					address={address}
					duoBalance={duoBalance}
					award={award}
					enableApprove={enableApprove}
					enabled={enabled}
					refresh={refresh}
					phase={phase}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
