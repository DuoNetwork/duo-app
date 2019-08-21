// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import IWStatusCard from './IWStatusCard';

describe('ExtendExtraDiv Test', () => {
	describe('Test Snapshot', () => {
		const locale = 'EN';
		const boundaries = [0.1, 0.1];
		const phase = 1;
		const lastPrice = 200.0;
		const settlePrice = 200.0;

		it('Test Snapshot', () => {
			const wrapper = shallow(
				<IWStatusCard
					boundaries={boundaries}
					phase={phase}
					locale={locale}
					lastPrice={lastPrice}
					settlePrice={settlePrice}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
