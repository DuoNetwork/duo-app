//import moment from 'moment';
import { Tooltip } from 'antd';
import * as d3 from 'd3';
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

interface IStatusList {
	state: string;
	totalSupplyA: number;
	totalSupplyB: number;
	alpha: number;
	beta: number;
	periodCoupon: number;
	period: number;
	limitPeriodic: number;
	limitUpper: number;
	limitLower: number;
	commissionRate: number;
	ethDuoFeeRatio: number;
	addrPoolLength: number;
	nextResetAddrIndex: number;
	lastReset: number;
}

const ProgressBar = (props: { index: number; total: number }) => {
	const { index, total } = props;
	console.log(index, total);
	return (
		<SCardListProgressBar index={index + 1} total={total}>
			<div className="bar-bg">
				<div className="inner-bar" />
			</div>
			<div className="bar-text">{d3.format('.2%')((index + 1) / total)}</div>
		</SCardListProgressBar>
	);
};

const StatusList = (props: { statusList: IStatusList }) => {
	const statusList = props.statusList;

	return (
		<div className="status-list-wrapper">
			<ul>
				<li className="block-title">
					{statusList.state !== CST.CTD_LOADING
						? statusList.state === CST.CTD_TRADING
							? 'Last Reset Price'
							: 'Reset Progress'
						: CST.CTD_LOADING}
				</li>
				{statusList.state !== CST.CTD_LOADING ? (
					statusList.state === CST.CTD_TRADING ? (
						<li>
							<span className="title">ETH</span>
							<span className="content">
								{d3.formatPrefix(',.2', 1)(statusList.lastReset) + ' USD'}
							</span>
						</li>
					) : (
						<li className="no-bg">
							<ProgressBar
								index={statusList.nextResetAddrIndex}
								total={statusList.addrPoolLength}
							/>
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
						{d3.formatPrefix(',.2', 1)(statusList.totalSupplyA)}
					</span>
				</li>
				<li>
					<span className="title">Class B</span>
					<span className="content">
						{d3.formatPrefix(',.2', 1)(statusList.totalSupplyB)}
					</span>
				</li>
			</ul>
			<ul>
				<li className="block-title">Conversion Fee</li>
				<li>
					<span className="title">Rate</span>
					<span className="content">{d3.format('.2%')(statusList.commissionRate)}</span>
				</li>
				<li>
					<span className="title">ETH/DUO Ratio</span>
					<span className="content">
						1 ETH = {d3.formatPrefix(',.0', 1)(statusList.ethDuoFeeRatio)} DUO
					</span>
				</li>
			</ul>
			<ul>
				<li className="block-title">Contract Parameters</li>
				<li>
					<span className="title">Alpha</span>
					<span className="content">{d3.formatPrefix(',.2', 1)(statusList.alpha)}</span>
				</li>
				<li>
					<span className="title">Beta</span>
					<span className="content">{d3.formatPrefix(',.2', 1)(statusList.beta)}</span>
				</li>
				<li>
					<span className="title">Coupon per Period</span>
					<span className="content">{d3.format('.4%')(statusList.periodCoupon)}</span>
				</li>
				<li>
					<span className="title">Period Length</span>
					<span className="content">{statusList.period / 60 + ' mins'}</span>
				</li>
				<li>
					<span className="title">Upward Reset Limit for Class B</span>
					<span className="content">
						{d3.formatPrefix(',.2', 1)(statusList.limitUpper)}
					</span>
				</li>
				<li>
					<span className="title">Downward Reset Limit for Class B</span>
					<span className="content">
						{d3.formatPrefix(',.2', 1)(statusList.limitLower)}
					</span>
				</li>
				<li>
					<span className="title">Periodic Reset Limit for Class A</span>
					<span className="content">
						{d3.formatPrefix(',.2', 1)(statusList.limitPeriodic)}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default class StateCard extends React.PureComponent<IProps> {
	public render() {
		const { states, prices } = this.props;
		const statusList: IStatusList = {
			state: states.state,
			totalSupplyA: states.totalSupplyA,
			totalSupplyB: states.totalSupplyB,
			alpha: states.alpha,
			beta: states.beta,
			periodCoupon: states.periodCoupon,
			period: states.period,
			limitPeriodic: states.limitPeriodic,
			limitUpper: states.limitUpper,
			limitLower: states.limitLower,
			commissionRate: states.commissionRate,
			ethDuoFeeRatio: states.ethDuoFeeRatio,
			addrPoolLength: states.addrPoolLength,
			nextResetAddrIndex: states.nextResetAddrIndex,
			lastReset: prices.reset.price
		};
		const tooltioText =
			statusList.state === CST.CTD_TRADING
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
							<div>{statusList.state}</div>
							<img
								src={
									statusList.state === CST.CTD_TRADING ? successIcon : warningIcon
								}
							/>
						</Tooltip>
					</SCardExtraDivSolid>
				}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<StatusList statusList={statusList} />
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}