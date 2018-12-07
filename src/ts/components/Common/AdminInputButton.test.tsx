import { shallow } from 'enzyme';
import * as React from 'react';
import * as CST from 'ts/common/constants';
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

		it('test Snapshot', () => {
			const wrapper = shallow(
				<AdminInputButton
					custodianType={CST.BEETHOVEN}
					tenor={CST.TENOR_PPT}
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
					custodianType={CST.BEETHOVEN}
					tenor={CST.TENOR_PPT}
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
					custodianType={CST.BEETHOVEN}
					tenor={CST.TENOR_PPT}
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
