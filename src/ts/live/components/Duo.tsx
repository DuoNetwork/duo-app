import { Layout } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
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
import ConversionMCard from './Cards/ConversionMCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';
import Header from './Header';

interface IProps {
	locale: string;
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
	updateLocale: (locale: string) => any;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const {
			locale,
			states,
			prices,
			balances,
			network,
			account,
			sourceLast,
			conversion,
			gasPrice,
			refresh,
			refreshBalance,
			updateLocale
		} = this.props;
		return (
			<div>
				<MediaQuery minDeviceWidth={900}>
					<Layout>
						<Header
							locale={locale}
							network={network}
							to={CST.TH_STATUS.EN}
							toText={CST.TH_STATUS[locale]}
							refresh={refresh}
							updateLocale={updateLocale}
						/>
						<SContent>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<TimeSeriesCard />
								<StateCard locale={locale} states={states} reset={prices.reset} />
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<PriceCard
									locale={locale}
									last={prices.last}
									reset={prices.reset}
									states={states}
									sourceLast={sourceLast}
								/>
								<BalanceCard
									locale={locale}
									account={account}
									balances={balances}
									refreshBalance={refreshBalance}
								/>
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<ConversionCard locale={locale} conversion={conversion} />
								<OperationCard
									locale={locale}
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
				</MediaQuery>
				<MediaQuery maxDeviceWidth={899}>
					<StateCard locale={locale} states={states} reset={prices.reset} mobile />
					<PriceCard
						locale={locale}
						last={prices.last}
						reset={prices.reset}
						states={states}
						sourceLast={sourceLast}
						mobile
					/>
					{account !== CST.DUMMY_ADDR ? (
						<BalanceCard
							locale={locale}
							account={account}
							balances={balances}
							refreshBalance={refreshBalance}
							mobile
						/>
					) : null}
					{account !== CST.DUMMY_ADDR ? (
						<OperationCard
							locale={locale}
							reset={prices.reset}
							states={states}
							balances={balances}
							account={account}
							refresh={refresh}
							gasPrice={gasPrice}
							mobile
						/>
					) : null}
					{account !== CST.DUMMY_ADDR ? (
						<ConversionMCard
							locale={locale}
							conversion={conversion}
						/>
					) : null}
				</MediaQuery>
			</div>
		);
	}
}
