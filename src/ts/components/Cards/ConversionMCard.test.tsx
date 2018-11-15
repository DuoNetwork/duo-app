import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import ConversionMCard from './ConversionMCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
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
		it('Test Snapshot', () => {
			const wrapper1 = shallow(<ConversionMCard locale={locale} conversions={conversions} />);
			expect(wrapper1).toMatchSnapshot();
			const conversionsNew: any = [];
			const wrapper2 = shallow(<ConversionMCard locale={locale} conversions={conversionsNew} />);
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
