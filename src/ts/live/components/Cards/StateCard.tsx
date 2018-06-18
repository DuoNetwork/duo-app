import { Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import successIcon from '../../../../images/stauts/success.svg';
import warningIcon from '../../../../images/stauts/warning.svg';
import * as CST from '../../common/constants';
import { ICustodianPrice, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardExtraDivSolid, SCardList, SCardListProgressBar, SCardTitle } from './_styled';

interface IProps {
	reset: ICustodianPrice;
	states: ICustodianStates;
}

export default class StateCard extends React.PureComponent<IProps> {
	public render() {
		const { states, reset } = this.props;
		const tooltioText =
			states.state === CST.CTD_TRADING
				? 'Trading state, operations are permitted during current state.'
				: 'Reset ongoing, operations are prohibited during current state.';
		return (
			<SCard
				title={<SCardTitle>{CST.TH_CUSTODIAN.toUpperCase()}</SCardTitle>}
				width="420px"
				margin="0 0 0 10px"
				extra={
					<SCardExtraDivSolid>
						<Tooltip title={tooltioText}>
							<div>{states.state}</div>
							<img
								src={states.state === CST.CTD_TRADING ? successIcon : warningIcon}
							/>
						</Tooltip>
					</SCardExtraDivSolid>
				}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li className="block-title">
									{states.state !== CST.CTD_LOADING ? (
										states.state === CST.CTD_TRADING ? (
											<div className="last-reset-title">
												<span>Last Reset</span>
												<span className="last-reset-title-span">
													{reset.timestamp
														? moment(reset.timestamp).format(
																'YYYY-MM-DD HH:mm'
														)
														: 'Loading'}
												</span>
											</div>
										) : (
											'Reset Progress'
										)
									) : (
										CST.CTD_LOADING
									)}
								</li>
								{states.state !== CST.CTD_LOADING ? (
									states.state === CST.CTD_TRADING ? (
										<li>
											<span className="title">ETH</span>
											<span className="content">
												{d3.formatPrefix(',.2', 1)(reset.price) + ' USD'}
											</span>
										</li>
									) : (
										<li className="no-bg">
											<SCardListProgressBar
												index={states.nextResetAddrIndex}
												total={states.usersLength}
											>
												<div className="bar-bg">
													<div className="inner-bar" />
												</div>
												<div className="bar-text">
													{d3.format('.2%')(
														states.nextResetAddrIndex /
															(states.usersLength || 1)
													)}
												</div>
											</SCardListProgressBar>
										</li>
									)
								) : (
									<li>
										<span className="title">Loading</span>
									</li>
								)}
							</ul>
							<ul>
								<li className="block-title">Contract States</li>
								<li>
									<span className="title">Alpha</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.alpha)}
									</span>
								</li>
								<li>
									<span className="title">Beta</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.beta)}
									</span>
								</li>
								<li>
									<span className="title">Coupon per Period</span>
									<span className="content">
										{d3.format('.4%')(states.periodCoupon)}
									</span>
								</li>
								<li>
									<span className="title">Period Length</span>
									<span className="content">{states.period / 60 + ' mins'}</span>
								</li>
								<li>
									<span className="title">Upward Limit for Token B</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitUpper)}
									</span>
								</li>
								<li>
									<span className="title">Downward Limit for Token B</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitLower)}
									</span>
								</li>
								<li>
									<span className="title">Periodic Limit for Token A</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitPeriodic)}
									</span>
								</li>
								<li>
									<span className="title">ETH:DUO Fee Ratio</span>
									<span className="content">1:{states.ethDuoFeeRatio}</span>
								</li>
								<li>
									<span className="title">Net ETH Balance</span>
									<span className="content">
										{d3.format(',.2f')(states.balance - states.feeAccumulated)}
									</span>
								</li>
								<li>
									<span className="title">Total Users</span>
									<span className="content">
										{states.usersLength}
									</span>
								</li>
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
