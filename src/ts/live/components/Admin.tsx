// import { Layout } from 'antd';
// import * as React from 'react';
// import * as CST from '../common/constants';
// import { IAddress, IBeethovenAddresses, IBeethovenPrices, IBeethovenStates } from '../common/types';
// import { SContent, SDivFlexCenter } from './_styled';
// import AddressCard from './Cards/AddressCard';
// import AdminCard from './Cards/AdminCard';
// import DecodeCard from './Cards/DecodeCard';
// import Header from './Header';

// interface IProps {
// 	init: () => any;
// 	location: object;
// 	network: number;
// 	addresses: IBeethovenAddresses;
// 	states: IBeethovenStates;
// 	prices: IBeethovenPrices;
// 	addressPool: IAddress[];
// 	account: string;
// }

// export default class Admin extends React.Component<IProps> {
// 	public componentDidMount() {
// 		this.props.init();
// 	}
// 	public render() {
// 		const { addresses, network, states, addressPool, account, location } = this.props;
// 		return (
// 			<Layout>
// 				<Header network={network} to={CST.TH_APP} location={location} width="1000px" />
// 				<SContent>
// 					<SDivFlexCenter center horizontal marginBottom="20px;">
// 						<AdminCard addresses={addresses} states={states} account={account} />
// 					</SDivFlexCenter>
// 					<SDivFlexCenter center horizontal marginBottom="20px;">
// 						<AddressCard
// 							addresses={addresses}
// 							addressPool={addressPool}
// 							account={account}
// 						/>
// 					</SDivFlexCenter>
// 					<DecodeCard />
// 				</SContent>
// 			</Layout>
// 		);
// 	}
// }
