import { Layout } from 'antd';
import * as React from 'react';
// import * as CST from 'ts/common/constants';
import { IBeethovenStates, ICustodianAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer'
import { SContent, SDivFlexCenter } from './_styled';
// import AddressCard from './Cards/AddressCard';
import AdminCard from './Cards/AdminCard';
import DecodeCard from './Cards/DecodeCard';

interface IProps {
	addresses: ICustodianAddresses;
	states: IBeethovenStates;
	// prices: IBeethovenPrices;
	// addressPool: IAddress[];
	account: string;
	subscribe: () => any;
	unsubscribe: () => any;
}

export default class BeethovanAdmin extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Beethovan Admin';
	}

	public componentWillUnmount() {
		this.props.unsubscribe();
	}

	public render() {
		const { addresses, states, account } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AdminCard addresses={addresses} states={states} account={account} />
					</SDivFlexCenter>
					{/* <SDivFlexCenter center horizontal marginBottom="20px;">
						<AddressCard
							addresses={addresses}
							addressPool={addressPool}
							account={account}
						/>
					</SDivFlexCenter> */}
					<DecodeCard />
				</SContent>
			</Layout>
		);
	}
}
