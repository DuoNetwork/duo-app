// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import * as Styled from './_styled';

describe('Styled Test', () => {
	it('CSS', () => {
		const SCard = shallow(<Styled.SCard />);
		expect(SCard).toMatchSnapshot();

		const SCardTitle = shallow(<Styled.SCardTitle />);
		expect(SCardTitle).toMatchSnapshot();

		const SCardTitleSelector = shallow(<Styled.SCardTitleSelector />);
		expect(SCardTitleSelector).toMatchSnapshot();

		const SCardPriceTag = shallow(<Styled.SCardPriceTag />);
		expect(SCardPriceTag).toMatchSnapshot();

		const SCardAssetTag = shallow(<Styled.SCardAssetTag />);
		expect(SCardAssetTag).toMatchSnapshot();

		const SCardExtraDiv = shallow(<Styled.SCardExtraDiv />);
		expect(SCardExtraDiv).toMatchSnapshot();

		const SCardExtraDivSolid = shallow(<Styled.SCardExtraDivSolid />);
		expect(SCardExtraDivSolid).toMatchSnapshot();

		const SCardExtendExtraDiv = shallow(<Styled.SCardExtendExtraDiv />);
		expect(SCardExtendExtraDiv).toMatchSnapshot();

		const SCardRadioExtraDiv = shallow(<Styled.SCardRadioExtraDiv />);
		expect(SCardRadioExtraDiv).toMatchSnapshot();

		const SRadioGroup = shallow(<Styled.SRadioGroup />);
		expect(SRadioGroup).toMatchSnapshot();

		const SCardList = shallow(<Styled.SCardList />);
		expect(SCardList).toMatchSnapshot();

		const SCardListProgressBar = shallow(<Styled.SCardListProgressBar index={10} total={10} />);
		expect(SCardListProgressBar).toMatchSnapshot();

		const SCardConversionForm = shallow(<Styled.SCardConversionForm />);
		expect(SCardConversionForm).toMatchSnapshot();

		const SCardTransactionForm = shallow(<Styled.SCardTransactionForm />);
		expect(SCardTransactionForm).toMatchSnapshot();

		const SInput = shallow(<Styled.SInput />);
		expect(SInput).toMatchSnapshot();

		const STableWrapper = shallow(<Styled.STableWrapper />);
		expect(STableWrapper).toMatchSnapshot();

		const SRefreshButton = shallow(<Styled.SRefreshButton />);
		expect(SRefreshButton).toMatchSnapshot();
	});
});
