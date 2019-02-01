import {
	Constants as WrapperConstants,
	ICustodianContractAddress
} from '@finbook/duo-contract-wrapper';
import { IConversion } from '@finbook/duo-market-data';
import { LocaleProvider, Table, Tooltip } from 'antd';
import antdEn from 'antd/lib/locale-provider/en_US';
import antdCn from 'antd/lib/locale-provider/zh_CN';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { ITableRecord } from 'ts/common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	contractAddress: ICustodianContractAddress;
	locale: string;
	conversions: IConversion[];
}

export default class ConversionCard extends React.Component<IProps> {
	public render() {
		const { conversions, locale, contractAddress } = this.props;
		return (
			<LocaleProvider locale={locale === CST.LOCALE_CN ? antdCn : antdEn}>
				<SCard
					title={<SCardTitle>{CST.TH_CONVERSION[locale].toUpperCase()}</SCardTitle>}
					width="740px"
					margin="0 10px 0 0"
					inlinetype="table"
				>
					<STableWrapper>
						<Table
							dataSource={conversions.map(c => ({
								key: c.transactionHash,
								[CST.TH_TIME.EN]: moment(c.timestamp).format('YYYY-MM-DD HH:mm:ss'),
								[CST.TH_STATUS.EN]: c.pending
									? CST.TH_PENDING[locale]
									: c.reverted
									? CST.TH_REVERTED[locale]
									: CST.TH_MINED[locale],
								[CST.TH_TYPE.EN]: c.type,
								[CST.TH_ETH]: d3.format(',.8f')(c.eth),
								[CST.TH_TOKEN_A]: d3.format(',.8f')(c.tokenA),
								[CST.TH_TOKEN_B]: d3.format(',.8f')(c.tokenB),
								[CST.TH_FEE.EN]: d3.format(',.8f')(c.fee) + ' ' + CST.TH_ETH,
								[CST.TH_LINK]:
									'https://' +
									(__KOVAN__ ? 'kovan.' : '') +
									'etherscan.io/tx/' +
									c.transactionHash
							}))}
							pagination={{
								showSizeChanger: true,
								showQuickJumper: true,
								showTotal: (total: number) =>
									CST.TH_TOTAL[locale] +
									' ' +
									total +
									' ' +
									CST.TH_CONVERSIONS[locale],
								pageSize: 10,
								pageSizeOptions: ['10', '20', '50'],
								size: 'small'
							}}
							onRow={record => ({
								onClick: () => window.open(record[CST.TH_LINK])
							})}
							rowClassName={record => record[CST.TH_TYPE.EN] + ''}
						>
							<Column
								title={CST.TH_TIME[locale]}
								dataIndex={CST.TH_TIME.EN}
								sorter={(a: ITableRecord, b: ITableRecord) =>
									-(a[CST.TH_TIME.EN] as string).localeCompare(b[CST.TH_TIME.EN])
								}
								width={155}
							/>
							<Column
								title={CST.TH_STATUS[locale]}
								dataIndex={CST.TH_STATUS.EN}
								filters={[
									CST.TH_MINED[locale],
									CST.TH_PENDING[locale],
									CST.TH_REVERTED[locale]
								].map(f => ({
									text: f,
									value: f
								}))}
								filterMultiple={false}
								onFilter={(value, record: ITableRecord) =>
									record[CST.TH_STATUS.EN] === value
								}
								width={95}
								render={(text, record) =>
									record[CST.TH_TOOLTIP] ? (
										<Tooltip title={record[CST.TH_TOOLTIP]}>{text}</Tooltip>
									) : (
										text
									)
								}
							/>
							<Column
								title={CST.TH_TYPE[locale]}
								dataIndex={CST.TH_TYPE.EN}
								filters={[CST.TH_CREATE, CST.TH_REDEEM].map(f => ({
									text: f[locale],
									value: f.EN
								}))}
								filterMultiple={false}
								onFilter={(value, record: ITableRecord) =>
									record[CST.TH_TYPE.EN] === value
								}
								width={90}
								render={text =>
									text === WrapperConstants.EVENT_CREATE
										? CST.TH_CREATE[locale]
										: CST.TH_REDEEM[locale]
								}
							/>
							<Column title={CST.TH_ETH} dataIndex={CST.TH_ETH} className="eth" />
							<Column
								title={
									contractAddress.aToken.code + '/' + contractAddress.bToken.code
								}
								className="token-ab"
								render={record => (
									<div>
										{record[CST.TH_TOKEN_A]}
										<br />
										{record[CST.TH_TOKEN_B]}
									</div>
								)}
							/>
							<Column
								title={CST.TH_FEE[locale]}
								dataIndex={CST.TH_FEE.EN}
								className="fee"
								width={140}
							/>
						</Table>
					</STableWrapper>
				</SCard>
			</LocaleProvider>
		);
	}
}
