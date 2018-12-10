import { Layout } from 'antd';
import * as React from 'react';
import { IEsplanadeAddresses, IEsplanadeStates } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import EsplanadeAdminCard from '../Cards/EsplanadeAdminCard';

interface IProps {
	addresses: IEsplanadeAddresses;
	states: IEsplanadeStates;
	account: string;
	subscribe: () => any;
	unsubscribe: () => any;
}

export default class EsplanadeAdmin extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Esplanade Admin';
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
						<EsplanadeAdminCard
							addresses={addresses}
							states={states}
							account={account}
						/>
					</SDivFlexCenter>
					{/* <SDivFlexCenter center horizontal marginBottom="20px;">
						<AddressCard
							addresses={addresses}
							addressPool={addressPool}
							account={account}
						/>
					</SDivFlexCenter> */}
				</SContent>
			</Layout>
		);
	}
}
