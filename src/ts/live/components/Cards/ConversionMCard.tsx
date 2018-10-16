//import { Table, Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IConversion } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	conversions: IConversion[];
}

const ConversionEntry = (props: {
	timestamp: number;
	type: string;
	eth: number;
	tokenA: number;
	pending?: boolean;
	reverted?: boolean;
	locale: string;
}) => {
	const {
		timestamp,
		type,
		eth,
		tokenA,
		pending,
		reverted,
		locale
	} = props;
	return (
		<ul>
			<li>
				<span className="title">{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
				<span className="content">
					{pending
						? CST.TH_PENDING[locale]
						: reverted
							? CST.TH_REVERTED[locale]
							: CST.TH_MINED[locale]}
				</span>
			</li>
			<li>
				<span className="title">
					{type === 'Create' ? CST.TH_CREATE[locale] : CST.TH_REDEEM[locale]}
				</span>
				<span className="content">
					{type === 'Create'
						? d3.format(',.2f')(eth) +
						' ETH => ' +
						d3.format(',.2f')(tokenA) +
						' Token A/B'
						: d3.format(',.2f')(tokenA) +
						' Token A/B => ' +
						d3.format(',.2f')(eth) +
						' ETH'}
				</span>
			</li>
		</ul>
	);
};

export default class ConversionMCard extends React.PureComponent<IProps> {
	public render() {
		const { conversions, locale } = this.props;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_CONVERSION[locale].toUpperCase()}</SCardTitle>}
				width="100%"
				margin="20px 0 20px 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList noMargin>
						<div className="status-list-wrapper">
							{conversions.length ? (
								conversions.map(c => (
									<ConversionEntry
										key={c.timestamp}
										timestamp={c.timestamp}
										type={c.type}
										eth={c.eth}
										tokenA={c.tokenA}
										pending={c.pending}
										reverted={c.reverted}
										locale={locale}
									/>
								))
							) : (
								<ul>
									<li className="block-title t-center">
										{CST.TH_NODATA[locale]}
									</li>
								</ul>
							)}
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
