import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import ConversionMCard from './ConversionMCard';

describe('ConversionMCard Test', () => {
	describe('Test Snapshot', () => {
		const locale = 'EN';
		const conversions = [
			{
				contractAddress: '0x0',
				timestamp: 1539843443,
				transactionHash: 'test',
				blockNumber: 3,
				type: 'DUO',
				eth: 1,
				tokenA: 1,
				tokenB: 2,
				fee: 3,
				pending: true,
				reverted: true,
				refreshBalance: jest.fn(() => 123)
			}
		];
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
			const wrapper1 = shallow(
				<ConversionMCard
					contractAddress={contractAddress}
					locale={locale}
					conversions={conversions}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const conversionsNew: any = [];
			const wrapper2 = shallow(
				<ConversionMCard
					contractAddress={contractAddress}
					locale={locale}
					conversions={conversionsNew}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
