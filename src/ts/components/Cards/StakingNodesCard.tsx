// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
import { IStakeLot, Web3Wrapper } from '@finbook/duo-contract-wrapper';
import { Tooltip } from 'antd';
//import { Table } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
import { stakeWrappers } from 'ts/common/wrappers';
//import * as CST from 'ts/common/constants';
import {
	SCard,
	SCardTag3,
	SCardTitle,
	SStakingButtonF,
	SStakingButtonM,
	SStakingInput
} from './_styled';

interface IProps {
	contractIndex: number;
	lockTime: number;
	minStake: number;
	locale: string;
	enabled: boolean;
	title: string;
	myDUO: number;
	myStake: { [key: string]: IStakeLot[] };
	myAddr: string;
	oracleAddr: string;
	oracleStakes: { [key: string]: number };
}

interface IState {
	inputText: string;
	inputValue: number;
}

export default class StakingNodesCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			inputText: '',
			inputValue: 0
		};
	}
	private handleInputChange = (value: string) => {
		const newText =
			parseInt(value, 0).toString() === 'NaN' ? '' : parseInt(value, 0).toString();
		this.setState({ inputText: newText, inputValue: parseInt(value, 0) });
	};
	private handleStake = async () => {
		const { contractIndex, myAddr, oracleAddr, myDUO, locale, minStake } = this.props;
		const { inputValue } = this.state;
		if (inputValue <= myDUO && inputValue >= minStake) {
			const txHash = await stakeWrappers[contractIndex].stake(
				myAddr,
				oracleAddr,
				inputValue,
				{
					gasLimit: 1000000
				}
			);
			this.setState({ inputText: '', inputValue: 0 });
			console.log('Transaction submit: ' + txHash);
		} else if (inputValue > myDUO) {
			window.alert(StakingCST.STK_WARING[locale]);
			this.setState({ inputText: '', inputValue: 0 });
		} else {
			window.alert(StakingCST.STK_WARING2[locale] + minStake + 'duo');
			this.setState({ inputText: '', inputValue: 0 });
		}
	};
	private handleUnstake = async () => {
		const { contractIndex, myAddr, oracleAddr } = this.props;
		const txHash = await stakeWrappers[contractIndex].unstake(myAddr, oracleAddr, {
			gasLimit: 1000000
		});
		console.log('Transaction submit: ' + txHash);
	};
	public render() {
		const {
			enabled,
			title,
			myStake,
			oracleAddr,
			oracleStakes,
			locale,
			contractIndex,
			lockTime
		} = this.props;
		const { inputText } = this.state;
		const myStakeList = myStake[oracleAddr];
		let myAccStake = 0;
		let unstakeLock = false;
		let unlockTime = 0;
		if (myStakeList) {
			myStakeList.forEach(result => {
				myAccStake += Web3Wrapper.fromWei((result as any)['amtInWei']);
			});
			if (myStakeList[0])
				if ((myStakeList[0] as any)['timestamp'] !== '0') {
					const nowTimestamp = moment.now().valueOf();
					if (
						Number(lockTime) + Number((myStakeList[0] as any)['timestamp']) <
						nowTimestamp / 1000
					)
						unstakeLock = true;
					unlockTime = Number(lockTime) + Number((myStakeList[0] as any)['timestamp']);
				}
		}
		const estReturn =
			(4047 * Math.pow(2, Math.log(oracleStakes[oracleAddr]) / 2.3)) /
				oracleStakes[oracleAddr] || 0;
		const estReturnFix = oracleStakes[oracleAddr] > 200000 ? 1.5 : 2.5;
		const myReward = (myAccStake * (contractIndex === 0 ? estReturn : estReturnFix)) / 52;
		return (
			<SCard
				title={<SCardTitle>{title.toUpperCase()}</SCardTitle>}
				width="960px"
				margin="0 0 20px 0"
			>
				<div style={{ display: 'flex' }}>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_POOLSIZE[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									fontSize: 28,
									fontWeight: 500,
									color: '#5CA4DE',
									textAlign: 'right',
									paddingTop: 8
								}}
							>
								{d3.format(',.0f')(oracleStakes[oracleAddr] || 0)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag3>
					<Tooltip
						title={
							<div>
								<span>0~200,000: 250% p.a.</span>
								<br />
								<span>>200,000: 150% p.a.</span>
							</div>
						}
					>
						<SCardTag3 style={{ marginRight: 15,  pointerEvents: contractIndex === 0 ? 'none' : 'auto'}}>
							<div className="tag-content" style={{ pointerEvents: 'none' }}>
								<div className={'tag-price USD'} style={{ fontSize: 12 }}>
									{StakingCST.STK_ESTREUTRN[locale]}
								</div>
							</div>
							<div className="tag-subtext">
								<div
									style={{
										marginRight: 10,
										fontSize: 28,
										fontWeight: 500,
										color: '#FF7A00',
										textAlign: 'right',
										paddingTop: 8
									}}
								>
									{d3.format(',.0%')(
										contractIndex === 0 ? estReturn : estReturnFix
									)}
									<span style={{ fontSize: 10, marginLeft: 5 }}>p.a.</span>
								</div>
							</div>
						</SCardTag3>
					</Tooltip>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_MYSTAKE[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									fontSize: 28,
									fontWeight: 500,
									color: '#042F5C',
									textAlign: 'right',
									paddingTop: 8
								}}
							>
								{d3.format(',.0f')(myAccStake)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_ESTAWARD[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									fontSize: 28,
									fontWeight: 500,
									color: '#042F5C',
									textAlign: 'right',
									paddingTop: 8
								}}
							>
								{d3.format(',.0f')(myReward)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag3>
					<div
						style={{
							width: 145,
							marginTop: 10,
							height: 90,
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
								border: '1px dashed rgba(0,0,0,.2)',
								padding: 2
							}}
						>
							<SStakingInput
								placeholder={StakingCST.STK_PLACEHODLER[locale]}
								value={inputText}
								onChange={e => this.handleInputChange(e.target.value)}
							/>
							<SStakingButtonM
								style={{
									cursor: !enabled ? 'not-allowed' : 'default',
									opacity: enabled ? 1 : 0.4
								}}
								onClick={() => enabled && this.handleStake()}
							>
								{StakingCST.STK_STAKE[locale]}
							</SStakingButtonM>
						</div>
						<Tooltip
							title={
								unlockTime
									? StakingCST.STK_UNLOCKUNTIL[locale] +
									moment(unlockTime * 1000).format('MM-DD-YYYY, HH:mm')
									: StakingCST.STK_NOSTAKE[locale]
							}
						>
							<SStakingButtonF
								style={{
									cursor: enabled && unstakeLock ? 'default' : 'not-allowed',
									opacity: enabled && unstakeLock ? 1 : 0.4
								}}
								onClick={() => unstakeLock && enabled && this.handleUnstake()}
							>
								{StakingCST.STK_UNSTAKE[locale]} (
								{myStakeList
									? myStakeList[0]
										? (myStakeList[0] as any)['amtInWei'] === '0'
											? 0
											: myStakeList.length
										: 0
									: 0}
								)
							</SStakingButtonF>
						</Tooltip>
					</div>
				</div>
			</SCard>
		);
	}
}
