// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import * as d3 from 'd3';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
//import { Link } from 'react-router-dom';
import warrentUtil from 'ts/common/warrantUtil';
import { stakeWrappers } from 'ts/common/wrappers';
import { SCard, SCardTitle, SStakingButtonF, SStakingButtonM2, SStakingInput } from './_styled';

interface IProps {
	address: string;
	locale: string;
	duoBalance: number;
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
	private insertStake = async (txHash: string) => {
		const item = {
			address: this.props.address,
			amount: this.state.inputValue.toString(),
			txHash: txHash
		};
		warrentUtil.insetStakingEntry(item);
	};
	private handleStake = async () => {
		const { address, locale, refresh } = this.props;
		const contractIndex = 0;
		const oracleAddr = '0x8cff57292ab098728f26f7d2e2bdfc6b1729dddb';
		const { inputValue } = this.state;
		if (inputValue >= 300) {
			const txHash = await stakeWrappers[contractIndex].stake(
				address,
				oracleAddr,
				inputValue,
				{
					gasLimit: 1000000
				}
			);
			this.insertStake(txHash);
			this.setState({ inputText: '', inputValue: 0 });
			refresh();
			console.log('Transaction submit: ' + txHash);
		} else {
			window.alert(StakingCST.STK_WARING2[locale] + '300 duo');
			this.setState({ inputText: '', inputValue: 0 });
		}
	};
	private handleUnstake = async () => {
		const { address } = this.props;
		const txHash = await stakeWrappers[0].unstake(
			address,
			'0x8cff57292ab098728f26f7d2e2bdfc6b1729dddb',
			{
				gasLimit: 1000000
			}
		);
		console.log('Transaction submit: ' + txHash);
	};

	public render() {
		const { address, locale, duoBalance } = this.props;
		const { inputText } = this.state;
		return (
			<SCard title={<SCardTitle>Operation</SCardTitle>} width="480px" margin="0 0 0 0">
				{address}
				<br />
				{'My DUO: ' + d3.format(',.2f')(duoBalance)}
				<div
					style={{
						width: 168,
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
						<SStakingButtonM2 onClick={() => this.handleStake()}>
							{StakingCST.STK_STAKE[locale]}
						</SStakingButtonM2>
					</div>

					<SStakingButtonF onClick={() => this.handleUnstake()}>
						{StakingCST.STK_UNSTAKE[locale]}
					</SStakingButtonF>
				</div>
			</SCard>
		);
	}
}
