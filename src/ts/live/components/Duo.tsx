import { Layout } from 'antd';
//import moment from 'moment';
import * as React from 'react';
import { IBalances, ICustodianPrice, ICustodianStates } from '../common/types';
import InfoCard from '../containers/Cards/InfoCardContainer';
import NavChartCard from '../containers/Cards/NavChartCardContainer';
import PriceChartCard from '../containers/Cards/PriceChartCardContainer';
import { SContent, SDivFlexCenter } from './_styled';
import ConversionCard from './Cards/ConversionCard';
import StateCard from './Cards/StateCard';
import TransactionCard from './Cards/TransactionCard';
import Header from './DuoHeader';

interface IProps {
	states: ICustodianStates;
	reset: ICustodianPrice;
	balances: IBalances;
	network: number;
	account: string;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { states, reset, balances, network, account } = this.props;
		return (
			<Layout>
				<Header network={network} />
				<SContent>
					<InfoCard />
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<PriceChartCard />
						<NavChartCard />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<StateCard states={states} reset={reset} />
						<ConversionCard
							reset={reset}
							states={states}
							balances={balances}
							account={account}
						/>
						<TransactionCard balances={balances} account={account} />
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
