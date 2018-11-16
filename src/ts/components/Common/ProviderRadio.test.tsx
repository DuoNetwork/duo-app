import { Radio } from 'antd';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Wallet } from '../../../../../duo-contract-wrapper/src/Web3Wrapper';
import { SRadioGroup } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import ProviderRadio from './ProviderRadio';

describe('AuthCard Test', () => {
	describe('User Login', () => {

		const refresh = jest.fn();
		const RadioGroup = Radio.Group;

		it('test Snapshot', () => {
			const wrapper = shallow(<ProviderRadio refresh={refresh} />);
			expect(wrapper).toMatchSnapshot();
			wrapper.find(SRadioGroup).at(0).simulate('change', { target: { value: Wallet.MetaMask } });
			expect(wrapper).toMatchSnapshot();
			wrapper.find(SRadioGroup).at(0).simulate('change', { target: { value: Wallet.Ledger } });
			expect(wrapper).toMatchSnapshot();
			wrapper.setState({ accounts: ['test'] });
			wrapper.find(RadioGroup).at(0).simulate('change', { target: { value: '123'} });
			// wrapper.find('button').at(0).simulate('click');
			// expect(wrapper).toMatchSnapshot();
		});
	});
});
