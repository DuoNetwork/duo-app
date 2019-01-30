// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import VotingCard from './VotingCard';

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
		const coldAddressPool = {
			address0: {
				balance: 10,
				index: 0
			},
			address1: {
				balance: 20,
				index: 1
			},
			address2: {
				balance: 30,
				index: 2
			}
		};
		const votingData = {
			started: 0,
			votedFor: 1,
			votedAgainst: 2,
			totalVoters: 10
		}

		it('Test Snapshot', () => {
			const wrapper1 = shallow(
				<VotingCard
					account={'0x0'}
					coldAddressPool={coldAddressPool}
					states={states}
					locale={'EN'}
					votingData={votingData}
					moderator={'moderator'}
					candidate={'candidate'}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(
				<VotingCard
					account={'moderator'}
					coldAddressPool={coldAddressPool}
					states={states}
					locale={'EN'}
					votingData={votingData}
					moderator={'moderator'}
					candidate={'candidate'}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
