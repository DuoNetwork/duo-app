// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
import { IStakeLot, Web3Wrapper } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
import { stakeWrapper } from 'ts/common/wrappers';
//import * as CST from 'ts/common/constants';
import {
	SCard,
	SCardTag3,
	SCardTitle,
	SStakingButtonF,
	SStakingButtonM,
	SStakingInputM
} from './_styled';

interface IProps {
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

export default class StakingNodesCardM extends React.Component<IProps, IState> {
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
		const { myAddr, oracleAddr, myDUO, locale } = this.props;
		const { inputValue } = this.state;
		if (inputValue <= myDUO && inputValue >= 300) {
			const txHash = await stakeWrapper.stake(myAddr, oracleAddr, inputValue, {
				gasLimit: 1000000
			});
			this.setState({ inputText: '', inputValue: 0 });
			console.log('Transaction submit: ' + txHash);
		} else if (inputValue > myDUO) {
			window.alert(StakingCST.STK_WARING[locale]);
			this.setState({ inputText: '', inputValue: 0 });
		} else {
			window.alert(StakingCST.STK_WARING2[locale]);
			this.setState({ inputText: '', inputValue: 0 });
		}
	};
	private handleUnstake = async () => {
		const { myAddr, oracleAddr } = this.props;
		const txHash = await stakeWrapper.unstake(myAddr, oracleAddr, {
			gasLimit: 1000000
		});
		console.log('Transaction submit: ' + txHash);
	};
	public render() {
		const { enabled, title, myStake, oracleAddr, oracleStakes, locale } = this.props;
		const { inputText } = this.state;
		const myStakeList = myStake[oracleAddr];
		let myAccStake = 0;
		if (myStakeList)
			myStakeList.forEach(result => {
				myAccStake += Web3Wrapper.fromWei((result as any)['amtInWei']);
			});
		const estReturn =
			(3036 * Math.pow(2, Math.log(oracleStakes[oracleAddr]) / 2.3)) /
				oracleStakes[oracleAddr] || 0;
		const myReward = myAccStake * estReturn / 52;
		return (
			<SCard
				title={<SCardTitle>{title.toUpperCase()}</SCardTitle>}
				width="95%"
				margin="0 0 20px 0"
			>
				<div>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15, width: '100%', paddingTop: 0, height: 75  }}>
						<div className="tag-content" style={{margin: '10px 0 -10px 10px'}}>
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
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15, width: '100%', paddingTop: 0, height: 75  }}>
						<div className="tag-content" style={{margin: '10px 0 -10px 10px'}}>
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
								{d3.format(',.0%')(estReturn)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>p.a.</span>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15, width: '100%', paddingTop: 0, height: 75  }}>
						<div className="tag-content" style={{margin: '10px 0 -10px 10px'}}>
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
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15, width: '100%', paddingTop: 0, height: 75  }}>
						<div className="tag-content" style={{margin: '10px 0 -10px 10px'}}>
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
							width: '100%',
							marginTop: 10,
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div
							style={{
								width: '45%',
								height: 60,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							<SStakingInputM
								placeholder={StakingCST.STK_PLACEHODLER[locale]}
								value={inputText}
								onChange={e => this.handleInputChange(e.target.value)}
							/>
							<SStakingButtonM
								style={{ cursor: !enabled ? 'not-allowed' : 'default' }}
								onClick={() => enabled && this.handleStake()}
							>
								{StakingCST.STK_STAKE[locale]}
							</SStakingButtonM>
						</div>
						<SStakingButtonF
							style={{ cursor: !enabled ? 'not-allowed' : 'default', width: '45%', marginTop: 34 }}
							onClick={() => enabled && this.handleUnstake()}
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
					</div>
				</div>
			</SCard>
		);
	}
}
