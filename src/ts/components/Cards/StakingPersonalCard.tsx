// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
//import * as CST from 'ts/common/constants';
import { Button, Modal } from 'antd';
import * as d3 from 'd3';
import avt from 'images/avatar.png';
import duo3d from 'images/duo-3d.png';
import duoIcon from 'images/Duo_black.png';
import * as React from 'react';
//import { ColorStyles } from 'ts/common/styles';
import referralUtil from 'ts/common/referralUtil';
import * as StakingCST from 'ts/common/stakingCST';
import { IReferral } from 'ts/common/types';
import { stakeWrapper, web3Wrapper } from 'ts/common/wrappers';
import {
	SCard,
	SCardTag2,
	SCardTitle,
	SStakingButtonM,
	SStakingInput,
	SStakingRlink
} from './_styled';

interface IProps {
	locale: string;
	enabled: boolean;
	address: string;
	duoBalance: number;
	award: number;
	enableApprove: boolean;
	linkReferralcode: string;
}

interface IState {
	visibleLink: boolean;
	visibleAddReferral: boolean;
	referralCode: string;
}

export default class StakingPersonalCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visibleLink: false,
			visibleAddReferral: false,
			referralCode: this.props.linkReferralcode
		};
	}

	private handleApprove = async () => {
		const { address } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			address,
			web3Wrapper.contractAddresses.Stakes[0].address,
			0,
			true
		);
		console.log('Transaction submit: ' + txHash);
	};

	private personalSign = async () => {
		const signHash = await web3Wrapper.web3PersonalSign(
			this.props.address,
			'Referral Code:' + this.state.referralCode
		);
		return signHash;
	};

	private handleCancel = () => {
		this.setState({ visibleLink: false, visibleAddReferral: false  });
	};

	private handleInputChange = (value: string) => {
		this.setState({ referralCode: value });
	};

	private copyToClipboard = (target: number) => {
		const { address, locale } = this.props;
		target === 1
			? (navigator as any).clipboard
					.writeText('https://app.duo.network/staking?r=' + address.slice(-6))
					.then(() => window.alert(StakingCST.STK_COPIED[locale]))
			: (navigator as any).clipboard
					.writeText('https://duo.ac?r=' + address.slice(-6))
					.then(() => window.alert(StakingCST.STK_COPIED[locale]));
	};

	private handleBind = async () => {
		// const SignString = await this.personalSign();
		// console.log(this.state.referralCode, SignString);
		const { address, locale } = this.props;
		const { referralCode } = this.state;
		if (await referralUtil.checkExist(address))
			window.alert(StakingCST.STK_ALRBIND[locale]);
		else if (referralCode.length !== 6)
			window.alert(StakingCST.STK_RCWARING[locale]);
		else {
			const signHash = await this.personalSign();
			const data: IReferral = {
				address: address,
				referralCode: referralCode,
				signHash: signHash
			};
			await referralUtil.insertReferralEntry(data);
			this.setState({referralCode: ''})
			this.handleCancel();
		}
	};

	public render() {
		const { enabled, address, duoBalance, award, locale, enableApprove } = this.props;
		const { visibleLink, visibleAddReferral, referralCode } = this.state;
		return (
			<div>
				<Modal
					visible={visibleLink}
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
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<SStakingRlink id="referral-link-d">
							{'https://app.duo.network/staking?r=' + address.slice(-6)}
						</SStakingRlink>
						<Button key="ok" type="ghost" onClick={() => this.copyToClipboard(1)}>
							{StakingCST.STK_COPY[locale]}
						</Button>
					</div>
					<p style={{ marginBottom: 5, marginTop: 10 }}>
						{StakingCST.STK_RLMOBILE[locale]}
					</p>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<SStakingRlink id="referral-link-m">
							{'https://duo.ac?r=' + address.slice(-6)}
						</SStakingRlink>
						<Button key="ok" type="ghost" onClick={() => this.copyToClipboard(2)}>
							{StakingCST.STK_COPY[locale]}
						</Button>
					</div>
				</Modal>
				<Modal
					visible={visibleAddReferral}
					title={StakingCST.STK_BRLINK[locale]}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
					footer={[
						<Button key="ok" type="primary" onClick={this.handleBind}>
							{StakingCST.STK_BIND[locale]}
						</Button>
					]}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>{StakingCST.STK_RCODE[locale]}</div>
						<SStakingInput
							placeholder={StakingCST.STK_BINDINPUTPH[locale]}
							value={referralCode}
							onChange={e => this.handleInputChange(e.target.value)}
							style={{ width: 300 }}
						/>
					</div>
				</Modal>
				<SCard
					title={<SCardTitle>{StakingCST.STK_ACCINFO[locale].toUpperCase()}</SCardTitle>}
					width="960px"
					margin="0 0 20px 0"
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
							<img
								style={{ width: 16, height: 16, marginRight: 10, marginLeft: 5 }}
								src={avt}
							/>
							{StakingCST.STK_ADDRESS[locale]}:{' '}
							<span style={{ color: '#5CA4DE' }}>{address}</span>
						</a>
					</div>
					<img
						style={{
							position: 'absolute',
							right: 10,
							bottom: 10,
							height: 90,
							width: 210
						}}
						src={duo3d}
					/>
					<div style={{ width: 700, display: 'flex', justifyContent: 'space-between' }}>
						<SCardTag2 style={{ pointerEvents: 'none' }}>
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
										marginLeft: 20,
										fontSize: 20,
										fontWeight: 500,
										color: '#5CA4DE'
									}}
								>
									{d3.format(',.2f')(duoBalance)}
									<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
								</div>
							</div>
						</SCardTag2>
						<SCardTag2 style={{ pointerEvents: 'none' }}>
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
										marginLeft: 20,
										fontSize: 20,
										fontWeight: 500,
										color: '#5CA4DE'
									}}
								>
									{d3.format(',.2f')(award)}
								</div>
							</div>
						</SCardTag2>
						<div
							style={{
								width: 120,
								marginTop: 30,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							<SStakingButtonM
								onClick={this.handleApprove}
								style={{
									pointerEvents: enableApprove ? 'initial' : 'none',
									opacity: enableApprove ? 1 : 0.4
								}}
							>
								{StakingCST.STK_APPROVE[locale]}
							</SStakingButtonM>
							<SStakingButtonM
								style={{ cursor: !enabled ? 'not-allowed' : 'default' }}
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
						<div
							style={{
								width: 120,
								marginTop: 30,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							<SStakingButtonM onClick={() => this.setState({ visibleLink: true })}>
								{StakingCST.STK_RLINK[locale]}
							</SStakingButtonM>
							<SStakingButtonM
								onClick={() => this.setState({ visibleAddReferral: true })}
							>
								{StakingCST.STK_BRLINK[locale]}
							</SStakingButtonM>
						</div>
					</div>
				</SCard>
			</div>
		);
	}
}
