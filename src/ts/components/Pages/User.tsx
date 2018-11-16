// import { Layout } from 'antd';
// import * as React from 'react';
// import * as CST from '../common/constants';
// import { IAccountBalances } from '../common/types';
// import { SContent } from './_styled';
// import UserCard from './Cards/UserCard';
// import Header from './Header';

// interface IProps {
// 	location: object;
// 	network: number;
// 	allBalances: { [index: number]: IAccountBalances };
// 	userLength: number;
// 	load: (start: number, end: number) => any;
// }

// export default class Admin extends React.Component<IProps> {
// 	public componentWillMount() {
// 		this.props.load(0, 20);
// 	}
// 	public render() {
// 		const { allBalances, userLength, network, load, location } = this.props;
// 		return (
// 			<Layout>
// 				<Header network={network} to={CST.TH_APP} location={location} width="1000px" />
// 				<SContent>
// 					<UserCard allBalances={allBalances} userLength={userLength} load={load} />
// 				</SContent>
// 			</Layout>
// 		);
// 	}
// }
