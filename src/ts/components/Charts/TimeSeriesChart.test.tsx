import { shallow } from 'enzyme';
import * as React from 'react';
import TimeSeriesChart from './TimeSeriesChart';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const prices = [
			{
				period: 123,
				open: 123,
				high: 123,
				low: 123,
				close: 123,
				volume: 123,
				source: 'test',
				base: 'test',
				quote: 'test',
				timestamp: 123
			}
		];
		const acceptedPrices = [
			{
				price: 123,
				navA: 123,
				navB: 123,
				contractAddress: 'test',
				timestamp: 123,
				transactionHash: 'test',
				blockNumber: 123,
				sender: '0x0',
			}
		];
		const underlying = 'test';
		const tokenA = 'test';
		const tokenB = 'test';
		it('Test Snapshot', () => {
			const wrapper1 = shallow(
				<TimeSeriesChart
					prices={prices}
					acceptedPrices={acceptedPrices}
					underlying={underlying}
					tokenA={tokenA}
					tokenB={tokenB}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
		});
	});
});
