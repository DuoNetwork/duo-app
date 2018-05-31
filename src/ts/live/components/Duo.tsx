import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../common/types';

interface IProps {
	custodianStates: ICustodianStates;
	custodianPrices: ICustodianPrices;
	balances: IBalances;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { custodianStates, custodianPrices, balances } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(custodianStates, null, 4)}</pre>
				<pre>{JSON.stringify(custodianPrices, null, 4)}</pre>
				<pre>{JSON.stringify(balances, null, 4)}</pre>
			</div>
		);
	}
}
