import { Tooltip } from 'antd';
import * as d3 from 'd3';
import successIcon from 'images/stauts/success.svg';
import warningIcon from 'images/stauts/warning.svg';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IDualClassStates } from 'ts/common/types';
import { getDualClassAddressByTypeTenor } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardExtraDivSolid, SCardList, SCardListProgressBar, SCardTitle } from './_styled';

interface IProps {
	type: string;
	tenor: string;
	locale: string;
	states: IDualClassStates;
	mobile?: boolean;
}

export default class StateCard extends React.Component<IProps> {
	public render() {
		const { states, mobile, locale, tenor, type } = this.props;
		const tooltioText =
			states.state === CST.CTD_TRADING
				? CST.TT_TRADING_STATE[locale]
				: states.state === CST.CTD_INCEPTION
				? 'Inception state, please wait until the system is started.'
				: CST.TT_RESET_STATE[locale];
		return (
			<SCard
				title={
					<SCardTitle>
						<a
							className="tag-content"
							href={
								'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/address/' +
								getDualClassAddressByTypeTenor(type, tenor).custodian.address
							}
							target="_blank"
							style={{ color: 'white' }}
						>
							{CST.BEETHOVEN.toUpperCase()}
						</a>
					</SCardTitle>
				}
				width={mobile ? '100%' : '420px'}
				margin={mobile ? '0' : '0 0 0 10px'}
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
					<SCardList noMargin>
						<div className="status-list-wrapper">
							<ul>
								<li className="block-title">
									{states.state !== CST.CTD_LOADING ? (
										states.state === CST.CTD_TRADING ? (
											<div className="last-reset-title">
												<span>{CST.TH_LAST_RESET[locale]}</span>
												<span className="last-reset-title-span">
													{states.resetPriceTime
														? moment(states.resetPriceTime).format(
																'YYYY-MM-DD HH:mm'
														)
														: CST.TH_LOADING[locale]}
												</span>
											</div>
										) : (
											CST.TH_RESET_PROGRESS[locale]
										)
									) : (
										CST.TH_LOADING[locale]
									)}
								</li>
								{states.state !== CST.CTD_LOADING ? (
									states.state === CST.CTD_TRADING ? (
										<li>
											<span className="title">ETH</span>
											<span className="content">
												{d3.formatPrefix(',.2', 1)(states.resetPrice) +
													' USD'}
											</span>
										</li>
									) : (
										<li className="no-bg">
											<SCardListProgressBar
												index={states.nextResetAddrIndex}
												total={states.totalUsers}
											>
												<div className="bar-bg">
													<div className="inner-bar" />
												</div>
												<div className="bar-text">
													{d3.format('.2%')(
														states.nextResetAddrIndex /
															(states.totalUsers || 1)
													)}
												</div>
											</SCardListProgressBar>
										</li>
									)
								) : (
									<li>
										<span className="title">{CST.TH_LOADING[locale]}</span>
									</li>
								)}
							</ul>
							<ul style={{ paddingTop: '10px' }}>
								<li className="block-title">{CST.TH_CONTRACT_STATES[locale]}</li>
								<li>
									<span className="title">{CST.TH_MATURITY[locale]}</span>
									<span className="content">
										{states.maturity
											? moment(states.maturity).format('YYYY-MM-DD HH:mm')
											: CST.TENOR_PPT}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_PERIOD_LENGTH[locale]}</span>
									<span className="content">
										{states.period / 60000 + ' mins'}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_COUPON_PER_PERIOD[locale]}
									</span>
									<span className="content">
										{d3.format('.4%')(states.periodCoupon)}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_UPPER_A[locale]}</span>
									<span className="content">
										{states.limitPeriodic
											? d3.format(',.4f')(states.limitPeriodic) + ' USD'
											: '-'}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_UPPER_B[locale]}</span>
									<span className="content">
										{d3.format(',.4f')(states.limitUpper)} USD
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_LOWER_B[locale]}</span>
									<span className="content">
										{d3.format(',.4f')(states.limitLower)} USD
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_LEVERAGE_FACTOR[locale] + ' (Alpha)'}
									</span>
									<span className="content">
										{d3.format(',.2f')(states.alpha)}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_CONVERSION_FACTOR[locale] + ' (Beta)'}
									</span>
									<span className="content">
										{d3.format(',.2f')(states.beta)}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_ETH_BALANCE[locale]}</span>
									<span className="content">
										{d3.format(',.2f')(states.ethCollateral)}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_A_SUPPLY[locale]}</span>
									<span className="content">
										{d3.format(',.2f')(states.totalSupplyA)}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_B_SUPPLY[locale]}</span>
									<span className="content">
										{d3.format(',.2f')(states.totalSupplyB)}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_TOTAL_USERS[locale]}</span>
									<span className="content">{states.totalUsers}</span>
								</li>
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
