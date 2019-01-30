// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { shallow } from 'enzyme';
import * as React from 'react';
import { dualClassWrappers } from 'ts/common/wrappers';
import { SInput } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import AdminInputButton from './AdminInputButton';

describe('AdminInputButton Test', () => {
	describe('User Login', () => {
		const account = 'test';
		// const type = 'test';
		const disabled = true;
		const index = 12;
		const validateInput = jest.fn();
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].setValue = jest.fn(() => Promise.resolve());
		dualClassWrappers[WrapperConstants.BEETHOVEN][
			WrapperConstants.TENOR_PPT
		].collectFee = jest.fn(() => Promise.resolve());

		it('test Snapshot', () => {
			const wrapper = shallow(
				<AdminInputButton
					custodianType={WrapperConstants.BEETHOVEN}
					tenor={WrapperConstants.TENOR_PPT}
					account={account}
					type={'Add Address'}
					disabled={disabled}
					index={index}
					validateInput={validateInput}
				/>
			);
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find(SInput)
				.at(0)
				.simulate('change', { target: { value: '123' } });
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find(SInput)
				.at(1)
				.simulate('change', { target: { value: '123' } });
			expect(wrapper).toMatchSnapshot();
			wrapper
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper).toMatchSnapshot();
		});
		it('change type for test click 1', () => {
			const wrapper1 = shallow(
				<AdminInputButton
					custodianType={WrapperConstants.BEETHOVEN}
					tenor={WrapperConstants.TENOR_PPT}
					account={account}
					type={'Collect Fee'}
					disabled={disabled}
					index={index}
					validateInput={validateInput}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			wrapper1
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper1).toMatchSnapshot();
			wrapper1.setState({ valueError: 'test' });
			wrapper1
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper1).toMatchSnapshot();
		});
		it('change type for test click 2', () => {
			const wrapper2 = shallow(
				<AdminInputButton
					custodianType={WrapperConstants.BEETHOVEN}
					tenor={WrapperConstants.TENOR_PPT}
					account={account}
					type={'Set Value'}
					disabled={disabled}
					index={index}
					validateInput={validateInput}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
			wrapper2
				.find('button')
				.at(0)
				.simulate('click');
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
