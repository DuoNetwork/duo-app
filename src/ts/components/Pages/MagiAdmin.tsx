import { IMagiStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import { IEsplanadeAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import MagiAdminCard from '../Cards/MagiAdminCard';

interface IProps {
	priceFeedAddrs: string[];
	states: IMagiStates;
	account: string;
	locale: string;
	coldAddresses: IEsplanadeAddresses;
	subscribe: () => any;
	unsubscribe: () => any;
	refresh: () => any;
}

export default class MagiAdmin extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}
	public componentDidMount() {
		this.props.subscribe();
		document.title = `DUO | MagiAdmin`;
	}

	public componentWillUnmount() {
		this.props.unsubscribe();
	}

	public render() {
		const { priceFeedAddrs, states, account, locale, refresh, coldAddresses } = this.props;
		const isColdAddr = Object.keys(coldAddresses).includes(account);
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<MagiAdminCard
							states={states}
							priceFeedAddrs={priceFeedAddrs}
							locale={locale}
							isColdAddr={isColdAddr}
							account={account}
							refresh={refresh}
						/>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
