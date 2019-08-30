// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Divider, Table } from 'antd';
import * as d3 from 'd3';
import duoIcon from 'images/Duo_black.png';
//import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
//import { Link } from 'react-router-dom';
import * as StakingCST from 'ts/common/stakingCST';
import util from 'ts/common/util';
//import warrantUtil from 'ts/common/warrantUtil';
//import { web3Wrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardTag2,
	SCardTitle,
	SCardTitleSwitch,
	SRefreshButton,
	STableWrapper
} from './_styled';
const { Column } = Table;
interface IProps {
	address: string;
	locale: string;
	currentRoundInfo: any;
	addressInfo: any;
	refresh: () => any;
}

// interface IState {
// 	tagIndex: number;
// }

export default class IWRecordsCardM extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		// this.state = {
		// 	tagIndex: 0
		// };
	}

	private intervalID: number = 0;

	private fetchData = () => {
		this.props.refresh();
	};

	public componentDidMount() {
		this.fetchData();
		this.intervalID = window.setTimeout(() => this.fetchData(), 2000);
	}

	public componentWillUnmount() {
		window.clearInterval(this.intervalID);
	}

	public render() {
		const { addressInfo, currentRoundInfo, refresh, locale } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>
						<SCardTitleSwitch>{StakingCST.STK_RECORDS[locale]}</SCardTitleSwitch>
					</SCardTitle>
				}
				width="95%"
				margin="0 0 20px 0"
				extra={<SRefreshButton icon="reload" onClick={refresh} />}
			>
				<SDivFlexCenter horizontal noJust>
					<SCardTag2 style={{ marginRight: 20 }}>
						<div className="bg-logo">
							<img src={duoIcon} />
						</div>
						<div className="tag-content" style={{ pointerEvents: 'none' }}>
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_TOTALCOMMIT[locale]}
							</div>
						</div>
						<div className="tag-subtext" style={{ pointerEvents: 'none' }}>
							<div
								style={{
									marginLeft: 20,
									fontSize: 20,
									fontWeight: 500,
									color: '#5CA4DE'
								}}
							>
								{addressInfo.roundStakingAmount
									? d3.format(',.2f')(addressInfo.roundStakingAmount[1])
									: '0.00'}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag2>
					<SCardTag2>
						<div className="bg-logo">
							<img src={duoIcon} />
						</div>
						<div className="tag-content" style={{ pointerEvents: 'none' }}>
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_TOTALREWARD[locale]}
							</div>
						</div>
						<div className="tag-subtext" style={{ pointerEvents: 'none' }}>
							<div
								style={{
									marginLeft: 20,
									fontSize: 20,
									fontWeight: 500,
									color: '#5CA4DE'
								}}
							>
								{addressInfo.roundStakingAmount
									? d3.format(',.2f')(addressInfo.roundReturn[1])
									: '0.00'}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag2>
				</SDivFlexCenter>
				<div
					style={{
						paddingLeft: 10,
						color: 'rgba(64,79,84,.8)',
						fontWeight: 500,
						marginTop: 10,
						marginBottom: -5
					}}
				>
					{StakingCST.STK_LASTROUND[locale]}
				</div>
				<STableWrapper>
					<Table
						dataSource={[
							{
								key: 'lastRound',
								[CST.TH_TIME.EN]: addressInfo.date ? addressInfo.date : ' - ',
								[StakingCST.STK_STAKEAMOUNT.EN]: addressInfo.roundStakingAmount
									? d3.format(',.2f')(addressInfo.roundStakingAmount[0])
									: ' - ',
								[StakingCST.STK_STAKERETURN.EN]: addressInfo.roundReturn
									? d3.format(',.2f')(addressInfo.roundReturn[0])
									: ' - ',
								[StakingCST.STK_ETHRANGE.EN]: addressInfo.boundETH
									? `${addressInfo.boundETH[1]} ~ ${addressInfo.boundETH[0]}`
									: ' - ',
								[StakingCST.STK_ETHSETTLE.EN]: addressInfo.settleETH
									? addressInfo.settleETH
									: ' - '
							}
						]}
						rowClassName={() => 'lastRoundRow'}
						pagination={false}
						style={{fontSize: 12, marginBottom: -5}}
					>
						<Column
							title={CST.TH_TIME[locale]}
							dataIndex={CST.TH_TIME.EN}
							width={100}
						/>
						<Column
							title={StakingCST.STK_COMMIT[locale]}
							dataIndex={StakingCST.STK_STAKEAMOUNT.EN}
							width={90}
						/>
						<Column
							title={StakingCST.STK_REWARD[locale]}
							dataIndex={StakingCST.STK_STAKERETURN.EN}
							width={90}
						/>
						<Column
							title={StakingCST.STK_ETHRANGE[locale]}
							dataIndex={StakingCST.STK_ETHRANGE.EN}
							width={130}
						/>
						<Column
							title={StakingCST.STK_ETHSETTLE[locale]}
							dataIndex={StakingCST.STK_ETHSETTLE.EN}
							width={120}
						/>
					</Table>
				</STableWrapper>
				<Divider dashed />
				<div
					style={{
						paddingLeft: 10,
						color: 'rgba(64,79,84,.8)',
						fontWeight: 500,
						marginBottom: -5,
						marginTop: -5
					}}
				>
					{StakingCST.STK_CURRENTROUND[locale]}
				</div>
				<STableWrapper>
					<Table
						dataSource={currentRoundInfo.map((c: any) => ({
							key: c.transactionHash,
							[CST.TH_TIME.EN]: util.formatTime(c.date),
							[CST.TH_STATUS.EN]: c.status,
							[CST.TH_AMOUNT.EN]: d3.format(',.1f')(c.amount),
							txHash: c.txHash,
							[CST.TH_LINK]: 'https://' + 'etherscan.io/tx/' + c.txHash
						}))}
						pagination={{
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total: number) => CST.TH_SUM[locale] + ' ' + total,
							pageSize: 10,
							pageSizeOptions: ['10', '20', '50'],
							size: 'small'
						}}
						onRow={record => ({
							onClick: () => window.open((record as any)[CST.TH_LINK])
						})}
						style={{fontSize: 12}}
					>
						<Column
							title={CST.TH_TIME[locale]}
							dataIndex={CST.TH_TIME.EN}
							width={140}
						/>
						<Column
							title={CST.TH_AMOUNT[locale]}
							dataIndex={CST.TH_AMOUNT.EN}
							width={90}
						/>
						<Column
							title={CST.TH_TXHASH[locale]}
							className="txHash"
							dataIndex={'txHash'}
							render={text =>
								`${text.substring(0, 6)} ... ${text.substring(
									text.length - 6,
									text.length
								)}`
							}
							width={200}
						/>
						<Column
							title={CST.TH_STATUS[locale]}
							dataIndex={CST.TH_STATUS.EN}
							width={95}
							render={text => {
								switch (text) {
									case 'pending':
										return CST.TH_PENDING[locale];
									case 'mined':
										return CST.TH_MINED[locale];
									case 'timeout':
										return CST.TH_TIMEOUT[locale];
									default:
										return CST.TH_REVERTED[locale];
								}
							}}
						/>
					</Table>
				</STableWrapper>
			</SCard>
		);
	}
}
