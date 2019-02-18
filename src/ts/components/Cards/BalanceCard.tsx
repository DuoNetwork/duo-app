import {
	Constants as WrapperConstants,
	ICustodianContractAddress
} from '@finbook/duo-contract-wrapper';
import classAIcon from 'images/ClassA_black.png';
import classBIcon from 'images/ClassB_black.png';
import ethIcon from 'images/ethIconB.png';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import {} from 'ts/common/types';
import BalanceInfo from 'ts/components/Cards/BalanceInfo';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle, SRefreshButton } from './_styled';
import ExtendExtraDiv from './ExtendExtraDiv';

interface IProps {
	contractAddress: ICustodianContractAddress;
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
		const {
			eth,
			aToken,
			bToken,
			account,
			refresh,
			locale,
			mobile,
			contractAddress
		} = this.props;
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
						accountShow={
							account && account !== WrapperConstants.DUMMY_ADDR ? account : 'Unknown'
						}
						account={account}
						locale={locale}
					/>
				}
			>
				<SDivFlexCenter horizontal={!mobile} padding="0 10px">
					<BalanceInfo icon={ethIcon} name={CST.TH_ETH} value={eth} mobile={mobile} />
					<BalanceInfo
						icon={classAIcon}
						name={contractAddress.aToken.code}
						value={aToken}
						mobile={mobile}
					/>
					<BalanceInfo
						icon={classBIcon}
						name={contractAddress.bToken.code}
						value={bToken}
						mobile={mobile}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
