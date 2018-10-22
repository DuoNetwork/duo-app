import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as CST from '../../common/constants';
import contract from '../../common/contract';
import { IBeethovanAddresses, IBeethovanStates } from '../../common/types';
import AdminInputButton from '../Common/AdminInputButton';
import { SCard, SCardTitle, STableWrapper } from './_styled';

const { Column } = Table;

interface IProps {
	addresses: IBeethovanAddresses;
	states: IBeethovanStates;
	account: string;
}

const validatePosInt = (value: string) =>
	!value || (value.match(CST.RX_INTEGER) && Number(value) > 0) ? '' : 'Invalid number';

export default class AdminCard extends React.PureComponent<IProps> {
	public render() {
		const { states, account, addresses } = this.props;
		const data: object[] = [];
		let key = 0;
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Fee Accumulated',
			[CST.TH_VALUE]: d3.format(',.2f')(states.feeAccumulated),
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_COLLECT_FEE}
					disabled={
						account === CST.DUMMY_ADDR || addresses.feeCollector.address !== account
					}
					validateInput={(value: string) =>
						!value || (value.match(CST.RX_NUM_P) && Number(value) > 0)
							? ''
							: 'Invalid number'
					}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Create Comm Rate BP',
			[CST.TH_VALUE]: states.createCommRate * 10000,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={0}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Redeem Comm Rate BP',
			[CST.TH_VALUE]: states.redeemCommRate * 10000,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={8}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'ETH:DUO Fee Ratio',
			[CST.TH_VALUE]: states.ethDuoFeeRatio,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={1}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Iteration Gas Threshold',
			[CST.TH_VALUE]: states.iterationGasThreshold,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={2}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'PreReset Waiting Blocks',
			[CST.TH_VALUE]: states.preResetWaitingBlocks,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={3}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Price Tolerance BP',
			[CST.TH_VALUE]: states.priceTol * 10000,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={4}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Price Feed Tolerance BP',
			[CST.TH_VALUE]: states.priceFeedTol * 10000,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={5}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Price Feed Time Tolerance',
			[CST.TH_VALUE]: states.priceFeedTimeTol,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={6}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Price Update Cool Down',
			[CST.TH_VALUE]: states.priceUpdateCoolDown,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_SET_VALUE}
					disabled={account === CST.DUMMY_ADDR || addresses.operator.address !== account}
					index={7}
					validateInput={validatePosInt}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Address Pool Length',
			[CST.TH_VALUE]: states.addrPoolLength,
			[CST.TH_ACTION]: (
				<AdminInputButton
					account={account}
					type={CST.TH_ADD_ADDR}
					disabled={
						account === CST.DUMMY_ADDR || addresses.poolManager.address !== account
					}
					validateInput={(value: string) =>
						contract.checkAddress(value) ? '' : 'Invalid Address'
					}
				/>
			)
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Staged Prices',
			[CST.TH_VALUE]: states.numOfPrices
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Next Reset Addr Index',
			[CST.TH_VALUE]: states.nextResetAddrIndex
		});
		data.push({
			key: key++,
			[CST.TH_STATE]: 'Last Admin Time',
			[CST.TH_VALUE]: states.lastAdminTime
		});
		data.push({
			key: key++,
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
