import { Tooltip } from 'antd';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import infoIcon from '../../../../images/info.svg';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { IBeethovanStates, IContractPrice, ISourceData } from '../../common/types';
import util from '../../common/util';
import { SDivFlexCenter } from '../_styled';
import CardTitleSelect from '../Common/CardTitleSelect';
import { SCard, SCardExtraDiv, SCardPriceTag } from './_styled';

interface IProps {
	locale: string;
	last: IContractPrice;
	reset: IContractPrice;
	states: IBeethovanStates;
	sourceLast: ISourceData<IContractPrice>;
	mobile?: boolean;
}
interface IState {
	source: string;
}
export default class PriceCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			source: ''
		};
	}
	public render() {
		const { locale, reset, states, mobile } = this.props;
		const { source } = this.state;
		const last: IContractPrice = CST.API_LIST.includes(source)
			? this.props.sourceLast[source]
			: this.props.last;
		const [navA, navB] = CST.API_LIST.includes(source.toUpperCase())
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
		const ethChange = last.price / reset.price - 1;
		const tooltipText = (!CST.API_LIST.includes(source.toUpperCase())
			? CST.TT_CTD_NAV
			: CST.TT_EST_NAV)[locale];
		return (
			<SCard
				title={
					<CardTitleSelect
						name={CST.TH_PRICE[locale].toUpperCase()}
						source={''}
						onSelect={(src: string) => this.setState({ source: src })}
					/>
				}
				extra={
					<SCardExtraDiv>
						{last.timestamp
							? CST.TH_LAST_UPDATED[locale] +
							': ' +
							moment(last.timestamp).format('YYYY-MM-DD HH:mm')
							: CST.TH_LOADING[locale]}
					</SCardExtraDiv>
				}
				width={mobile ? '100%' : '540px'}
				margin={mobile ? '20px 0 0 0' : '0 10px 0 0'}
			>
				<SDivFlexCenter horizontal={!mobile} padding="0 10px">
					<SCardPriceTag mobile={mobile} locale={locale}>
						<div className="bg-logo">
							<img src={ethIcon} />
						</div>
						<div className="tag-title">
							<h3>{CST.TH_ETH}</h3>
						</div>
						<div className="tag-content">
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<div className={'tag-price USD'}>
									{d3.format(',.2f')(last.price)}
								</div>
								<div className={'tag-unit'}>USD</div>
							</div>
							<div className="tag-subtext">
								<div
									style={{
										color:
											ethChange >= 0
												? ColorStyles.TextGreenAlphaL
												: ColorStyles.TextRedAlphaL
									}}
								>
									{d3.format('+.2%')(ethChange)}
								</div>
								<div style={{ marginLeft: 5 }}>
									{CST.TH_SINCE_RESET[locale].toLowerCase()}
								</div>
							</div>
						</div>
					</SCardPriceTag>
					<SCardPriceTag mobile={mobile} locale={locale}>
						<div className="bg-logo">
							<img src={classAIcon} />
						</div>
						<div className="tag-title">
							<a
								className="tag-content"
								href={
									'https://' +
									(__KOVAN__ ? 'kovan.' : '') +
									'etherscan.io/tokens?q=' +
									(__KOVAN__
										? CST.A_CONTRACT_ADDR_KOVAN
										: CST.A_CONTRACT_ADDR_MAIN)
								}
								target="_blank"
							>
								{CST.TH_TOKEN_A}
							</a>
							<Tooltip title={tooltipText}>
								<img src={infoIcon} />
							</Tooltip>
						</div>
						<div className="tag-content">
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<div className={'tag-price-1 USD'}>{d3.format(',.6f')(navA)}</div>
								<div className={'tag-unit-1'}>USD</div>
							</div>
							<div className="tag-subtext">
								{d3.format('.2%')(
									(states.periodCoupon * 365 * 24 * 3600) / states.period || 0
								) +
									' ' +
									CST.TH_PA[locale].toLowerCase()}
							</div>
						</div>
					</SCardPriceTag>
					<SCardPriceTag mobile={mobile} locale={locale}>
						<div className="bg-logo">
							<img src={classBIcon} />
						</div>
						<div className="tag-title">
							<a
								className="tag-content"
								href={
									'https://' +
									(__KOVAN__ ? 'kovan.' : '') +
									'etherscan.io/tokens?q=' +
									(__KOVAN__
										? CST.B_CONTRACT_ADDR_KOVAN
										: CST.B_CONTRACT_ADDR_MAIN)
								}
								target="_blank"
							>
								{CST.TH_TOKEN_B}
							</a>
							<Tooltip title={tooltipText}>
								<img src={infoIcon} />
							</Tooltip>
						</div>
						<div className="tag-content">
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<div className={'tag-price-2 USD'}>{d3.format(',.6f')(navB)}</div>
								<div className={'tag-unit-2'}>USD</div>
							</div>
							<div className="tag-subtext">
								{d3.format('.2f')((navA + navB) / (navB || 1)) +
									'x ' +
									CST.TH_LEVERAGE[locale].toLowerCase()}
							</div>
						</div>
					</SCardPriceTag>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
