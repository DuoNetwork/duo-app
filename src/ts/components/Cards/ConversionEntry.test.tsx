import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import ConversionEntry from './ConversionEntry';

describe('ConversionEntry Test', () => {
	describe('Test Snapshot', () => {
		const timestamp = 1539843443;
		const type = 'DUO';
		const eth = 1;
		const tokenA = 1;
		const tokenB = 1;
		const pending = true;
		const reverted = true;
		const locale = 'EN';

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<ConversionEntry
					locale={locale}
					timestamp={timestamp}
					type={type}
					eth={eth}
					tokenA={tokenA}
					tokenACode={'tokenA'}
					tokenB={tokenB}
					tokenBCode={'tokenB'}
					pending={pending}
					reverted={reverted}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
