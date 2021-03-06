import { ICustodianAddresses, IDualClassStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import AddressCard from '../Cards/AddressCard';
import AdminCard from '../Cards/AdminCard';
import DecodeCard from '../Cards/DecodeCard';

interface IProps {
	type: string;
	tenor: string;
	addresses: ICustodianAddresses;
	states: IDualClassStates;
	account: string;
	subscribe: (type: string, tenor: string) => any;
	unsubscribe: (type: string, tenor: string) => any;
}

interface IState {
	type: string;
	tenor: string;
}

export default class DualClassCustodianAdmin extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			type: props.type,
			tenor: props.tenor
		};
	}

	public componentDidMount() {
		this.props.subscribe(this.props.type, this.props.tenor);
		document.title = `DUO | ${this.props.type} ${this.props.tenor} Admin`;
	}

	public static getDerivedStateFromProps(props: IProps, state: IState) {
		if (props.type !== state.type || props.tenor !== state.tenor) {
			props.unsubscribe(props.type, props.tenor);
			props.subscribe(props.type, props.tenor);
			document.title = `DUO | ${props.type} ${props.tenor} Admin`;
			return {
				type: props.type,
				tenor: props.tenor
			};
		}

		return null;
	}

	public componentWillUnmount() {
		this.props.unsubscribe(this.props.type, this.props.tenor);
	}

	public render() {
		const { addresses, states, account, tenor, type } = this.props;
		const addressToList: IAddresses = {};
		Object.keys(addresses).map((key, index) => {
			const address = (addresses as any)[key] as string;
			addressToList[address] = {
				index: index,
				label: key
			};
		});

		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AdminCard
							type={type}
							tenor={tenor}
							addresses={addresses}
							states={states}
							account={account}
						/>
					</SDivFlexCenter>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AddressCard
							addresses={addressToList}
							account={account}
							title={CST.TH_ADDRESS.EN}
							showLabel
						/>
					</SDivFlexCenter>
					<DecodeCard type={type} tenor={tenor} contractName={'DUAL'} />
				</SContent>
			</Layout>
		);
	}
}
