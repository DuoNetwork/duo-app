import { Layout } from 'antd';
import { Affix } from 'antd';
import * as React from 'react';
import {
	IBalances,
	ICustodianPrices,
	ICustodianStates,
	IWSOrderBookSubscription
} from '../common/types';
import { SDivFlexCenter } from './_styled';
import OperationCard from './Cards/OperationCard';
import OrderbookCardSubscription from './Cards/OrderbookCardSubscription';

export interface IProps {
	wsSubMsg: IWSOrderBookSubscription;
	locale: string;
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	account: string;
	gasPrice: number;
	refresh: () => any;
	// addOrder: () => any;
	subscription: (marketId: string, pair: string) => any;
	// cancelOrder: () => any;
}

export default class Admin extends React.PureComponent<IProps> {

	public componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	private async disconnect() {
		// this.props.cancelOrder();
	}

	private async subscription() {
		this.props.subscription('orderbook', 'ZRX-WETH');
		console.log('subscription');
	}

	private addOrderButton() {
		// this.props.addOrder();
	}

	public componentDidMount() {
		this.props.subscription('orderbook', 'ZRX-WETH');
		console.log('componentDidMount');
	}

	constructor(props: IProps) {
		super(props);
	}
	public render() {
		const {
			wsSubMsg,
			states,
			refresh,
			locale,
			prices,
			balances,
			account,
			gasPrice } = this.props;
		console.log('wsSubMsg');
		return (
			<Layout>
				<div className="App">
					<header
						className="App-header"
						style={{ background: 'white', textAlign: 'center' }}
					>
						<h1 className="App-title">Welcome to DUO DEX</h1>
					</header>
					<p className="App-intro" style={{ textAlign: 'center' }}>
						<button
							onClick={() => this.addOrderButton()}
							style={{ margin: '0 0 0 20px' }}
						>
							Add Order
						</button>
						<button
							onClick={() => this.subscription()}
							style={{ margin: '0 0 0 20px' }}
						>
							Subscription
						</button>
						<button onClick={() => this.disconnect()} style={{ margin: '0 0 0 20px' }}>
							Cancel Order
						</button>
					</p>
					<SDivFlexCenter center horizontal>
						<OrderbookCardSubscription
							orderBookSubscription={wsSubMsg}
							locale={locale}
						/>
						<Affix offsetTop={20}>
							<OperationCard
								locale={locale}
								reset={prices.reset}
								states={states}
								balances={balances}
								account={account}
								refresh={refresh}
								gasPrice={gasPrice}
							/>
							</Affix>
					</SDivFlexCenter>
				</div>
			</Layout>
		);
	}
}
