import { Layout } from 'antd';
import * as React from 'react';
// import * as CST from 'ts/common/constants';
import { IBeethovenStates, ICustodianAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from './_styled';
// import AddressCard from './Cards/AddressCard';
import AdminCard from './Cards/AdminCard';
import DecodeCard from './Cards/DecodeCard';

interface IProps {
	tenor: string;
	addresses: ICustodianAddresses;
	states: IBeethovenStates;
	account: string;
	subscribe: (tenor: string) => any;
	unsubscribe: (tenor: string) => any;
}

interface IState {
	tenor: string;
}

export default class BeethovanAdmin extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			tenor: props.tenor
		};
	}

	public componentDidMount() {
		this.props.subscribe(this.props.tenor);
		document.title = 'DUO | Beethovan Admin';
	}

	public static getDerivedStateFromProps(props: IProps, state: IState) {
		if (props.tenor !== state.tenor) {
			props.unsubscribe(props.tenor);
			props.subscribe(props.tenor);
			return {
				tenor: props.tenor
			};
		}

		return null;
	}

	public componentWillUnmount() {
		this.props.unsubscribe(this.props.tenor);
	}

	public render() {
		const { addresses, states, account, tenor } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter center horizontal marginBottom="20px;">
						<AdminCard
							tenor={tenor}
							addresses={addresses}
							states={states}
							account={account}
						/>
					</SDivFlexCenter>
					<DecodeCard tenor={tenor} />
				</SContent>
			</Layout>
		);
	}
}
