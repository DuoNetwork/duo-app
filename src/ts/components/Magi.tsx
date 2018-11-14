import { Layout } from 'antd';
import * as React from 'react';
import { IAcceptedPrice } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from './_styled';
import AcceptPriceCard from './Cards/AcceptPriceCard';

interface IProps {
	acceptedPrices: IAcceptedPrice[];
	subscribe: () => any;
	unsubscribe: () => any;
}

export default class Magi extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Oracle';
	}

	public componentWillUnmount() {
		this.props.unsubscribe();
	}

	public render() {
		const { acceptedPrices } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<AcceptPriceCard acceptedPrices={acceptedPrices} />
				</SContent>
			</Layout>
		);
	}
}
