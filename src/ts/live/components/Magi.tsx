import { Layout } from 'antd';
import * as React from 'react';
import { IAcceptedPrice } from '../common/types';
import { web3Wrapper } from '../common/wrappers';
import Header from '../containers/HeaderContainer';
import { SContent } from './_styled';
import AcceptPriceCard from './Cards/AcceptPriceCard';

interface IProps {
	acceptedPrices: IAcceptedPrice[];
	subscribe: (contractAddress: string) => any;
	unsubscribe: () => any;
}

export default class Magi extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe(web3Wrapper.contractAddresses.Magi);
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
