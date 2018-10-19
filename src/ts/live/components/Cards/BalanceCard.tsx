import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import duoIcon from '../../../../images/Duo_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import * as CST from '../../common/constants';
import { IBalances } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle, SRefreshButton } from './_styled';
import BalanceInfo from './Balanceinfo';
import ExtendExtraDiv from './ExtendExtraDiv';

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
