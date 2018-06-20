import { Layout } from 'antd';
import * as React from 'react';
import {
	IBalances,
	IConversion,
	ICustodianPrice,
	ICustodianPrices,
	ICustodianStates,
	ISourceData
} from '../common/types';
import PriceChartCard from '../containers/Cards/PriceChartCardContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';
import Header from './DuoHeader';

interface IProps {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	network: number;
	account: string;
	sourceLast: ISourceData<ICustodianPrice>;
	conversion: IConversion[],
	uiConversion: IConversion[],
	refresh: () => any
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { states, prices, balances, network, account, sourceLast, conversion, refresh, uiConversion } = this.props;
		return (
			<Layout>
				<Header network={network} />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceChartCard />
						<StateCard states={states} reset={prices.reset} />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceCard
							last={prices.last}
							reset={prices.reset}
							states={states}
							sourceLast={sourceLast}
						/>
						<BalanceCard account={account} balances={balances} />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<ConversionCard conversion={conversion} uiConversion={uiConversion}/>
						<OperationCard
							reset={prices.reset}
							states={states}
							balances={balances}
							account={account}
							refresh={refresh}
						/>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
