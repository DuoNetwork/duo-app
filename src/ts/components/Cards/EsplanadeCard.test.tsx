// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import { any } from 'prop-types';
import * as React from 'react';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SInput } from './_styled';
import EsplanadeCard from './EsplanadeCard';

describe('EsplanadeCard Test', () => {
	describe('EsplanadeCard', () => {
		const states = {
			isStarted: false,
			votingStage: 'NotStarted',
			poolSizes: {
				cold: 0,
				hot: 0,
				custodian: 0,
				otherContract: 0
			},
			operationCoolDown: 0,
			lastOperationTime: 0
		};
		const refresh = () => any;

		it('Test Snapshot', () => {
			const wrapper1 = shallow(
				<EsplanadeCard
					states={states}
					locale={'EN'}
					account={'0x0'}
					refresh={refresh}
					moderator={'moderator'}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(
				<EsplanadeCard
					states={states}
					locale={'EN'}
					account={'moderator'}
					refresh={refresh}
					moderator={'moderator'}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
		});

		it('Test SInput Input', async () => {
			const wrapper1 = shallow(
				<EsplanadeCard
					states={states}
					locale={'EN'}
					account={'0x0'}
					refresh={refresh}
					moderator={'moderator'}
				/>
			);
			esplanadeWrapper.addAddress = jest.fn();
			await wrapper1
				.find(SInput)
				.at(0)
				.simulate('change', { target: { value: 'firstAddress' } });
			expect(wrapper1.state('firstAddressToAdd')).toBe('firstAddress');
			expect(wrapper1.state('firstAddressToAddErr')).toBe('Invalid Address');
			await wrapper1
				.find('button')
				.at(0)
				.simulate('click');
			expect(esplanadeWrapper.addAddress as jest.Mock).not.toBeCalled();

			await wrapper1
				.find(SInput)
				.at(1)
				.simulate('change', { target: { value: 'secondAddress' } });
			expect(wrapper1.state('secondAddressToAdd')).toBe('secondAddress');
			expect(wrapper1.state('secondAddressToAddErr')).toBe('Invalid Address');
			await wrapper1
				.find('button')
				.at(1)
				.simulate('click');
			expect(esplanadeWrapper.addAddress as jest.Mock).not.toBeCalled();

			await wrapper1
				.find(SInput)
				.at(2)
				.simulate('change', { target: { value: 'custodianAddress' } });
			expect(wrapper1.state('custodianAddress')).toBe('custodianAddress');
			expect(wrapper1.state('custodianAddressErr')).toBe('Invalid Address');
			(wrapper1 as any).handleAddCustodian = jest.fn();
			await wrapper1
				.find('button')
				.at(2)
				.simulate('click');
			expect((wrapper1 as any).handleAddCustodian as jest.Mock).not.toBeCalled();

			await wrapper1
				.find(SInput)
				.at(3)
				.simulate('change', { target: { value: 'otherContractAddress' } });
			expect(wrapper1.state('otherContractAddress')).toBe('otherContractAddress');
			expect(wrapper1.state('otherContractAddressErr')).toBe('Invalid Address');
			(wrapper1 as any).handleAddOtherContract = jest.fn();
			await wrapper1
				.find('button')
				.at(3)
				.simulate('click');
			expect((wrapper1 as any).handleAddOtherContract as jest.Mock).not.toBeCalled();
		});
	});
});
