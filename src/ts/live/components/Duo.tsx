import { Layout } from 'antd';
//import moment from 'moment';
import * as React from 'react';
//import contractUtil from '../common/contractUtil';
import { IBalances, ICustodianPrices, ICustodianStates, IPriceBars } from '../common/types';
import { SContent } from './_styled';
import GraphCard from './Cards/GraphCard';
import InfoCard from './Cards/InfoCard';
import TransactionCard from './Cards/TransactionCard';
import Header from './DuoHeader';

interface IProps {
	account: string;
	refresh: number;
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	hourly: IPriceBars;
	minutely: IPriceBars;
	network: number;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const {
			account,
			refresh,
			states,
			prices,
			balances /*, hourly, minutely*/
		} = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<InfoCard prices={prices} states={states} refresh={refresh} balances={balances} account={account}/>
					<GraphCard prices={prices} states={states} refresh={refresh} balances={balances}/>
					<TransactionCard prices={prices} states={states} refresh={refresh} balances={balances}/>
					{/*
					<SDivFlexCenter horizontal center>
						<button onClick={() => contractUtil.create(account, 0.1, true)}>
							Create 0.1 eth (fee in eth)
						</button>
						<button onClick={() => contractUtil.create(account, 0.1, false)}>
							Create 0.1 eth (fee in duo)
						</button>
						<button
							onClick={() =>
								contractUtil.redeem(account, balances.tokenA, balances.tokenB, true)
							}
						>
							Redeem all balance (fee in eth)
						</button>
						<button
							onClick={() =>
								contractUtil.redeem(
									account,
									balances.tokenA,
									balances.tokenB,
									false
								)
							}
						>
							Redeem all balance (fee in duo)
						</button>
						<button onClick={() => contractUtil.duoApprove(account, 10)}>
							Approve 10 DUO for Custodian
						</button>
					</SDivFlexCenter>
					*/}
					{/*
					<div>{account || 'Unknown'}</div>
					<div>{'Updated at ' + moment(refresh).format()}</div>
					<pre>{JSON.stringify(states, null, 4)}</pre>
					<pre>{JSON.stringify(prices, null, 4)}</pre>
					<pre>{JSON.stringify(balances, null, 4)}</pre>
					*/}
				</SContent>
			</Layout>
		);
	}
}
