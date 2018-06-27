import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from '../../common/constants';
import { IAddresses, ICustodianStates } from '../../common/types';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IAddresses;
	states: ICustodianStates;
	account: string;
}

export default class AdminCard extends React.PureComponent<IProps> {
	public render() {
		const { states } = this.props;
		const data: object[] = [];
		data.push({
			[CST.TH_STATE]: 'Fee Accumulated',
			[CST.TH_VALUE]: d3.format(',.2f')(states.feeAccumulated),
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_COLLLECT_FEE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'ETH:DUO Fee Ratio',
			[CST.TH_VALUE]: states.ethDuoFeeRatio,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Iteration Gas Threshold',
			[CST.TH_VALUE]: states.iterationGasThreshold,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'PreReset Waiting Blocks',
			[CST.TH_VALUE]: states.preResetWaitingBlocks,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Price Tolerance',
			[CST.TH_VALUE]: states.priceTol,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Price Feed Tolerance',
			[CST.TH_VALUE]: states.priceFeedTol,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Price Feed Time Tolerance',
			[CST.TH_VALUE]: states.priceFeedTimeTol,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Price Update Cool Down',
			[CST.TH_VALUE]: states.priceUpdateCoolDown,
			[CST.TH_INPUT]: <input />,
			[CST.TH_ACTION]: <button>{CST.TH_SET_VALUE}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Address Pool Length',
			[CST.TH_VALUE]: states.addrPoolLength,
			[CST.TH_INPUT]: <div><input /><input /></div>,
			[CST.TH_ACTION]: <button>{CST.TH_ADD_ADDR}</button>
		});
		data.push({
			[CST.TH_STATE]: 'Staged Prices',
			[CST.TH_VALUE]: states.numOfPrices
		});
		data.push({
			[CST.TH_STATE]: 'Next Reset Addr Index',
			[CST.TH_VALUE]: states.nextResetAddrIndex
		});
		data.push({
			[CST.TH_STATE]: 'Last Admin Time',
			[CST.TH_VALUE]: states.lastAdminTime
		});
		data.push({
			[CST.TH_STATE]: 'Admin Cool Down',
			[CST.TH_VALUE]: states.adminCoolDown
		});
		return (
			<SCard
				title={<SCardTitle>{CST.TH_ADMIN.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0px 0 0"
				inlinetype="table"
			>
				<STableWrapper>
					<Table
						dataSource={data}
						pagination={false}
						rowClassName={() => 'admin-table-row'}
					>
						{[CST.TH_STATE, CST.TH_VALUE, CST.TH_INPUT, CST.TH_ACTION].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
