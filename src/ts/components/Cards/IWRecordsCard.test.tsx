// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import IWRecordsCard from './IWRecordsCard';

describe('IWRecordsCard Test', () => {
	describe('Test Snapshot', () => {
		const locale = 'EN';
		const address = '0x00';
		const currentRoundInfo = [{
			amount: 500,
			date: 1500000000000,
			status: 'mined',
			txHash: '"0x5bc480b5d001b3cc72b39a631ff5d99aa0e8b2028baafca2fb08c39cacc51dd0"'
		}]
		const addressInfo = {
			roundStakingAmount: [100, 100],
			roundReturn: [100, 100],
			settleETH: 200.00,
			date: '2019-01-01',
			boundETH: [200, 200]
		}
		const refresh = jest.fn(() => 123);

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<IWRecordsCard
					locale={locale}
					address={address}
					currentRoundInfo={currentRoundInfo}
					addressInfo={addressInfo}
					refresh={refresh}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
