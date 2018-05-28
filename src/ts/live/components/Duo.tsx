import * as React from 'react';
import { ICustodianPrice, ICustodianStates } from '../common/types';

interface IProps {
	custodianStates: ICustodianStates;
	resetPrice: ICustodianPrice;
	lastPrice: ICustodianPrice;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { custodianStates, resetPrice, lastPrice } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(custodianStates, null, 4)}</pre>
				<pre>{JSON.stringify(resetPrice, null, 4)}</pre>
				<pre>{JSON.stringify(lastPrice, null, 4)}</pre>
			</div>
		);
	}
}
