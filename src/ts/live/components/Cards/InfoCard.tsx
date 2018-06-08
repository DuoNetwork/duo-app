import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import allowanceIcon from '../../../../images/Allowance_white.png';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import duoIcon from '../../../../images/Duo_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import { ColorStyles } from '../../common/styles';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardAssetTag,
	SCardExtendExtraDiv,
	SCardExtraDiv,
	SCardPriceTag,
	SCardTitle
} from './_styled';

interface IProps {
	account: string;
	prices: ICustodianPrices;
	states: ICustodianStates;
	refresh: number;
	balances: IBalances;
}

interface IState {
	time: string;
}

const PriceInfo = (props: {
	icon: string;
	name: string;
	prices: Array<{ value: string; unit: string }>;
	classNamePostfix?: string;
}) => {
	const { icon, name, prices } = props;
	const classNamePostfix = props.classNamePostfix || '';
	return (
		<SCardPriceTag>
			<div className="bg-logo">
				<img src={icon} />
			</div>
			<div className="tag-title">
				<h3>{name}</h3>
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

const AssetInfo = (props: { icon: string; name: string; prices: string; value: number }) => {
	const { icon, name, prices, value } = props;
	return (
		<SCardAssetTag value={value}>
			<div className="bg-logo">
				<img src={icon} />
			</div>
			<div className="tag-title">
				<h3>{name}</h3>
			</div>
			<div className="tag-content">
				<div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div className={'tag-price'}>{prices}</div>
					</div>
				</div>
			</div>
		</SCardAssetTag>
	);
};

const ExtendExtraDiv = (props: { account: string }) => {
	const { account } = props;
	return (
		<SCardExtendExtraDiv color={account === 'Unknown' ? ColorStyles.TextRedAlpha : undefined}>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Address</div>
				<div className="tag-content">{account}</div>
			</div>
		</SCardExtendExtraDiv>
	);
};

export default class InfoCard extends React.PureComponent<IProps, IState> {
	public render() {
		const { prices, states, balances, account } = this.props;
		return (
			<SDivFlexCenter center horizontal marginBottom="20px;">
				<SCard
					title={<SCardTitle>PRICE</SCardTitle>}
					extra={
						<SCardExtraDiv>
							{prices.last.timestamp ? 'Last Updated: ' + moment(prices.last.timestamp).format('YYYY-MM-DD kk:mm') : 'Loading Prices'}
						</SCardExtraDiv>
					}
					width="570px"
					margin="0 10px 0 0"
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<PriceInfo
							icon={ethIcon}
							name="ETH"
							prices={[
								{
									value: d3.formatPrefix(',.2', 1)(prices.last.price),
									unit: 'USD'
								}
							]}
						/>
						<PriceInfo
							icon={classAIcon}
							name="Class A"
							prices={[
								{
									value: d3.formatPrefix(',.4', 1)(states.navA),
									unit: 'USD'
								},
								{
									value: d3.formatPrefix(',.6', 1)(
										states.navA / prices.last.price
									),
									unit: 'ETH'
								}
							]}
							classNamePostfix="-1"
						/>
						<PriceInfo
							icon={classBIcon}
							name="Class B"
							prices={[
								{
									value: d3.formatPrefix(',.4', 1)(states.navB),
									unit: 'USD'
								},
								{
									value: d3.formatPrefix(',.6', 1)(
										states.navB / prices.last.price
									),
									unit: 'ETH'
								}
							]}
							classNamePostfix="-2"
						/>
					</SDivFlexCenter>
				</SCard>
				<SCard
					title={<SCardTitle>ASSETS</SCardTitle>}
					width="690px"
					margin="0 0 0 10px"
					extra={<ExtendExtraDiv account={account ? account : 'Unknown'} />}
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<AssetInfo
							icon={ethIcon}
							name="ETH"
							prices={d3.formatPrefix(',.2', 1)(balances.eth)}
							value={balances.eth}
						/>
						<AssetInfo
							icon={duoIcon}
							name="DUO"
							prices={d3.formatPrefix(',.2', 1)(balances.duo)}
							value={balances.duo}
						/>
						<AssetInfo
							icon={allowanceIcon}
							name="Allowance"
							prices={d3.formatPrefix(',.2', 1)(balances.allowance)}
							value={balances.allowance}
						/>
						<AssetInfo
							icon={classAIcon}
							name="Class A"
							prices={d3.formatPrefix(',.2', 1)(balances.tokenA)}
							value={balances.tokenA}
						/>
						<AssetInfo
							icon={classBIcon}
							name="Class B"
							prices={d3.formatPrefix(',.2', 1)(balances.tokenB)}
							value={balances.tokenB}
						/>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
