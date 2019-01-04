import { shallow } from 'enzyme';
import * as React from 'react';
import ConversionEntry from './ConversionEntry';

describe('ConversionEntry Test', () => {
	describe('Test Snapshot', () => {
		const timestamp = 123;
		const type = 'test';
		const eth = 123;
		const tokenACode = 'test';
		const tokenA = 123;
		const tokenBCode = 'test';
		const tokenB = 123;
		const pending = true;
		const reverted = true;
		const locale = 'test';
		it('Test Snapshot', () => {
			const wrapper = shallow(
				<ConversionEntry
					timestamp={timestamp}
					type={type}
					eth={eth}
					tokenACode={tokenACode}
					tokenA={tokenA}
					tokenBCode={tokenBCode}
					tokenB={tokenB}
					pending={pending}
					reverted={reverted}
					locale={locale}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
