import { Table, Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IConversion } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	conversion: IConversion[];
	uiConversion: IConversion[];
}

export default class ConversionCard extends React.PureComponent<IProps> {
	private formatData(conversion: IConversion) {
		return {
			[CST.TH_TIME]: moment(conversion.timestamp).format('YYYY-MM-DD HH:mm:ss'),
			[CST.TH_TYPE]: conversion.type,
			[CST.TH_ETH]: d3.format(',.8f')(conversion.eth),
			[CST.TH_TOKEN_AB]: d3.format(',.8f')(conversion.tokenA),
			[CST.TH_FEE]: conversion.duoFee
				? d3.format(',.8f')(conversion.duoFee) + ' ' + CST.TH_DUO
				: d3.format(',.8f')(conversion.ethFee) + ' ' + CST.TH_ETH,
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
			key: 'ui' + c.transactionHash,
			[CST.TH_STATUS]: CST.TH_PENDING,
			[CST.TH_TOOLTIP]: 'Delayed up to 10 minutes. Click to open tx in etherscan.io',
			...this.formatData(c)
		}));
		pending.sort((a, b) => -(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME]));
		const confirmed = conversion.map(c => ({
			key: c.transactionHash,
			[CST.TH_STATUS]: CST.TH_MINED,
			...this.formatData(c)
		}));
		confirmed.sort((a, b) => -(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME]));
		return (
			<SCard
				title={<SCardTitle>{CST.TH_CONVERSION.toUpperCase()}</SCardTitle>}
				width="740px"
				margin="0 10px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
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
						onRow={record => ({
							onClick: () => window.open(record[CST.TH_LINK])
						})}
						rowClassName={record => record[CST.TH_TYPE]}
					>
						<Column
							title={CST.TH_TIME}
							dataIndex={CST.TH_TIME}
							key={CST.TH_TIME}
							sorter={(a, b) =>
								-(a[CST.TH_TIME] as string).localeCompare(b[CST.TH_TIME])
							}
							width={160}
						/>
						<Column
							title={CST.TH_STATUS}
							dataIndex={CST.TH_STATUS}
							key={CST.TH_STATUS}
							filters={[CST.TH_MINED, CST.TH_PENDING].map(f => ({
								text: f,
								value: f
							}))}
							filterMultiple={false}
							onFilter={(value, record) => record[CST.TH_STATUS] === value}
							width={90}
							render={(text, record) =>
								record[CST.TH_TOOLTIP] ? (
									<Tooltip title={record[CST.TH_TOOLTIP]}>{text}</Tooltip>
								) : (
									text
								)
							}
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
							width={90}
						/>
						<Column
							title={CST.TH_ETH}
							dataIndex={CST.TH_ETH}
							key={CST.TH_ETH}
							className="eth"
						/>
						<Column
							title={CST.TH_TOKEN_AB}
							dataIndex={CST.TH_TOKEN_AB}
							key={CST.TH_TOKEN_AB}
							className="token-ab"
						/>
						<Column
							title={CST.TH_FEE}
							dataIndex={CST.TH_FEE}
							key={CST.TH_FEE}
							className="fee"
							width={140}
						/>
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
