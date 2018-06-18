import { Table } from 'antd';
//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
import { IConversion } from '../../common/types';
import { SCard, SCardTitle } from './_styled';

const { Column } = Table;

interface IProps {
	conversion: IConversion[];
}

export default class HistoryCard extends React.PureComponent<IProps> {
	public render() {
		return (
			<SCard
				title={<SCardTitle>CONVERSION HISTORY</SCardTitle>}
				width="740px"
				margin="0 10px 0 0"
			>
				<Table
					showHeader={false}
					dataSource={this.props.conversion.map((c, i) => ({
						key: i,
						conversion: JSON.stringify(c)
					}))}
					pagination={
						{
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total: number) => 'Total ' + total + ' Conversions',
							pageSize: 10,
							pageSizeOptions: ['10', '20', '50'],
							size: 'small'
						}}
				>
					<Column title="conversion" dataIndex="conversion" key="conversion" />
				</Table>
			</SCard>
		);
	}
}
