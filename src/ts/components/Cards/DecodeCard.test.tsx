// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { shallow } from 'enzyme';
import * as React from 'react';
import { dualClassWrappers } from 'ts/common/wrappers';
import { SInput } from './_styled';
import DecodeCard from './DecodeCard';

describe('DecodeCard Test', () => {
	describe('Test Snapshot', () => {
		it('Test Snapshot', () => {
			const wrapper = shallow(
				<DecodeCard type={WrapperConstants.BEETHOVEN} tenor={WrapperConstants.TENOR_PPT} />
			);
			expect(wrapper).toMatchSnapshot();
		});

		it('Test SInput Input', async () => {
			dualClassWrappers[WrapperConstants.BEETHOVEN][
				WrapperConstants.TENOR_PPT
			].decode = jest.fn(() => 'decoded');
			const wrapper = shallow(
				<DecodeCard type={WrapperConstants.BEETHOVEN} tenor={WrapperConstants.TENOR_PPT} />
			);
			await wrapper
				.find(SInput)
				.at(0)
				.simulate('change', { target: { value: '123456' } });
			expect(wrapper.state('input')).toBe('123456');
			wrapper
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper.state('output')).toBe(JSON.stringify('decoded', null, 4));
		});
	});
});
