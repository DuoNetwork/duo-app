import { shallow } from 'enzyme';
import { any } from 'prop-types';
import * as React from 'react';
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
				otherContract: 0,
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
	});
});
