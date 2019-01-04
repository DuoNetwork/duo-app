import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import * as Styled from './_styled';

describe('Styled Test', () => {
	it('CSS', () => {
		const SCard = shallow(<Styled.SMenu />);
		expect(SCard).toMatchSnapshot();

		const SCardTitle = shallow(<Styled.SItem />);
		expect(SCardTitle).toMatchSnapshot();

		const SCardTitleSelector = shallow(<Styled.SModal />);
		expect(SCardTitleSelector).toMatchSnapshot();
	});
});
