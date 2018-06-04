import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates, IPriceBars } from '../common/types';

interface IProps {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	hourly: IPriceBars;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { states, prices, balances, hourly } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(states, null, 4)}</pre>
				<pre>{JSON.stringify(prices, null, 4)}</pre>
				<pre>{JSON.stringify(balances, null, 4)}</pre>
				<pre>{JSON.stringify(hourly, null, 4)}</pre>
			</div>
		);
	}
}
