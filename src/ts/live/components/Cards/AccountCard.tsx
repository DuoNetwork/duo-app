// import * as d3 from 'd3';
// import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { SDivFlexCenter } from '../_styled';
// import { IConversion } from '../../common/types';
import { SCard, SCardTitle } from './_styled';

interface IProps {
	account: string;
	refresh: () => any;
}

export default class ConversionCard extends React.PureComponent<IProps> {
	public render() {
		const { refresh } = this.props;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_ACCOUNT.toUpperCase()}</SCardTitle>}
				width="740px"
				margin="0 10px 20px 0"
			>
				<SDivFlexCenter>
				<button
					className="form-button"
					onClick={() => {
						contractUtil.switchToMetaMask();
						refresh();
					}}
				>
					MetaMask
				</button>
				<button
					className="form-button"
					onClick={() => {
						contractUtil.switchToLedger();
						refresh();
					}}
				>
					Ledger
				</button>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
