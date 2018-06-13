import { Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import successIcon from '../../../../images/stauts/success.svg';
import warningIcon from '../../../../images/stauts/warning.svg';
import * as CST from '../../common/constants';
import { ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardExtraDivSolid, SCardList, SCardListProgressBar, SCardTitle } from './_styled';

interface IProps {
	prices: ICustodianPrices;
	states: ICustodianStates;
}

export default class StateCard extends React.PureComponent<IProps> {
	public render() {
		const { states, prices } = this.props;
		const tooltioText =
			states.state === CST.CTD_TRADING
				? 'Trading state, operations are permitted during current state.'
				: 'Reset ongoing, operations are prohibited during current state.';
		return (
			<SCard
				title={<SCardTitle>CONTRACT STATES</SCardTitle>}
				width="360px"
				margin="0 10px 0 0"
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
											<div className='last-reset-title'>
												<span>Last Reset Price</span>
												<span className='last-reset-title-span'>
													{prices.reset.timestamp
														? 'Last Updated: ' +
															moment(prices.reset.timestamp).format(
																'YYYY-MM-DD kk:mm'
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
												{d3.formatPrefix(',.2', 1)(prices.reset.price) +
													' USD'}
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
								<li className="block-title">Total Supply</li>
								<li>
									<span className="title">Class A</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.totalSupplyA)}
									</span>
								</li>
								<li>
									<span className="title">Class B</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.totalSupplyB)}
									</span>
								</li>
							</ul>
							<ul>
								<li className="block-title">Conversion Fee</li>
								<li>
									<span className="title">Rate</span>
									<span className="content">
										{d3.format('.2%')(states.commissionRate)}
									</span>
								</li>
								<li>
									<span className="title">ETH/DUO Ratio</span>
									<span className="content">
										1 ETH = {d3.formatPrefix(',.0', 1)(states.ethDuoFeeRatio)}{' '}
										DUO
									</span>
								</li>
							</ul>
							<ul>
								<li className="block-title">Contract Parameters</li>
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
									<span className="title">Upward Reset Limit for Class B</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitUpper)}
									</span>
								</li>
								<li>
									<span className="title">Downward Reset Limit for Class B</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitLower)}
									</span>
								</li>
								<li>
									<span className="title">Periodic Reset Limit for Class A</span>
									<span className="content">
										{d3.formatPrefix(',.2', 1)(states.limitPeriodic)}
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
