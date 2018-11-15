//import { Table, Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';

interface IProps {
	timestamp: number;
	type: string;
	eth: number;
	tokenA: number;
	pending?: boolean;
	reverted?: boolean;
	locale: string;
}

export default class ConversionEntry extends React.Component<IProps> {
	public render() {
		const { timestamp, type, eth, tokenA, pending, reverted, locale } = this.props;
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
	}
}
