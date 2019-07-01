// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import * as d3 from 'd3';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as StakingCST from 'ts/common/stakingCST';
import { SCard, SCardTag3, SCardTitle, SStakingSwitch } from './_styled';

interface IProps {
	contractIndex: number;
	locale: string;
	contractStates: IStakeStates;
	title: string;
	oracleStakes: { [key: string]: number };
	addresses: IStakeAddress;
}

export default class StakingInfoCard extends React.Component<IProps> {
	public render() {
		const {
			contractIndex,
			title,
			oracleStakes,
			addresses,
			locale,
			contractStates
		} = this.props;
		const returns: number[] = [];
		let totalStake = 0;
		let estReturnFix = 1.5;
		if (addresses.priceFeedList.length)
			addresses.priceFeedList.map(addr => {
				if (oracleStakes[addr] < 200000) estReturnFix = 2.5;
				totalStake += oracleStakes[addr];
				const estReturn =
					(4047 * Math.pow(2, Math.log(oracleStakes[addr]) / 2.3)) / oracleStakes[addr] ||
					0;
				returns.push(estReturn);
			});
		const maxReturn = contractIndex === 0 ? Math.max(Math.max(...returns), 0) : estReturnFix;
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
								{StakingCST.STK_CTSTATUS[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									fontSize: 24,
									fontWeight: 500,
									color: addresses.priceFeedList.length
										? contractStates.canStake
											? '#5CA4DE'
											: '#FF5E5E'
										: '#FF5E5E',
									textAlign: 'right',
									paddingTop: 8
								}}
							>
								{addresses.priceFeedList.length
									? contractStates.canStake
										? StakingCST.STK_ENABLED[locale]
										: StakingCST.STK_DISABLED[locale]
									: StakingCST.STK_LOADING[locale]}
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15, width: 200 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_CTRULES[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									fontSize: 13,
									fontWeight: 500,
									padding: '0 10px 0 10px',
									color: 'rgba(0,0,0,.6)'
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									{StakingCST.STK_CTMINSTAKE[locale]}
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{contractStates.minStakeAmt}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									{StakingCST.STK_CTLOCKTIME[locale]}
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{contractStates.lockMinTimeInSecond / 86400 + ' days'}
									</span>
								</div>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_CTSTAKE[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									fontSize: 24,
									fontWeight: 500,
									color: '#5CA4DE',
									textAlign: 'right',
									paddingTop: 8
								}}
							>
								{d3.format(',.0f')(totalStake || 0)}
								<span style={{ fontSize: 10, marginLeft: 5 }}>DUO</span>
							</div>
						</div>
					</SCardTag3>
					<SCardTag3 style={{ pointerEvents: 'none', marginRight: 15 }}>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 12 }}>
								{StakingCST.STK_CTRETURN[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									marginRight: 10,
									marginTop: -5,
									fontSize: 40,
									fontWeight: 500,
									color: '#FF7A00',
									textAlign: 'right'
								}}
							>
								{d3.format(',.0%')(maxReturn)}
							</div>
						</div>
					</SCardTag3>
					<div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
						<Link to={contractIndex === 0 ? '/stakingterm' : '/staking'}>
							<SStakingSwitch>
								{contractIndex === 0
									? StakingCST.STK_TOFIX[locale]
									: StakingCST.STK_TOFLEX[locale]}
							</SStakingSwitch>
						</Link>
					</div>
				</div>
			</SCard>
		);
	}
}
