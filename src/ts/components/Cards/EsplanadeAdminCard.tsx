import { Table } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IEsplanadeAddresses, IEsplanadeStates } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IEsplanadeAddresses;
	states: IEsplanadeStates;
	account: string;
}

export default class EsplanadeAdminCard extends React.Component<IProps> {
	private handleRemove = () => {
		console.log('removing address')
	};

	public render() {
		const { states } = this.props;
		return (
			<SCard
				title={<SCardTitle>{'Hot Address'}</SCardTitle>}
				width="1000px"
				margin="0 0px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={states.poolAddrsHot.map((addr, i) => ({
							key: i,
							[CST.TH_POOL_ADDRESS]: addr,
							[CST.TH_ACTION]: (
								<button className="form-button" onClick={this.handleRemove}>
									{CST.TH_RM_ADDR}
								</button>
							)
						}))}
						pagination={false}
						rowClassName={() => 'admin-table-row'}
					>
						{[CST.TH_POOL_ADDRESS, CST.TH_ACTION].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
