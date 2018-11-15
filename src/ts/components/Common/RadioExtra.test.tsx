import { shallow } from 'enzyme';
import * as React from 'react';
// import { IConversion } from 'ts/common/types';
import RadioExtra from './RadioExtra';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const text = 'test';
		const onChange = jest.fn();
		const left = 'test';
		const right = 'test';
		const isLeft = true;
		const rightPadding = true;

		it('Test Snapshot', () => {
			const wrapper1 = shallow(<RadioExtra text={text} onChange={onChange} left={left} right={right} isLeft={isLeft} rightPadding={rightPadding} />);
			expect(wrapper1).toMatchSnapshot();
		});
	});
});
