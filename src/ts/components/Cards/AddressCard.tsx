import { Table } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IAddresses, ITableRecord } from 'ts/common/types';
import util from 'ts/common/util';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IAddresses;
	account: string;
	title: string;
	isModerator?: boolean;
	showBalance?: boolean;
	showAction?: boolean;
	showLabel?: boolean;
	isHot?: boolean;
}

export default class AddressCard extends React.Component<IProps> {
	public render() {
		const {
			addresses,
			account,
			title,
			showAction,
			showBalance,
			showLabel,
			isModerator,
			isHot
		} = this.props;
		const dataSource: ITableRecord[] = [];
		for (const address in addresses) {
			const { balance, index, label } = addresses[address];
			dataSource.push({
				key: index,
				[CST.TH_ADDRESS.EN]: address,
				[CST.TH_BALANCE.EN]: util.formatBalance(balance as number),
				[CST.TH_ACTION]: address,
				[CST.TH_LABEL]: label,
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
						{
							<Column
								title={CST.TH_ADDRESS.EN}
								dataIndex={CST.TH_ADDRESS.EN}
								key={CST.TH_ADDRESS.EN}
								onCell={(record: ITableRecord) => ({
									onClick: () => window.open(record[CST.TH_LINK])
								})}
							/>
						}
						{showBalance ? (
							<Column
								title={CST.TH_BALANCE.EN}
								dataIndex={CST.TH_BALANCE.EN}
								key={CST.TH_BALANCE.EN}
							/>
						) : null}
						{showLabel ? (
							<Column
								title={CST.TH_LABEL}
								dataIndex={CST.TH_LABEL}
								key={CST.TH_LABEL}
							/>
						) : null}
						{showAction ? (
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
