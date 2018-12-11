import { Layout } from 'antd';
import * as React from 'react';
import { IEsplanadeAddresses, IEsplanadeStates } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import EsplanadeAdminCard from '../Cards/EsplanadeAdminCard';
import EsplanadeOperationCard from '../Cards/EsplanadeOperationCard';
import EsplanadeStateCard from '../Cards/EsplanadeStateCard';

interface IProps {
	addresses: IEsplanadeAddresses;
	states: IEsplanadeStates;
	account: string;
	gasPrice: number;
	subscribe: () => any;
	unsubscribe: () => any;
	refresh: () => any;
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
		const { addresses, states, account, refresh, gasPrice } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<EsplanadeStateCard locale={'EN'} states={states} />
					<EsplanadeOperationCard
						states={states}
						locale={'EN'}
						account={account}
						gasPrice={gasPrice}
						refresh={refresh}
					/>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<EsplanadeAdminCard
							addresses={addresses}
							states={states}
							account={account}
						/>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
