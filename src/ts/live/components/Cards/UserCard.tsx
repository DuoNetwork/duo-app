import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IAccountBalances, ITableRecord } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	allBalances: { [index: number]: IAccountBalances };
	userLength: number;
	load: (start: number, end: number) => any;
}

const format = d3.format(',.4f');

export default class UserCard extends React.PureComponent<IProps> {
	public render() {
		const { allBalances, userLength, load } = this.props;
		const data: ITableRecord[] = [];
		for (let i = 0; i < userLength; i++) {
			const b = allBalances[i];
			if (b)
				data.push({
					key: b.account,
					[CST.TH_NO]: i + 1,
					[CST.TH_ADDRESS.EN]: b.account,
					[CST.TH_ETH]: format(b.eth),
					[CST.TH_DUO]: format(b.duo),
					[CST.TH_TOKEN_A]: format(b.tokenA),
					[CST.TH_TOKEN_B]: format(b.tokenB),
					[CST.TH_ALLOWANCE.EN]: format(b.allowance),
					[CST.TH_LINK]:
						'https://' +
						(__KOVAN__ ? 'kovan.' : '') +
						'etherscan.io/address/' +
						b.account
				});
			else
				data.push({
					key: i,
					[CST.TH_NO]: i + 1,
					[CST.TH_ADDRESS.EN]: CST.TH_LOADING.EN,
					[CST.TH_ETH]: CST.TH_LOADING.EN,
					[CST.TH_DUO]: CST.TH_LOADING.EN,
					[CST.TH_TOKEN_A]: CST.TH_LOADING.EN,
					[CST.TH_TOKEN_B]: CST.TH_LOADING.EN,
					[CST.TH_ALLOWANCE.EN]: CST.TH_LOADING.EN,
					[CST.TH_LINK]: 'https://' + (__KOVAN__ ? 'kovan.' : '') + 'etherscan.io'
				});
		}
		return (
			<SCard
				title={<SCardTitle>{CST.TH_USER.toUpperCase()}</SCardTitle>}
				width="100%"
				margin="0 0px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={data}
						pagination={{
							showQuickJumper: true,
							showTotal: () => 'Total ' + userLength + ' Users',
							pageSize: 20,
							size: 'small',
							onChange: (page: number, pageSize?: number) =>
								load(
									(page - 1) * (pageSize || 20),
									Math.min(userLength, page * (pageSize || 20))
								)
						}}
						onRow={record => ({
							onClick: () => window.open(record[CST.TH_LINK])
						})}
					>
						<Column title={CST.TH_NO} dataIndex={CST.TH_NO} width={60} />
						<Column
							title={CST.TH_ADDRESS}
							dataIndex={CST.TH_ADDRESS.EN}
							width={455}
						/>
						{[
							CST.TH_ETH,
							CST.TH_DUO,
							CST.TH_TOKEN_A,
							CST.TH_TOKEN_B,
							CST.TH_ALLOWANCE.EN
						].map(th => <Column title={th} dataIndex={th} key={th} width={90} />)}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
