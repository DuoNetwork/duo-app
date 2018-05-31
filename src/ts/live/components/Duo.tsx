import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../common/types';

interface IProps {
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { states, prices, balances } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(states, null, 4)}</pre>
				<pre>{JSON.stringify(prices, null, 4)}</pre>
				<pre>{JSON.stringify(balances, null, 4)}</pre>
			</div>
		);
	}
}
