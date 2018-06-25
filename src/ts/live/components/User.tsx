import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IAccountBalances } from '../common/types';
import { SContent } from './_styled';
import UserCard from './Cards/UserCard';
import Header from './Header';

interface IProps {
	network: number;
	allBalances: IAccountBalances[];
	userLength: number;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { allBalances, userLength, network } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_USER} width='1000px'/>
				<SContent>
					<UserCard allBalances={allBalances} userLength={userLength}/>
				</SContent>
			</Layout>
		);
	}
}
