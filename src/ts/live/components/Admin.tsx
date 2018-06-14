import * as React from 'react';
import { IAccountBalances } from '../common/types';
// import util from '../common/util';

interface IProps {
	allBalances: IAccountBalances[];
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { allBalances } = this.props;
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Account</th>
							<th>ETH balance</th>
							<th>DUO balance</th>
							<th>TokenA balance</th>
							<th>TokenB balance</th>
							<th>Allowance</th>
						</tr>
					</thead>
					<tbody>
						{allBalances.map((s, i) => (
							<tr key={i}>
								<td>{s.account}</td>
								<td>{s.eth}</td>
								<td>{s.duo}</td>
								<td>{s.tokenA}</td>
								<td>{s.tokenB}</td>
								<td>{s.allowance}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
