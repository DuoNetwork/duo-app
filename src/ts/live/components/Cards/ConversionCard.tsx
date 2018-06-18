import { Table } from 'antd';
//import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IConversion } from '../../common/types';
import util from '../../common/util';
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
			[CST.TH_DESCRIPTION]: (
				<a
					className="tag-content"
					href={
						'https://' +
						(__KOVAN__ ? 'kovan.' : '') +
						'etherscan.io/tx/' +
						conversion.transactionHash
					}
					target="_blank"
				>
					{util.getConversionDescription(
						conversion.eth,
						conversion.tokenA,
						conversion.type === CST.EVENT_CREATE
					)}
				</a>
			)
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
						title={CST.TH_DESCRIPTION}
						dataIndex={CST.TH_DESCRIPTION}
						key={CST.TH_DESCRIPTION}
					/>
				</Table>
			</SCard>
		);
	}
}
