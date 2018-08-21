import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import duoIcon from '../../../../images/Duo_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { ColorStyles } from '../../common/styles';
import { IBalances } from '../../common/types';
import util from '../../common/util';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardAssetTag, SCardExtendExtraDiv, SCardTitle, SRefreshButton } from './_styled';

const BalanceInfo = (props: {
	icon: string;
	name: string;
	value: number;
	allowance?: number;
	locale?: string;
	account?: string;
	mobile?: boolean;
}) => {
	const { icon, name, value, allowance, locale, account, mobile } = props;
	return (
		<SCardAssetTag mobile={mobile}>
			<div className="bg-logo">
				<img src={icon} />
			</div>
			<div className="tag-title">
				<h3>{name}</h3>
			</div>
			<div className="tag-content">
				<div>
					<div>
						<div className={'tag-price'}>{util.formatBalance(value)}</div>
						{allowance !== undefined ? (
							<div className="tag-subtext">
								{util.formatBalance(Math.min(value, allowance)) +
									' ' +
									CST.TH_ALLOWANCE[locale || CST.LOCALE_EN]}
								<SRefreshButton
									icon="plus-square-o"
									disabled={!account || account === CST.DUMMY_ADDR}
									onClick={() =>
										account &&
										contractUtil.duoApprove(
											account,
											__KOVAN__
												? CST.CUSTODIAN_ADDR_KOVAN
												: CST.CUSTODIAN_ADDR_MAIN,
											1e8
										)
									}
								/>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</SCardAssetTag>
	);
};

const ExtendExtraDiv = (props: { accountShow: string; account: string; locale: string }) => {
	const { account, accountShow, locale } = props;
	return (
		<SCardExtendExtraDiv
			color={accountShow === 'Unknown' ? ColorStyles.TextRedAlpha : undefined}
		>
			<div className="extend-extra-wrapper">
				<div className="tag-title">{CST.TH_ADDRESS[locale]}</div>
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

interface IProps {
	locale: string;
	account: string;
	balances: IBalances;
	mobile?: boolean;
	refreshBalance: () => any;
}

export default class BalanceCard extends React.Component<IProps> {
	public render() {
		const { balances, account, refreshBalance, locale, mobile } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>
						{CST.TH_BALANCE[locale].toUpperCase()}{' '}
						<SRefreshButton icon="reload" onClick={refreshBalance} />
					</SCardTitle>
				}
				width={mobile ? '100%' : '640px'}
				margin={mobile ? '20px 0 0 0' : '0 0 0 10px'}
				extra={
					<ExtendExtraDiv
						accountShow={account ? account : 'Unknown'}
						account={account}
						locale={locale}
					/>
				}
			>
				<SDivFlexCenter horizontal={!mobile} padding="0 10px">
					<BalanceInfo
						icon={ethIcon}
						name={CST.TH_ETH}
						value={balances.eth}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={duoIcon}
						name={CST.TH_DUO}
						value={balances.duo}
						allowance={balances.allowance}
						locale={locale}
						account={account}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={classAIcon}
						name={CST.TH_TOKEN_A}
						value={balances.tokenA}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={classBIcon}
						name={CST.TH_TOKEN_B}
						value={balances.tokenB}
						mobile={mobile}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
