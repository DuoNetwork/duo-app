import * as React from 'react';
import { IBalances, ICustodianPrice, ICustodianStates } from '../common/types';

interface IProps {
	custodianStates: ICustodianStates;
	resetPrice: ICustodianPrice;
	lastPrice: ICustodianPrice;
	balances: IBalances;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { custodianStates, resetPrice, lastPrice, balances } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(custodianStates, null, 4)}</pre>
				<pre>{JSON.stringify(resetPrice, null, 4)}</pre>
				<pre>{JSON.stringify(lastPrice, null, 4)}</pre>
				<pre>{JSON.stringify(balances, null, 4)}</pre>
			</div>
		);
	}
}
