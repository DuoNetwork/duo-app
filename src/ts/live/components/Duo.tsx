import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import {
	IBalances,
	IConversion,
	ICustodianPrice,
	ICustodianPrices,
	ICustodianStates,
	ISourceData
} from '../common/types';
import TimeSeriesCard from '../containers/Cards/TimeSeriesCardContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';
import Header from './Header';

interface IProps {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	network: number;
	account: string;
	sourceLast: ISourceData<ICustodianPrice>;
	conversion: IConversion[];
	gasPrice: number;
	refresh: () => any;
	refreshBalance: () => any;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const {
			states,
			prices,
			balances,
			network,
			account,
			sourceLast,
			conversion,
			gasPrice,
			refresh,
			refreshBalance
		} = this.props;
		return (
			<Layout>
				<Header account={account} network={network} to={CST.TH_STATUS} refresh={refresh} />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<TimeSeriesCard />
						<StateCard states={states} reset={prices.reset} />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceCard
							last={prices.last}
							reset={prices.reset}
							states={states}
							sourceLast={sourceLast}
						/>
						<BalanceCard
							account={account}
							balances={balances}
							refreshBalance={refreshBalance}
						/>
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<ConversionCard conversion={conversion} />
						<OperationCard
							reset={prices.reset}
							states={states}
							balances={balances}
							account={account}
							refresh={refresh}
							gasPrice={gasPrice}
						/>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
