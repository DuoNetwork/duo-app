// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
//import * as CST from 'ts/common/constants';
import * as d3 from 'd3';
import avt from 'images/avatar.png';
import duo3d from 'images/duo-3d.png';
import duoIcon from 'images/Duo_black.png';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
//import { ColorStyles } from 'ts/common/styles';
import { stakeWrapper, web3Wrapper } from 'ts/common/wrappers';
import { SCard, SCardTag2, SCardTitle, SStakingButtonM } from './_styled';

interface IProps {
	locale: string;
	enabled: boolean;
	address: string;
	duoBalance: number;
	award: number;
}

export default class StakingPersonalCardM extends React.Component<IProps> {
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

	public render() {
		const { enabled, address, duoBalance, award, locale } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>
						{StakingCST.STK_TITLE[locale]}
						<span style={{ fontSize: 14, marginLeft: 10 }}>
							{'(' +
								StakingCST.STK_STAKE[locale] +
								'/' +
								StakingCST.STK_UNSTAKE[locale] +
								' ' +
								(enabled
									? StakingCST.STK_ENABLED[locale]
									: StakingCST.STK_DISABLED[locale]) +
								')'}
						</span>
					</SCardTitle>
				}
				width="95%"
				margin="10px 0 20px 0"
			>
				<div style={{ marginTop: 15 }}>
					<img
						style={{ width: 16, height: 16, marginRight: 10 }}
						src={avt}
					/>
					{StakingCST.STK_ADDRESS[locale]}:{' '}
					<div style={{ color: '#5CA4DE', marginTop: 10 }}>{address}</div>
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
					<SCardTag2 style={{ pointerEvents: 'none', width: '100%', paddingTop: 0, height: 75 }}>
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
					<SCardTag2 style={{ pointerEvents: 'none', width: '100%', paddingTop: 0, height: 75 }}>
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
						<SStakingButtonM style={{width: '45%'}} onClick={this.handleApprove}>{StakingCST.STK_APPROVE[locale]}</SStakingButtonM>
						<SStakingButtonM
							style={{ cursor: !enabled ? 'not-allowed' : 'default', width: '45%' }}
							onClick={() =>
								enabled ||
								stakeWrapper.claimAward(address, {
									gasLimit: 1000000
								})
							}
						>
							{StakingCST.STK_CLAIM[locale]}
						</SStakingButtonM>
					</div>
				</div>
			</SCard>
		);
	}
}
