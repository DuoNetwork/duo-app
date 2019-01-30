import { Table } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IEsplanadeAddresses, ITableRecord } from 'ts/common/types';
import util from 'ts/common/util';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IEsplanadeAddresses;
	moderator: string;
	account: string;
	title: string;
	showRemove?: boolean;
	isHot?: boolean;
}

export default class AddressCard extends React.Component<IProps> {
	public render() {
		const { addresses, account, title, showRemove, moderator, isHot } = this.props;
		const isModerator = account === moderator;
		const dataSource: ITableRecord[] = [];
		for (const address in addresses) {
			const { balance, index } = addresses[address];
			dataSource.push({
				key: index,
				[CST.TH_ADDRESS.EN]: address,
				[CST.TH_BALANCE.EN]: util.formatBalance(balance),
				[CST.TH_ACTION]: address,
				[CST.TH_LINK]:
					'https://' + (__KOVAN__ ? 'kovan.' : '') + 'etherscan.io/address/' + address
			});
		}

		dataSource.sort((a, b) => a.key - b.key);

		return (
			<SCard
				title={<SCardTitle>{title.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table dataSource={dataSource} pagination={false}>
						{[CST.TH_ADDRESS.EN, CST.TH_BALANCE.EN].map(th => (
							<Column
								title={th}
								dataIndex={th}
								key={th}
								onCell={(record: ITableRecord) => ({
									onClick: () => window.open(record[CST.TH_LINK])
								})}
							/>
						))}
						{showRemove ? (
							<Column
								title={CST.TH_ACTION}
								dataIndex={CST.TH_ACTION}
								key={CST.TH_ACTION}
								className={'address-table-action-col'}
								render={text => (
									<button
										className="form-button"
										disabled={!isModerator}
										onClick={() =>
											esplanadeWrapper.removeAddress(account, text, !!isHot)
										}
									>
										{CST.TH_RM_ADDR}
									</button>
								)}
							/>
						) : null}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
