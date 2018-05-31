import * as React from 'react';
import { IAddresses } from '../common/types';

interface IProps {
	addresses: IAddresses;
	status: object;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { addresses, status } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(addresses, null, 4)}</pre>
				<pre>{JSON.stringify(status, null, 4)}</pre>
			</div>
		);
	}
}
