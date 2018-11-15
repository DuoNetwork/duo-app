import { shallow } from 'enzyme';
import * as React from 'react';
import * as CST from 'ts/common/constants';
// import { IConversion } from 'ts/common/types';
import AdminInputButton from './AdminInputButton';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const account = 'test';
		const type = 'test';
		const disabled = true;
		const index = 12;
		const validateInput = jest.fn();

		it('test Snapshot', () => {
			const wrapper = shallow(
				<AdminInputButton
					tenor={CST.TH_PERPETUAL}
					account={account}
					type={type}
					disabled={disabled}
					index={index}
					validateInput={validateInput}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
