import * as React from 'react';
import { IAddresses, IPriceStatus, IStatus } from '../common/types';
import util from '../common/util';

interface IProps {
	addresses: IAddresses;
	status: IStatus[];
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { addresses, status } = this.props;
		return (
			<div>
				<pre>{JSON.stringify(addresses, null, 4)}</pre>
				<table>
					<thead>
						<tr>
							<th>Process</th>
							<th>Updated</th>
							<th>Price</th>
							<th>Volume</th>
						</tr>
					</thead>
					<tbody>
						{status.map(
							(s, i) =>
								(s as IPriceStatus).price ? (
									<tr key={i}>
										<td>{s.process}</td>
										<td>{util.convertUpdateTime(s.timestamp)}</td>
										<td>{(s as IPriceStatus).price}</td>
										<td>{(s as IPriceStatus).volume}</td>
									</tr>
								) : (
									<tr key={i}>
										<td>{s.process}</td>
										<td>{util.convertUpdateTime(s.timestamp)}</td>
										<td />
										<td />
									</tr>
								)
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
