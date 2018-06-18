import { Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import infoIcon from '../../../../images/info.svg';
import * as CST from '../../common/constants';
import { ICustodianPrice, ICustodianStates, ISourceData } from '../../common/types';
import util from '../../common/util';
import { SDivFlexCenter } from '../_styled';
import CardTitleSelect from '../Common/CardTitleSelect';
import {
	SCard,
	SCardExtraDiv,
	SCardPriceTag,
} from './_styled';

interface IProps {
	last: ICustodianPrice;
	reset: ICustodianPrice;
	states: ICustodianStates;
	sourceLast: ISourceData<ICustodianPrice>;
}

interface IState {
	source: string;
}

const PriceInfo = (props: {
	icon: string;
	name: string;
	prices: Array<{ value: string; unit: string }>;
	classNamePostfix?: string;
	fromContract: boolean;
}) => {
	const { icon, name, prices } = props;
	const classNamePostfix = props.classNamePostfix || '';
	const tooltipText = props.fromContract
		? 'Nav as currently in Smart Contract'
		: 'Estimated nav based selected ETH price';
	return (
		<SCardPriceTag>
			<div className="bg-logo">
				<img src={icon} />
			</div>

			<div className="tag-title">
				<h3>{name}</h3>
				{name !== 'ETH' ? (
					<Tooltip title={tooltipText}>
						<img src={infoIcon} />
					</Tooltip>
				) : null}
			</div>

			<div className="tag-content">
				<div>
					{prices.map(p => (
						<div key={p.unit} style={{ display: 'flex', flexDirection: 'row' }}>
							<div className={'tag-price' + classNamePostfix + ' ' + p.unit}>
								{p.value}
							</div>
							<div className={'tag-unit' + classNamePostfix}>{p.unit}</div>
						</div>
					))}
				</div>
			</div>
		</SCardPriceTag>
	);
};

export default class PriceCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			source: ''
		};
	}

	public render() {
		const { reset, states } = this.props;
		const { source } = this.state;
		const last: ICustodianPrice = CST.EXCHANGES.includes(source.toUpperCase())
			? this.props.sourceLast[source]
			: this.props.last;
		const [navA, navB] = CST.EXCHANGES.includes(source.toUpperCase())
			? util.calculateNav(
					last.price || 1,
					last.timestamp,
					reset.price,
					reset.timestamp,
					states.alpha,
					states.beta,
					states.period,
					states.periodCoupon
			)
			: [states.navA, states.navB];
		const fromContract = !CST.EXCHANGES.includes(source.toUpperCase());
		return (
			<SCard
				title={
					<CardTitleSelect
						name={CST.TH_PRICE.toUpperCase()}
						onSelect={(src: string) => this.setState({ source: src })}
					/>
				}
				extra={
					<SCardExtraDiv>
						{last.timestamp
							? 'Last Updated: ' + moment(last.timestamp).format('YYYY-MM-DD HH:mm')
							: 'Loading Prices'}
					</SCardExtraDiv>
				}
				width="540px"
				margin="0 10px 0 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<PriceInfo
						icon={ethIcon}
						name={CST.TH_ETH}
						prices={[
							{
								value: d3.formatPrefix(',.2', 1)(last.price),
								unit: 'USD'
							}
						]}
						fromContract={fromContract}
					/>
					<PriceInfo
						icon={classAIcon}
						name={CST.TH_TOKEN_A}
						prices={[
							{
								value: d3.formatPrefix(',.6', 1)(navA),
								unit: 'USD'
							},
							{
								value: d3.formatPrefix(',.8', 1)(navA / (last.price || 1)),
								unit: 'ETH'
							}
						]}
						fromContract={fromContract}
						classNamePostfix="-1"
					/>
					<PriceInfo
						icon={classBIcon}
						name={CST.TH_TOKEN_B}
						prices={[
							{
								value: d3.formatPrefix(',.6', 1)(navB),
								unit: 'USD'
							},
							{
								value: d3.formatPrefix(',.8', 1)(navB / (last.price || 1)),
								unit: 'ETH'
							}
						]}
						fromContract={fromContract}
						classNamePostfix="-2"
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
