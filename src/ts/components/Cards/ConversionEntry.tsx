//import { Table, Tooltip } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import util from 'ts/common/util';

interface IProps {
	timestamp: number;
	type: string;
	eth: number;
	tokenACode: string;
	tokenA: number;
	tokenBCode: string;
	tokenB: number;
	pending?: boolean;
	reverted?: boolean;
	locale: string;
}

export default class ConversionEntry extends React.Component<IProps> {
	public render() {
		const {
			timestamp,
			type,
			eth,
			tokenA,
			tokenB,
			tokenACode,
			tokenBCode,
			pending,
			reverted,
			locale
		} = this.props;
		const tokenString =
			d3.format(',.2f')(tokenA) +
			' ' +
			tokenACode +
			'/' +
			d3.format(',.2f')(tokenB) +
			' ' +
			tokenBCode;
		return (
			<ul>
				<li>
					<span className="title">{util.formatTime(timestamp)}</span>
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
							? d3.format(',.2f')(eth) + ' ETH => ' + tokenString
							: tokenString + ' => ' + d3.format(',.2f')(eth) + ' ETH'}
					</span>
				</li>
			</ul>
		);
	}
}
