import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IAddresses, IStatus } from '../common/types';
import { SContent } from './_styled';
import AddressCard from './Cards/AddressCard';
import StatusCard from './Cards/StatusCard';
import Header from './Header';

interface IProps {
	network: number;
	addresses: IAddresses;
	status: IStatus[];
}

export default class Status extends React.PureComponent<IProps> {
	public render() {
		const { addresses, status, network } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_APP} width='1000px'/>
				<SContent>
					<AddressCard addresses={addresses} />
					<StatusCard status={status} />
				</SContent>
			</Layout>
		);
	}
}
