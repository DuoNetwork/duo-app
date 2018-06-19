import { Table } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IConversion } from '../../common/types';
import { SCard, SCardTitle } from './_styled';

const { Column } = Table;

interface IProps {
	conversion: IConversion[];
	uiConversion: IConversion[];
}

export default class ConversionCard extends React.PureComponent<IProps> {
	private formatData(conversion: IConversion) {
		return {
			[CST.TH_TIME]: moment.utc(conversion.timestamp).format('YYYY-MM-DD HH:mm:ss'),
			[CST.TH_TYPE]: conversion.type,
			[CST.TH_ETH]: d3.format(',.8f')(conversion.eth),
			[CST.TH_TOKEN_AB]: d3.format(',.8f')(conversion.tokenA),
			[CST.TH_LINK]:
				'https://' +
				(__KOVAN__ ? 'kovan.' : '') +
				'etherscan.io/tx/' +
				conversion.transactionHash
		};
	}
	public render() {
		const { conversion, uiConversion } = this.props;
		const pending = uiConversion.map(c => ({
			key: c.transactionHash,
			[CST.TH_STATUS]: CST.TH_PENDING,
			...this.formatData(c)
		}));
		pending.sort((a, b) => -(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME]));
		const confirmed = conversion.map(c => ({
			key: c.transactionHash,
			[CST.TH_STATUS]: CST.TH_CONFIRMED,
			...this.formatData(c)
		}));
		confirmed.sort((a, b) => -(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME]));
		return (
			<SCard
				title={<SCardTitle>{CST.TH_CONVERSION.toUpperCase()}</SCardTitle>}
				width="740px"
				margin="0 10px 0 0"
			>
				<Table
					dataSource={[...pending, ...confirmed]}
					pagination={{
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total: number) => 'Total ' + total + ' Conversions',
						pageSize: 10,
						pageSizeOptions: ['10', '20', '50'],
						size: 'small'
					}}
					onRow={record => {
						return {
							onClick: () => window.open(record[CST.TH_LINK])
						};
					}}
				>
					<Column
						title={CST.TH_TIME}
						dataIndex={CST.TH_TIME}
						key={CST.TH_TIME}
						sorter={(a, b) => -(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME])}
					/>
					<Column
						title={CST.TH_STATUS}
						dataIndex={CST.TH_STATUS}
						key={CST.TH_STATUS}
						filters={[CST.TH_CONFIRMED, CST.TH_PENDING].map(f => ({
							text: f,
							value: f
						}))}
						filterMultiple={false}
						onFilter={(value, record) => record[CST.TH_STATUS] === value}
					/>
					<Column
						title={CST.TH_TYPE}
						dataIndex={CST.TH_TYPE}
						key={CST.TH_TYPE}
						filters={[CST.EVENT_CREATE, CST.EVENT_REDEEM].map(f => ({
							text: f,
							value: f
						}))}
						filterMultiple={false}
						onFilter={(value, record) => record[CST.TH_TYPE] === value}
					/>
					<Column title={CST.TH_ETH} dataIndex={CST.TH_ETH} key={CST.TH_ETH} />
					<Column
						title={CST.TH_TOKEN_AB}
						dataIndex={CST.TH_TOKEN_AB}
						key={CST.TH_TOKEN_AB}
					/>
				</Table>
			</SCard>
		);
	}
}
