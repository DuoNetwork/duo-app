import { Table } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IAddress, IAddresses } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IAddresses;
	addressPool: IAddress[];
}

export default class AddressCard extends React.PureComponent<IProps> {
	public render() {
		const { addresses, addressPool } = this.props;
		const data: object[] = [];
		for (const role in addresses) {
			const addr: IAddress = addresses[role];
			data.push({
				key: role,
				[CST.TH_ROLE]: role,
				[CST.TH_ADDRESS]: addr.address,
				[CST.TH_BALANCE]: addr.balance,
				[CST.TH_LINK]:
					'https://' +
					(__KOVAN__ ? 'kovan.' : '') +
					'etherscan.io/address/' +
					addr.address,
				[CST.TH_ACTION]: role === 'poolManager' ? '' : <button>{CST.TH_UPDATE_ROLE}</button>
			});
		}
		addressPool.forEach((addr, i) => data.push({
			key: CST.TH_POOL + i,
			[CST.TH_ROLE]: CST.TH_POOL + i,
			[CST.TH_ADDRESS]: addr.address,
			[CST.TH_BALANCE]: addr.balance,
			[CST.TH_LINK]:
				'https://' +
				(__KOVAN__ ? 'kovan.' : '') +
				'etherscan.io/address/' +
				addr.address,
			[CST.TH_ACTION]: <button>{CST.TH_RM_ADDR}</button>
		}))

		return (
			<SCard
				title={<SCardTitle>{CST.TH_ADDRESS.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={data}
						pagination={false}
						onRow={record => ({
							onClick: () => window.open(record[CST.TH_LINK])
						})}
					>
						{[CST.TH_ROLE, CST.TH_ADDRESS, CST.TH_BALANCE, CST.TH_ACTION].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
