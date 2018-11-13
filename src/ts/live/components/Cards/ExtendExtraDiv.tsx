import * as React from 'react';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { SCardExtendExtraDiv } from './_styled';

interface IProps {
	accountShow: string;
	account: string;
	locale: string;
}

export default class ExtendExtraDiv extends React.Component<IProps> {
	public render() {
		const { account, accountShow, locale } = this.props;
		return (
			<SCardExtendExtraDiv
				color={accountShow === 'Unknown' ? ColorStyles.TextRedAlpha : undefined}
			>
				<div className="extend-extra-wrapper">
					<div className="tag-title">{CST.TH_ADDRESS[locale]}</div>
					<a
						className="tag-content"
						href={
							'https://' +
							(__KOVAN__ ? 'kovan.' : '') +
							'etherscan.io' +
							(account ? '/address/' + account : '')
						}
						target="_blank"
					>
						{accountShow}
					</a>
				</div>
			</SCardExtendExtraDiv>
		);
	}
}
