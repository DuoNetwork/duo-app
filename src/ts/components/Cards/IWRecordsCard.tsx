// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Table } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
//import { Link } from 'react-router-dom';
//import * as StakingCST from 'ts/common/stakingCST';
import * as CST from 'ts/common/constants';
//import warrantUtil from 'ts/common/warrantUtil';
//import { web3Wrapper } from 'ts/common/wrappers';
import { SCard, SCardTitle, SCardTitleSwitch, SRefreshButton, STableWrapper } from './_styled';
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

export default class IWRecordsCard extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		// this.state = {
		// 	tagIndex: 0
		// };
	}

	private intervalID: number = 0;

	private fetchData = () => {
		console.log('fetching');
		this.props.refresh();
	};

	public componentDidMount() {
		this.fetchData();
		this.intervalID = window.setTimeout(() => this.fetchData(), 2000);
		console.log(this.props.refresh);
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
						<SCardTitleSwitch>Records</SCardTitleSwitch>
					</SCardTitle>
				}
				width="700px"
				margin="0 20px 0 0"
				extra={<SRefreshButton icon="reload" onClick={refresh} />}
			>
				<div>{JSON.stringify(addressInfo, null, '\t')}</div>
				<STableWrapper>
					<Table
						dataSource={currentRoundInfo.map((c: any) => ({
							key: c.transactionHash,
							[CST.TH_TIME.EN]: moment(c.date).format('YYYY-MM-DD HH:mm:ss'),
							[CST.TH_STATUS.EN]: c.status,
							[CST.TH_AMOUNT.EN]: d3.format(',.1f')(c.amount),
							txHash: c.txHash,
							[CST.TH_LINK]: 'https://' + 'etherscan.io/tx/' + c.txHash
						}))}
						pagination={{
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total: number) =>
								CST.TH_SUM[locale] +
								' ' +
								total,
							pageSize: 10,
							pageSizeOptions: ['10', '20', '50'],
							size: 'small'
						}}
						onRow={record => ({
							onClick: () => window.open((record as any)[CST.TH_LINK])
						})}
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
