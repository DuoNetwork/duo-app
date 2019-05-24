// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import { stakeWrapper } from 'ts/common/wrappers';
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
	title: string;
	poolSize: number;
	estReturn: number;
	myDUO: number;
	myStake: number;
	myAddr: string;
	oracleAddr: string;
}

interface IState {
	inputText: string;
	inputValue: number;
}

export default class AdminCard extends React.Component<IProps, IState> {
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
		const { myAddr, oracleAddr, myDUO } = this.props;
		const { inputValue } = this.state;
		console.log('Stake Params-------------')
		console.log(myAddr)
		console.log(oracleAddr)
		if (inputValue <= myDUO) {
			const txHash = await stakeWrapper.stake(myAddr, oracleAddr, inputValue, {gasLimit: 100000});
			this.setState({ inputText: '', inputValue: 0 });
			console.log('Transaction submit: ' + txHash);
		} else {
			window.alert('Not enough DUO balance');
			this.setState({ inputText: '', inputValue: 0 });
		}
	};
	public render() {
		const { title, poolSize, estReturn, myStake } = this.props;
		const { inputText } = this.state;
		const myReward = myStake * estReturn;
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
								Pool Size
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
								{d3.format(',.0f')(poolSize)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>duo</span>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								Est Return
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
								{d3.format(',.2%')(estReturn)}
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								My Stake
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
								{d3.format(',.0f')(myStake)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>duo</span>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								My Reward
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
								<span style={{ fontSize: 10, marginLeft: 5 }}>duo</span>
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
								placeholder="Input stake number"
								value={inputText}
								onChange={e => this.handleInputChange(e.target.value)}
							/>
							<SStakingButtonM onClick={this.handleStake}>Join Node</SStakingButtonM>
						</div>
						<SStakingButtonF>Unstake</SStakingButtonF>
					</div>
				</div>
			</SCard>
		);
	}
}
