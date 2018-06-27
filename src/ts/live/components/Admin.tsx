import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IAddresses } from '../common/types';
import { SContent } from './_styled';
import AddressCard from './Cards/AddressCard';
import Header from './Header';

interface IProps {
	network: number;
	addresses: IAddresses;
}

export default class Status extends React.PureComponent<IProps> {
	public render() {
		const { addresses, network } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_APP} width='1000px'/>
				<SContent>
					<AddressCard addresses={addresses} />
				</SContent>
			</Layout>
		);
	}
}
