import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import * as Styled from './_styled';

describe('Styled Test', () => {
	it('CSS', () => {
		const SCard = shallow(<Styled.SHeader />);
		expect(SCard).toMatchSnapshot();

		const SCardTitle = shallow(<Styled.SContent />);
		expect(SCardTitle).toMatchSnapshot();

		const SCardTitleSelector = shallow(<Styled.SDivFlexCenter />);
		expect(SCardTitleSelector).toMatchSnapshot();
	});
});
