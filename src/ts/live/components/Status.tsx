import * as React from 'react';
import { IAddresses } from '../common/types';

interface IProps {
	addresses: IAddresses;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { addresses } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(addresses, null, 4)}</pre>
			</div>
		);
	}
}
