import { shallow } from 'enzyme';
import * as React from 'react';
import ConversionCard from './ConversionCard';

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
				ethFee: 3,
				duoFee: 4,
				pending: true,
				reverted: true,
				refreshBalance: jest.fn(() => 123)
			}
		];
		it('Test Snapshot', () => {
			const wrapper = shallow(<ConversionCard locale={locale} conversions={conversions} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
