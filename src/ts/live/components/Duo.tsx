import { Layout } from 'antd';
//import moment from 'moment';
import * as React from 'react';
import {
	IBalances,
	ICustodianPrice,
	ICustodianPrices,
	ICustodianStates,
	ISourceData
} from '../common/types';
import NavChartCard from '../containers/Cards/NavChartCardContainer';
import PriceChartCard from '../containers/Cards/PriceChartCardContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';
import TransactionCard from './Cards/TransactionCard';
import Header from './DuoHeader';

interface IProps {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	network: number;
	account: string;
	sourceLast: ISourceData<ICustodianPrice>;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { states, prices, balances, network, account, sourceLast } = this.props;
		return (
			<Layout>
				<Header network={network} />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceChartCard />
						<NavChartCard />
						<StateCard states={states} reset={prices.reset} />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceCard
							last={prices.last}
							reset={prices.reset}
							states={states}
							sourceLast={sourceLast}
						/>
						<BalanceCard account={account} balances={balances} states={states} />
					</SDivFlexCenter>
					<div style={{width: 1000}}/>
					<ConversionCard
						reset={prices.reset}
						states={states}
						balances={balances}
						account={account}
					/>
					<TransactionCard balances={balances} account={account} />
				</SContent>
			</Layout>
		);
	}
}
