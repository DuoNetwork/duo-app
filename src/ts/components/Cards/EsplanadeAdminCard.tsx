import { Table } from 'antd';
import * as React from 'react';
import { esplanadeWrapper } from 'ts/common/wrappers';
import * as CST from '../../common/constants';
import { IEsplanadeAddresses, IEsplanadeStates, ITableRecord } from '../../common/types';
import util from '../../common/util';
import { SCard, SCardTitle, STableWrapper } from './_styled';
// import { EsplanadeStateCard } from './EsplanadeStateCard';

const { Column } = Table;

interface IProps {
	addresses: IEsplanadeAddresses;
	states: IEsplanadeStates;
	account: string;
}

export default class EsplanadeAdminCard extends React.Component<IProps> {
	public render() {
		const { addresses, account } = this.props;
		const addrData: object[] = [];
		const contractData: object[] = [];
		const isModerator = account === addresses.moderator.address;

		addrData.push({
			key: addresses.moderator,
			[CST.TH_ROLE]: addresses.moderator,
			[CST.TH_ADDRESS.EN]: addresses.moderator.address,
			[CST.TH_BALANCE.EN]: util.formatBalance(addresses.moderator.balance),
			[CST.TH_LINK]:
				'https://' + (__KOVAN__ ? 'kovan.' : '') + 'etherscan.io/address/' + addresses.moderator.address,
			[CST.TH_ACTION]: ''
		});

		addrData.push({
			key: addresses.candidate,
			[CST.TH_ROLE]: addresses.candidate,
			[CST.TH_ADDRESS.EN]: addresses.candidate.address,
			[CST.TH_BALANCE.EN]: util.formatBalance(addresses.candidate.balance),
			[CST.TH_LINK]:
				'https://' + (__KOVAN__ ? 'kovan.' : '') + 'etherscan.io/address/' + addresses.candidate.address,
			[CST.TH_ACTION]: ''
		});

		addresses.poolAddrs.hot.forEach((addr, i) =>
			addrData.push({
				key: CST.TH_POOL + i,
				[CST.TH_ROLE]: CST.TH_HOT_ADDRESS + '' + i,
				[CST.TH_ADDRESS.EN]: addr.address,
				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
				[CST.TH_LINK]:
					'https://' +
					(__KOVAN__ ? 'kovan.' : '') +
					'etherscan.io/address/' +
					addr.address,
				[CST.TH_ACTION]: (
					<button
						className="form-button"
						disabled={!isModerator}
						onClick={() => esplanadeWrapper.removeAddress(account, addr.address, true)}
					>
						{CST.TH_RM_ADDR}
					</button>
				)
			})
		);

		addresses.poolAddrs.cold.forEach((addr, i) =>
			addrData.push({
				key: CST.TH_POOL + i,
				[CST.TH_ROLE]: CST.TH_COLD_ADDRESS + '' + i,
				[CST.TH_ADDRESS.EN]: addr.address,
				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
				[CST.TH_LINK]:
					'https://' +
					(__KOVAN__ ? 'kovan.' : '') +
					'etherscan.io/address/' +
					addr.address,
				[CST.TH_ACTION]: (
					<button
						className="form-button"
						disabled={!isModerator}
						onClick={() => esplanadeWrapper.removeAddress(account, addr.address, false)}
					>
						{CST.TH_RM_ADDR}
					</button>
				)
			})
		);

		addresses.poolAddrs.custodian.forEach((addr, i) =>
			contractData.push({
				key: CST.TH_CUSTODIANS + i,
				[CST.TH_ROLE]: CST.TH_CUSTODIANS + '' + i,
				[CST.TH_ADDRESS.EN]: addr.address,
				[CST.TH_ETH_BALANCE.EN]: util.formatBalance(addr.balance),
				[CST.TH_LINK]:
					'https://' +
					(__KOVAN__ ? 'kovan.' : '') +
					'etherscan.io/address/' +
					addr.address
			})
		);

		addresses.poolAddrs.otherContract.forEach((addr, i) =>
			contractData.push({
				key: CST.TH_OTHER_CONTRACT + i,
				[CST.TH_ROLE]: CST.TH_OTHER_CONTRACT + '' + i,
				[CST.TH_ADDRESS.EN]: addr.address,
				[CST.TH_ETH_BALANCE.EN]: util.formatBalance(addr.balance),
				[CST.TH_LINK]:
					'https://' +
					(__KOVAN__ ? 'kovan.' : '') +
					'etherscan.io/address/' +
					addr.address
			})
		);

		return (
			<SCard
				title={<SCardTitle>{CST.TH_ADDRESS.EN.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table dataSource={contractData} pagination={false}>
						{[CST.TH_ROLE, CST.TH_ADDRESS.EN, CST.TH_ETH_BALANCE.EN].map(th => (
							<Column
								title={th}
								dataIndex={th}
								key={th}
								onCell={(record: ITableRecord) => ({
									onClick: () => window.open(record[CST.TH_LINK])
								})}
							/>
						))}
					</Table>
				</STableWrapper>
				<STableWrapper>
					<Table dataSource={addrData} pagination={false}>
						{[CST.TH_ROLE, CST.TH_ADDRESS.EN, CST.TH_BALANCE.EN].map(th => (
							<Column
								title={th}
								dataIndex={th}
								key={th}
								onCell={(record: ITableRecord) => ({
									onClick: () => window.open(record[CST.TH_LINK])
								})}
							/>
						))}
						<Column
							title={CST.TH_ACTION}
							dataIndex={CST.TH_ACTION}
							key={CST.TH_ACTION}
							className={'address-table-action-col'}
						/>
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
