import classAIcon from 'images/ClassA_white.png';
import classBIcon from 'images/ClassB_white.png';
import ethIcon from 'images/ethIcon.png';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { getDualClassAddressByTypeTenor } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle, SRefreshButton } from './_styled';
import BalanceInfo from './Balanceinfo';
import ExtendExtraDiv from './ExtendExtraDiv';

interface IProps {
	type: string;
	tenor: string;
	locale: string;
	account: string;
	eth: number;
	aToken: number;
	bToken: number;
	mobile?: boolean;
	refresh: () => any;
}

export default class BalanceCard extends React.Component<IProps> {
	public render() {
		const { eth, aToken, bToken, account, refresh, locale, mobile, type, tenor } = this.props;
		const contractAddresses = getDualClassAddressByTypeTenor(type, tenor);
		return (
			<SCard
				title={
					<SCardTitle>
						{CST.TH_BALANCE[locale].toUpperCase()}{' '}
						<SRefreshButton icon="reload" onClick={refresh} />
					</SCardTitle>
				}
				width={mobile ? '100%' : '590px'}
				margin={mobile ? '20px 0 0 0' : '0 0 0 10px'}
				extra={
					<ExtendExtraDiv
						accountShow={account && account !== CST.DUMMY_ADDR ? account : 'Unknown'}
						account={account}
						locale={locale}
					/>
				}
			>
				<SDivFlexCenter horizontal={!mobile} padding="0 10px">
					<BalanceInfo
						icon={ethIcon}
						name={CST.TH_ETH}
						value={eth}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={classAIcon}
						name={contractAddresses.aToken.code}
						value={aToken}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={classBIcon}
						name={contractAddresses.aToken.code}
						value={bToken}
						mobile={mobile}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
