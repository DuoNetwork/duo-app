import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IAccountBalances } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	allBalances: IAccountBalances[];
	userLength: number;
}

const format = d3.format(',.4f');

export default class UserCard extends React.PureComponent<IProps> {
	public render() {
		const { allBalances, userLength } = this.props;

		return (
			<SCard
				title={<SCardTitle>{CST.TH_USER.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 10px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={allBalances.map((s, i) => ({
							key: s.account,
							[CST.TH_NO]: i + 1 + '/' + userLength,
							[CST.TH_ADDRESS]: s.account,
							[CST.TH_ETH]: format(s.eth),
							[CST.TH_DUO]: format(s.duo),
							[CST.TH_TOKEN_A]: format(s.tokenA),
							[CST.TH_TOKEN_B]: format(s.tokenB),
							[CST.TH_ALLOWANCE]: format(s.allowance)
						}))}
						pagination={false}
					>
						{[
							CST.TH_NO,
							CST.TH_ADDRESS,
							CST.TH_ETH,
							CST.TH_DUO,
							CST.TH_TOKEN_A,
							CST.TH_TOKEN_B,
							CST.TH_ALLOWANCE
						].map(th => <Column title={th} dataIndex={th} key={th} />)}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
