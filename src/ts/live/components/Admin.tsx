import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IAddresses, ICustodianPrices, ICustodianStates } from '../common/types';
import { SContent, SDivFlexCenter } from './_styled';
import AddressCard from './Cards/AddressCard';
import AdminCard from './Cards/AdminCard';
import StateCard from './Cards/StateCard';
import Header from './Header';

interface IProps {
	network: number;
	addresses: IAddresses;
	states: ICustodianStates;
	prices: ICustodianPrices;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { addresses, network, states, prices } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_APP} width='1000px'/>
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AddressCard addresses={addresses} />
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AdminCard addresses={addresses}/>
						<StateCard states={states} reset={prices.reset} />
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
