import { IMagiStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import { IEsplanadeAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import MagiAdminCard from '../Cards/MagiAdminCard';
// import DecodeCard from '../Cards/DecodeCard';

interface IProps {
	addresses: string[];
	states: IMagiStates;
	account: string;
	locale: string;
	coldAddresses: IEsplanadeAddresses;
	subscribe: () => any;
	unsubscribe: () => any;
	refresh: () => any;
}

// interface IState {
// 	type: string;
// 	tenor: string;
// }

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
		const { addresses, states, account, locale, refresh, coldAddresses } = this.props;
		console.log('cold address ###################');
		console.log(coldAddresses);
		const isColdAddr = Object.keys(coldAddresses).includes(account);
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<MagiAdminCard
							states={states}
							addresses={addresses}
							locale={locale}
							isColdAddr={isColdAddr}
							account={account}
							refresh={refresh}
						/>
					</SDivFlexCenter>
					{/* <DecodeCard type={type} tenor={tenor} /> */}
				</SContent>
			</Layout>
		);
	}
}
