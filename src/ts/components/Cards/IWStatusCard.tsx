// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
//import * as d3 from 'd3';
import * as React from 'react';
//import { Link } from 'react-router-dom';
import * as StakingCST from 'ts/common/stakingCST';
import { SCard, SCardTag3, SCardTitle } from './_styled';

interface IProps {
	locale: string;
}

export default class IWStatusCard extends React.Component<IProps> {
	public render() {
		const {
			locale
		} = this.props;
		return (
			<SCard
				title={<SCardTitle>Inline Warrant</SCardTitle>}
				width="420px"
				margin="0 0 0 0"
			>
				<div style={{ display: 'flex' }}>
					<SCardTag3
						style={{
							pointerEvents: 'none',
							width: '100%',
							height: 'auto'
						}}
					>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 14 }}>
								{StakingCST.STK_CTSTATUS[locale]}
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
									Status
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										Open For Sale
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Upper Bound
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										+ 10.00%
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Lower Bound
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										- 9.05%
									</span>
								</div>
							</div>
						</div>
					</SCardTag3>
				</div>
			</SCard>
		);
	}
}
