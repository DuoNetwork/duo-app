import { INodeStatus, IPriceStatus, IStatus } from '@finbook/duo-market-data';
import { Table } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import util from 'ts/common/util';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	status: IStatus[];
}

export default class StatusCard extends React.Component<IProps> {
	public render() {
		const { status } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>{(CST.TH_PROCESS + ' ' + CST.TH_STATUS.EN).toUpperCase()}</SCardTitle>
				}
				width="100%"
				margin="0 0px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={status.map(s => ({
							key: s.process,
							[CST.TH_PROCESS]: s.process,
							[CST.TH_UPDATED]: util.convertUpdateTime(s.timestamp),
							[CST.TH_PRICE.EN]: (s as IPriceStatus).price || '',
							[CST.TH_VOLUME]: (s as IPriceStatus).volume || '',
							[CST.TH_BLOCK]: (s as INodeStatus).block || ''
						}))}
						pagination={false}
					>
						{[
							CST.TH_PROCESS,
							CST.TH_UPDATED,
							CST.TH_PRICE.EN,
							CST.TH_VOLUME,
							CST.TH_BLOCK
						].map(th => <Column title={th} dataIndex={th} key={th} />)}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
