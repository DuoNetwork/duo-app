// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { Table } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
//import * as CST from 'ts/common/constants';
import { SCard, SCardTag3, SCardTitle, SStakingButtonF, SStakingButtonM } from './_styled';

interface IProps {
	title: string;
	poolSize: number;
	estReturn: number;
	myStake: number;
}

export default class AdminCard extends React.Component<IProps> {
	public render() {
		const { title, poolSize, estReturn, myStake } = this.props;
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
									textAlign: 'right'
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
									textAlign: 'right'
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
									textAlign: 'right'
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
									textAlign: 'right'
								}}
							>
								{d3.format(',.0f')(myReward)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>duo</span>
							</div>
						</div>
					</SCardTag3>
					<div style={{width: 145, marginTop: 10, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<SStakingButtonM>Join Node</SStakingButtonM>
						<SStakingButtonF>Unstake</SStakingButtonF>
					</div>
				</div>
			</SCard>
		);
	}
}
