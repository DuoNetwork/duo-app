//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Button, Layout, Modal } from 'antd';
import queryString from 'query-string';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import * as StakingCST from 'ts/common/stakingCST';
import { web3Wrapper } from 'ts/common/wrappers';
import StakingInfoCardM from 'ts/components/Cards/StakingInfoCardM';
import StakingNodeCardM from 'ts/components/Cards/StakingNodesCardM';
import StakingPersonalCardM from 'ts/components/Cards/StakingPersonalCardM';
import { SContent } from '../_styled';

interface IProps {
	contractIndex: number;
	contractStates: IStakeStates[];
	account: string;
	duoBalance: number;
	duoAllowance: number[];
	addresses: IStakeAddress[];
	userStakes: Array<{ [key: string]: IStakeLot[] }>;
	oracleStakes: Array<{ [key: string]: number }>;
	userAward: number[];
	locale: string;
	subscribe: (index: number) => any;
	refresh: (index: number) => any;
}

interface IState {
	visible: boolean;
	showed: boolean;
	approved: boolean;
}

export default class StakingMobile extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visible: false,
			showed: false,
			approved: false
		};
	}
	public componentDidMount() {
		this.props.subscribe(this.props.contractIndex);
		document.title = 'DUO | Staking';
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		const { duoAllowance, addresses, contractIndex } = nextProps;
		if (
			addresses[contractIndex].priceFeedList.length > 0 &&
			duoAllowance[contractIndex] === 0 &&
			!prevState.showed
		)
			return {
				visible: true,
				approved: false,
				showed: true
			};
		else if (
			addresses[contractIndex].priceFeedList.length > 0 &&
			duoAllowance[contractIndex] > 0
		)
			return {
				approved: true
			};
		else
			return {
				approved: false
			};
	}

	private handleCancel = () => {
		this.setState({ visible: false });
	};

	private handleApprove = async () => {
		const { account } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			account,
			web3Wrapper.contractAddresses.Stakes[this.props.contractIndex].address,
			0,
			true
		);
		this.setState({ visible: false });
		console.log('Transaction submit: ' + txHash);
	};
	public render() {
		const {
			contractIndex,
			contractStates,
			account,
			duoBalance,
			addresses,
			userStakes,
			oracleStakes,
			userAward,
			locale
		} = this.props;
		const { visible, approved } = this.state;
		const code = queryString.parse((this.props as any).location.search);
		return (
			<Layout>
				<Modal
					visible={visible}
					title={StakingCST.STK_REMIUNDER[locale]}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
					footer={[
						<Button key="ok" type="primary" onClick={this.handleApprove}>
							{StakingCST.STK_OK[locale]}
						</Button>
					]}
				>
					<p>{StakingCST.STK_REMIUNDERTEST[locale]}</p>
					<p>{StakingCST.STK_REMIUNDERBIND[locale]}</p>
				</Modal>
				<SContent>
					<StakingInfoCardM
						contractIndex={contractIndex}
						locale={locale}
						contractStates={contractStates[contractIndex]}
						title={
							contractIndex === 0
								? StakingCST.STK_TITLEFLEX[locale]
								: StakingCST.STK_TITLEFIX[locale]
						}
						oracleStakes={oracleStakes[contractIndex]}
						addresses={addresses[contractIndex]}
					/>
					<StakingPersonalCardM
						contractIndex={contractIndex}
						locale={locale}
						enabled={contractStates[contractIndex].canStake}
						address={account}
						duoBalance={duoBalance}
						award={userAward[contractIndex]}
						enableApprove={!approved}
						linkReferralcode={(code as any).r || ''}
					/>
					{addresses[contractIndex].priceFeedList.length ? (
						addresses[contractIndex].priceFeedList.map((addr, i) => (
							<StakingNodeCardM
								contractIndex={contractIndex}
								lockTime={contractStates[contractIndex].lockMinTimeInSecond}
								minStake={contractStates[contractIndex].minStakeAmt}
								locale={locale}
								enabled={contractStates[contractIndex].canStake}
								title={
									StakingCST.STK_ORACKE[locale] + ' (' + CST.AC_STK_NODES[i] + ')'
								}
								key={i}
								myDUO={duoBalance}
								myStake={userStakes[contractIndex]}
								myAddr={account}
								oracleAddr={addr}
								oracleStakes={oracleStakes[contractIndex]}
							/>
						))
					) : (
						<div
							style={{
								width: '95%',
								height: 150,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								fontSize: 16,
								color: 'rgba(0,0,0,.6)'
							}}
						>
							{StakingCST.STK_LOADINGNODES[locale]}
						</div>
					)}
				</SContent>
			</Layout>
		);
	}
}
