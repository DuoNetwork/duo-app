import { Tooltip } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import duoIcon from '../../../../images/Duo_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import * as CST from '../../common/constants';
import { ColorStyles } from '../../common/styles';
import { IBalances } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardAssetTag, SCardExtendExtraDiv, SCardTitle } from './_styled';

interface IProps {
	account: string;
	balances: IBalances;
}

const BalanceInfo = (props: { icon: string; name: string; value: number; allowance?: number }) => {
	const { icon, name, value, allowance } = props;
	return (
		<SCardAssetTag>
			<div className="bg-logo">
				<img src={icon} />
			</div>
			<div className="tag-title">
				<h3>{name}</h3>
			</div>
			<div className="tag-content">
				<div>
					<div>
						<div className={'tag-price'}>
							{d3
								.format(value > 1 ? ',.4s' : ',.4n')(value)
								.toUpperCase()
								.replace(/G/g, 'B')}
						</div>
						{allowance !== undefined ? (
							<Tooltip title={'Allowance for ' + CST.TH_BEETHOVEN}>
								<div className="tag-subtext">
									{d3
										.format(allowance > 1 ? ',.4s' : ',.4n')(allowance)
										.toUpperCase()
										.replace(/G/g, 'B') + ' allowance'}
								</div>
							</Tooltip>
						) : null}
					</div>
				</div>
			</div>
		</SCardAssetTag>
	);
};

const ExtendExtraDiv = (props: { accountShow: string; account: string }) => {
	const { account, accountShow } = props;
	return (
		<SCardExtendExtraDiv
			color={accountShow === 'Unknown' ? ColorStyles.TextRedAlpha : undefined}
		>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Address</div>
				<a
					className="tag-content"
					href={
						'https://' +
						(__KOVAN__ ? 'kovan.' : '') +
						'etherscan.io' +
						(account ? '/address/' + account : '')
					}
					target="_blank"
				>
					{accountShow}
				</a>
			</div>
		</SCardExtendExtraDiv>
	);
};

export default class BalanceCard extends React.Component<IProps> {
	public render() {
		const { balances, account } = this.props;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_BALANCE.toUpperCase()}</SCardTitle>}
				width="640px"
				margin="0 0 0 10px"
				extra={
					<ExtendExtraDiv accountShow={account ? account : 'Unknown'} account={account} />
				}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<BalanceInfo icon={ethIcon} name={CST.TH_ETH} value={balances.eth} />
					<BalanceInfo
						icon={duoIcon}
						name={CST.TH_DUO}
						value={balances.duo}
						allowance={balances.allowance}
					/>
					<BalanceInfo icon={classAIcon} name={CST.TH_TOKEN_A} value={balances.tokenA} />
					<BalanceInfo icon={classBIcon} name={CST.TH_TOKEN_B} value={balances.tokenB} />
				</SDivFlexCenter>
			</SCard>
		);
	}
}
