import { Layout } from 'antd';
import * as React from 'react';
import * as CST from '../common/constants';
import { IStatus } from '../common/types';
import { SContent } from './_styled';
import StatusCard from './Cards/StatusCard';
import Header from './Header';

interface IProps {
	location: object;
	network: number;
	status: IStatus[];
}

export default class Status extends React.Component<IProps> {
	public componentDidMount() {
		document.title = 'DUO | Status';
	}

	public render() {
		const { status, network, location } = this.props;
		return (
			<Layout>
				<Header network={network} to={CST.TH_APP} location={location} width="1000px" />
				<SContent>
					<StatusCard status={status} />
				</SContent>
			</Layout>
		);
	}
}
