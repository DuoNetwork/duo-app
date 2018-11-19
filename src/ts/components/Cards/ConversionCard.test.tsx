// import { Table } from 'antd';
import { shallow } from 'enzyme';
import * as React from 'react';
import ConversionCard from './ConversionCard';

// const { Column } = Table;

describe('ConversionCard Test', () => {
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
		it('Test Snapshot', () => {
			const wrapper = shallow(<ConversionCard locale={locale} conversions={conversions} />);
			expect(wrapper).toMatchSnapshot();
			// wrapper
			// 	.find(Column)
			// 	.at(1)
			// 	.simulate('filter', { target: { value: 'test', record: { test: 'test' }}});
			// expect(wrapper).toMatchSnapshot();
		});
	});
});
