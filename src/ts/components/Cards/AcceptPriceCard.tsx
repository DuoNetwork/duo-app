import { IAcceptedPrice } from '@finbook/duo-market-data';
import { Table } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	acceptedPrices: IAcceptedPrice[];
}

export default class StatusCard extends React.Component<IProps> {
	public render() {
		const { acceptedPrices } = this.props;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_ACCEPTED_PX.toUpperCase()}</SCardTitle>}
				width="100%"
				margin="0 0px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={acceptedPrices.map(ap => ({
							key: ap.transactionHash,
							[CST.TH_BLOCK]: ap.blockNumber,
							[CST.TH_TIME.EN]: moment(ap.timestamp).format('YYYY-MM-DD HH:mm'),
							[CST.TH_PRICE.EN]: ap.price,
							[CST.TH_SENDER]: ap.sender,
							[CST.TH_LINK]:
								'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/tx/' +
								ap.transactionHash
						}))}
						pagination={false}
						onRow={record => ({
							onClick: () => window.open(record[CST.TH_LINK])
						})}
					>
						{[CST.TH_BLOCK, CST.TH_TIME.EN, CST.TH_PRICE.EN, CST.TH_SENDER].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
