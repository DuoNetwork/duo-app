import * as d3 from 'd3';
import avt from 'images/avatar.png';
import duoIcon from 'images/Duo_black.png';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
import warrentUtil from 'ts/common/warrantUtil';
import { stakeV2Wrapper, web3Wrapper } from 'ts/common/wrappers';
import {
	SCard,
	SCardTag2,
	SCardTitle,
	SStakingButtonM,
	SStakingButtonM2,
	SStakingInput
} from './_styled';

interface IProps {
	address: string;
	locale: string;
	duoBalance: number;
	award: number;
	enableApprove: boolean;
	enabled: boolean;
	phase: number;
	refresh: () => any;
}

interface IState {
	addressInfo: any;
	inputText: string;
	inputValue: number;
}

export default class IWOperationCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addressInfo: {},
			inputText: '',
			inputValue: 0
		};
	}
	private handleInputChange = (value: string) => {
		const newText =
			parseInt(value, 0).toString() === 'NaN' ? '' : parseInt(value, 0).toString();
		this.setState({ inputText: newText, inputValue: parseInt(value, 0) });
	};
	private insertStake = async (txHash: string, amount: number) => {
		const item = {
			address: this.props.address,
			amount: amount.toString(),
			txHash: txHash
		};
		warrentUtil.insetStakingEntry(item);
	};

	private handleApprove = async () => {
		const { address } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			address,
			web3Wrapper.contractAddresses.StakesV2[0].address,
			0,
			true
		);
		console.log('Transaction submit: ' + txHash);
	};
	private handleStake = async () => {
		const { address, locale, refresh } = this.props;
		const oracleAddr = web3Wrapper.contractAddresses.Oracles[0].address;
		const { inputValue } = this.state;
		if (inputValue >= 1) {
			const txHash = await stakeV2Wrapper.stake(address, oracleAddr, inputValue);
			this.insertStake(txHash, inputValue);
			this.setState({ inputText: '', inputValue: 0 });
			refresh();
			console.log('Transaction submit: ' + txHash);
		} else {
			window.alert(StakingCST.STK_WARING2[locale] + '1 duo');
			this.setState({ inputText: '', inputValue: 0 });
		}
	};

	private handleAutoroll = async () => {
		const { address, refresh, award } = this.props;
		const oracleAddr = web3Wrapper.contractAddresses.Oracles[0].address;
		if (award >= 1) {
			const txHash = await stakeV2Wrapper.autoRoll(address, oracleAddr, award, { gasLimit: 200000 });
			this.insertStake(txHash, award);
			this.setState({ inputText: '', inputValue: 0 });
			refresh();
		} else {
			window.alert('Reward not enough for auto roll');
		}
	};

	public render() {
		const { address, locale, duoBalance, enableApprove, enabled, award, phase } = this.props;
		const { inputText } = this.state;
		return (
			<SCard
				title={<SCardTitle>Operation</SCardTitle>}
				width="500px"
				margin="0 0 0 0"
				height="270px"
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
							style={{
								width: 16,
								height: 16,
								marginRight: 10,
								marginLeft: 5
							}}
							src={avt}
						/>
						{StakingCST.STK_ADDRESS[locale]}:{' '}
						<span style={{ color: '#5CA4DE' }}>{address}</span>
					</a>
				</div>
				<div
					style={{
						width: 455,
						display: 'flex',
						justifyContent: 'space-between'
					}}
				>
					<SCardTag2 style={{ width: 220 }}>
						<div className="bg-logo">
							<img src={duoIcon} />
						</div>
						<div className="tag-content" style={{ pointerEvents: 'none' }}>
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_BALANCE[locale]}
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
								{d3.format(',.2f')(duoBalance)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
						<div
							style={{
								position: 'absolute',
								right: 10,
								top: 18
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
						</div>
					</SCardTag2>
					<SCardTag2 style={{ width: 220 }}>
						<div className="bg-logo">
							<img src={duoIcon} />
						</div>
						<div className="tag-content" style={{ pointerEvents: 'none' }}>
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_AWARD[locale]}
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
								{d3.format(',.2f')(award)}
							</div>
						</div>
						<div
							style={{
								position: 'absolute',
								right: 10,
								top: 18
							}}
						>
							<SStakingButtonM
								style={{
									pointerEvents: enabled ? 'initial' : 'none',
									opacity: enabled ? 1 : 0.4
								}}
								onClick={() => enabled && stakeV2Wrapper.claimReward(address)}
							>
								{StakingCST.STK_CLAIM[locale]}
							</SStakingButtonM>
						</div>
						<div
							style={{
								position: 'absolute',
								right: 10,
								top: 46
							}}
						>
							<SStakingButtonM
								onClick={() => this.handleAutoroll()}
								style={{
									pointerEvents: enabled && phase === 1 ? 'initial' : 'none',
									opacity: enabled && phase === 1 ? 1 : 0.4
								}}
							>
								{StakingCST.STK_AUTOROLL[locale]}
							</SStakingButtonM>
						</div>
					</SCardTag2>
				</div>
				<div
					style={{
						width: 455,
						marginTop: 15,
						height: 60,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
				>
					<div
						style={{
							width: '100%',
							height: 60,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: 4
						}}
					>
						<SStakingInput
							placeholder={StakingCST.STK_PLACEHODLER[locale]}
							value={inputText}
							onChange={e => this.handleInputChange(e.target.value)}
						/>
						<SStakingButtonM2
							onClick={() => this.handleStake()}
							style={{
								pointerEvents: enabled && phase === 1 ? 'initial' : 'none',
								opacity: enabled && phase === 1 ? 1 : 0.4
							}}
						>
							{StakingCST.STK_STAKE[locale]}
						</SStakingButtonM2>
					</div>
				</div>
			</SCard>
		);
	}
}
