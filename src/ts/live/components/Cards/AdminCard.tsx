import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { IAddresses, ICustodianStates } from '../../common/types';
import AdminInputButton from '../Common/AdminInputButton';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IAddresses;
	states: ICustodianStates;
	account: string;
}

export default class AdminCard extends React.PureComponent<IProps> {
	public render() {
		const { states, account, addresses } = this.props;
		const data: object[] = [];
		data.push({
			key: 0,
			[CST.TH_STATE]: 'Fee Accumulated',
			[CST.TH_VALUE]: d3.format(',.2f')(states.feeAccumulated),
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_COLLLECT_FEE}
					disabled={account === '0x0' || addresses.feeCollector.address !== account}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_NUM_P) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 1,
			[CST.TH_STATE]: 'ETH:DUO Fee Ratio',
			[CST.TH_VALUE]: states.ethDuoFeeRatio,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={1}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_INTEGER) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 2,
			[CST.TH_STATE]: 'Iteration Gas Threshold',
			[CST.TH_VALUE]: states.iterationGasThreshold,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={2}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_INTEGER) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 3,
			[CST.TH_STATE]: 'PreReset Waiting Blocks',
			[CST.TH_VALUE]: states.preResetWaitingBlocks,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={3}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_INTEGER) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 4,
			[CST.TH_STATE]: 'Price Tolerance',
			[CST.TH_VALUE]: states.priceTol,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={4}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_NUM_P) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 5,
			[CST.TH_STATE]: 'Price Feed Tolerance',
			[CST.TH_VALUE]: states.priceFeedTol,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={5}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_NUM_P) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 6,
			[CST.TH_STATE]: 'Price Feed Time Tolerance',
			[CST.TH_VALUE]: states.priceFeedTimeTol,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={6}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_INTEGER) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 7,
			[CST.TH_STATE]: 'Price Update Cool Down',
			[CST.TH_VALUE]: states.priceUpdateCoolDown,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === '0x0' || addresses.operator.address !== account}
					index={7}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_INTEGER) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: 8,
			[CST.TH_STATE]: 'Address Pool Length',
			[CST.TH_VALUE]: states.addrPoolLength,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_ADD_ADDR}
					disabled={account === '0x0' || addresses.poolManager.address !== account}
					validateInput={(value: string) =>
						contractUtil.checkAddress(value) ? '' : 'Invalid Address'
					}
				/>
			)
		});
		data.push({
			key: 9,
			[CST.TH_STATE]: 'Staged Prices',
			[CST.TH_VALUE]: states.numOfPrices
		});
		data.push({
			key: 10,
			[CST.TH_STATE]: 'Next Reset Addr Index',
			[CST.TH_VALUE]: states.nextResetAddrIndex
		});
		data.push({
			key: 11,
			[CST.TH_STATE]: 'Last Admin Time',
			[CST.TH_VALUE]: states.lastAdminTime
		});
		data.push({
			key: 12,
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
						{[CST.TH_STATE, CST.TH_VALUE, CST.TH_ACTION].map(th => (
							<Column title={th} dataIndex={th} key={th} />
						))}
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
