// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import * as React from 'react';
import StatusCard from './StatusCard';

describe('StatusCard Test', () => {
	describe('Test Snapshot', () => {
		const status = [
			{
				process: 'test',
				timestamp: 123
			}
		];
		it('Test Snapshot', () => {
			const wrapper = shallow(<StatusCard status={status} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
