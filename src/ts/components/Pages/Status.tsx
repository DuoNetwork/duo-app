import { Layout } from 'antd';
import * as React from 'react';
import { IStatus } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';
import StatusCard from '../Cards/StatusCard';

interface IProps {
	status: IStatus[];
}

export default class Status extends React.Component<IProps> {
	public componentDidMount() {
		document.title = 'DUO | Status';
	}

	public render() {
		const { status } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<StatusCard status={status} />
				</SContent>
			</Layout>
		);
	}
}
