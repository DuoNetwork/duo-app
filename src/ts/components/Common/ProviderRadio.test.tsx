// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Wallet } from '@finbook/duo-contract-wrapper';
import { Radio } from 'antd';
import { shallow } from 'enzyme';
import * as React from 'react';
import { SRadioGroup } from '../Cards/_styled';
// import { IConversion } from 'ts/common/types';
import ProviderRadio from './ProviderRadio';

describe('ProviderRadio Test', () => {
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
