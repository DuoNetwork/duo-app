import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IAccountBalances } from '../common/types';
import { SContent } from './_styled';
import UserCard from './Cards/UserCard';
import Header from './Header';

interface IProps {
	network: number;
	allBalances: {[index: number]: IAccountBalances};
	userLength: number;
	load: (start: number, end: number) => any;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { allBalances, userLength, network, load } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_APP} width='1000px'/>
				<SContent>
					<UserCard allBalances={allBalances} userLength={userLength} load={load}/>
				</SContent>
			</Layout>
		);
	}
}
