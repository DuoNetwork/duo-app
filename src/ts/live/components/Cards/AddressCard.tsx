import { Table } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IAddress, IAddresses } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IAddresses;
}

export default class StatusCard extends React.PureComponent<IProps> {
	public render() {
		const { addresses } = this.props;
		const data: object[] = [];
		for (const role in addresses) {
			const addr: IAddress = addresses[role];
			data.push({
				key: role,
				[CST.TH_ROLE]: role,
				[CST.TH_ADDRESS]: addr.address,
				[CST.TH_BALANCE]: addr.balance
			});
		}

		return (
			<SCard
				title={<SCardTitle>{CST.TH_ADDRESS.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table dataSource={data} pagination={false}>
						{[CST.TH_ROLE, CST.TH_ADDRESS, CST.TH_BALANCE].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
