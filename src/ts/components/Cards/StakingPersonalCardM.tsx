// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
//import * as CST from 'ts/common/constants';
//import { Button, Modal } from 'antd';
import * as d3 from 'd3';
import avt from 'images/avatar.png';
import duo3d from 'images/duo-3d.png';
import duoIcon from 'images/Duo_black.png';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
//import { ColorStyles } from 'ts/common/styles';
import { stakeWrapper, web3Wrapper } from 'ts/common/wrappers';
import { SCard, SCardTag2, SCardTitle, SStakingButtonM,
	//SStakingRlinkM
} from './_styled';

interface IProps {
	locale: string;
	enabled: boolean;
	address: string;
	duoBalance: number;
	award: number;
	enableApprove: boolean;
}
interface IState {
	visible: boolean;
}
export default class StakingPersonalCardM extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visible: false
		};
	}
	private handleApprove = async () => {
		const { address } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			address,
			web3Wrapper.contractAddresses.Stake.address,
			0,
			true
		);
		console.log('Transaction submit: ' + txHash);
	};

	// private handleCancel = () => {
	// 	this.setState({ visible: false });
	// };

	// private copyToClipboard = (target: number) => {
	// 	const { address, locale } = this.props;
	// 	target === 1
	// 		? (navigator as any).clipboard
	// 				.writeText('https://app.duo.network/staking?r=' + address.slice(-6))
	// 				.then(() => window.alert(StakingCST.STK_COPIED[locale]))
	// 		: (navigator as any).clipboard
	// 				.writeText('https://duo.ac?r=' + address.slice(-6))
	// 				.then(() => window.alert(StakingCST.STK_COPIED[locale]));
	// };
	public render() {
		const { enabled, address, duoBalance, award, locale, enableApprove } = this.props;
		//const { visible } = this.state;
		return (
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				{/* <Modal
					visible={visible}
					title={StakingCST.STK_RLINK[locale]}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
					footer={[
						<Button key="ok" type="primary" onClick={this.handleCancel}>
							{StakingCST.STK_BTNOK[locale]}
						</Button>
					]}
				>
					<p style={{ marginBottom: 5 }}>{StakingCST.STK_RLDESKTOP[locale]}</p>
					<div>
						<SStakingRlinkM id="referral-link-d">
							{'https://app.duo.network/staking?r=' + address.slice(-6)}
						</SStakingRlinkM>
						<Button key="copy" type="ghost"  style={{marginTop: 5}} onClick={() => this.copyToClipboard(1)}>
							{StakingCST.STK_COPY[locale]}
						</Button>
					</div>
					<p style={{ marginBottom: 5, marginTop: 10 }}>
						{StakingCST.STK_RLMOBILE[locale]}
					</p>
					<div>
						<SStakingRlinkM id="referral-link-m">
							{'https://duo.ac?r=' + address.slice(-6)}
						</SStakingRlinkM>
						<Button key="copy" type="ghost"  style={{marginTop: 5}} onClick={() => this.copyToClipboard(2)}>
							{StakingCST.STK_COPY[locale]}
						</Button>
					</div>
				</Modal> */}
				<SCard
					title={
						<SCardTitle>
							{StakingCST.STK_ACCINFO[locale].toUpperCase()}
						</SCardTitle>
					}
					width="95%"
					margin="10px 0 20px 0"
				>
					<div style={{ marginTop: 15 }}>
						<a
							style={{ color: 'rgba(0,0,0,.6)' }}
							target="_blank"
							href={
								'https://etherscan.io/token/0x56e0b2c7694e6e10391e870774daa45cf6583486?a=' +
								address
							}
						>
							<img style={{ width: 16, height: 16, marginRight: 10 }} src={avt} />
							{StakingCST.STK_ADDRESS[locale]}:{' '}
							<div style={{ color: '#5CA4DE', marginTop: 10 }}>{address}</div>
						</a>
					</div>
					<img
						style={{
							position: 'absolute',
							right: 10,
							top: 55,
							height: 30,
							width: 65
						}}
						src={duo3d}
					/>
					<div>
						<SCardTag2
							style={{
								pointerEvents: 'none',
								width: '100%',
								paddingTop: 0,
								height: 75
							}}
						>
							<div className="bg-logo">
								<img src={duoIcon} />
							</div>
							<div className="tag-content">
								<div className={'tag-price USD'} style={{ fontSize: 12 }}>
									{StakingCST.STK_BALANCE[locale]}
								</div>
							</div>
							<div className="tag-subtext">
								<div
									style={{
										marginRight: 10,
										fontSize: 20,
										fontWeight: 500,
										color: '#5CA4DE',
										textAlign: 'right'
									}}
								>
									{d3.format(',.2f')(duoBalance)}
									<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
								</div>
							</div>
						</SCardTag2>
						<SCardTag2
							style={{
								pointerEvents: 'none',
								width: '100%',
								paddingTop: 0,
								height: 75
							}}
						>
							<div className="bg-logo">
								<img src={duoIcon} />
							</div>
							<div className="tag-content">
								<div className={'tag-price USD'} style={{ fontSize: 12 }}>
									{StakingCST.STK_AWARD[locale]}
								</div>
							</div>
							<div className="tag-subtext">
								<div
									style={{
										marginRight: 10,
										fontSize: 20,
										fontWeight: 500,
										color: '#5CA4DE',
										textAlign: 'right'
									}}
								>
									{d3.format(',.2f')(award)}
									<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
								</div>
							</div>
						</SCardTag2>
						<div
							style={{
								width: '100%',
								marginTop: 10,
								display: 'flex',
								justifyContent: 'space-between',
								paddingBottom: 10
							}}
						>
							<SStakingButtonM
								style={{
									width: '45%',
									pointerEvents: enableApprove ? 'initial' : 'none',
									opacity: enableApprove ? 1 : 0.4
								}}
								onClick={this.handleApprove}
							>
								{StakingCST.STK_APPROVE[locale]}
							</SStakingButtonM>
							<SStakingButtonM
								style={{
									cursor: !enabled ? 'not-allowed' : 'default',
									width: '45%'
								}}
								onClick={() =>
									enabled &&
									stakeWrapper.claimAward(address, {
										gasLimit: 1000000
									})
								}
							>
								{StakingCST.STK_CLAIM[locale]}
							</SStakingButtonM>
						</div>
						{/* <div
							style={{
								width: '100%',
								marginTop: 10,
								display: 'flex',
								justifyContent: 'space-between',
								paddingBottom: 10
							}}
						>
							<SStakingButtonM
								style={{
									width: '45%'
								}}
								onClick={() => this.setState({ visible: true })}
							>
								{StakingCST.STK_RLINK[locale]}
							</SStakingButtonM>
						</div> */}
					</div>
				</SCard>
			</div>
		);
	}
}
