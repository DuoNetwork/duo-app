import { IEsplanadeStates, IVotingData } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IEsplanadeAddresses } from 'ts/common/types';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';
import AddressCard from '../Cards/AddressCard';
import DecodeCard from '../Cards/DecodeCard';
import EsplanadeCard from '../Cards/EsplanadeCard';
import VotingCard from '../Cards/VotingCard';

interface IProps {
	states: IEsplanadeStates;
	hotAddressPool: IEsplanadeAddresses;
	coldAddressPool: IEsplanadeAddresses;
	custodianPool: IEsplanadeAddresses;
	otherContractPool: IEsplanadeAddresses;
	account: string;
	moderator: { address: string; balance: number };
	candidate: { address: string; balance: number };
	votingData: IVotingData;
	subscribe: () => any;
	unsubscribe: () => any;
	refresh: () => any;
}

export default class Esplanade extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Esplanade';
	}

	public componentWillUnmount() {
		this.props.unsubscribe();
	}

	public render() {
		const {
			hotAddressPool,
			coldAddressPool,
			custodianPool,
			otherContractPool,
			moderator,
			states,
			account,
			refresh,
			votingData,
			candidate
		} = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<EsplanadeCard
						states={states}
						locale={'EN'}
						account={account}
						refresh={refresh}
						moderator={moderator.address}
					/>
					<VotingCard
						account={account}
						coldAddressPool={coldAddressPool}
						states={states}
						locale={'EN'}
						votingData={votingData}
						moderator={moderator.address}
						candidate={candidate.address}
					/>
					<AddressCard
						title={CST.TH_HOT_ADDR}
						addresses={hotAddressPool}
						account={account}
						moderator={moderator.address}
						showRemove
						isHot
					/>
					<AddressCard
						title={CST.TH_COLD_ADDR}
						addresses={coldAddressPool}
						account={account}
						moderator={moderator.address}
						showRemove
					/>
					<AddressCard
						title={CST.TH_CUSTODIANS}
						addresses={custodianPool}
						account={account}
						moderator={moderator.address}
					/>
					<AddressCard
						title={CST.TH_OTHER_CONTRACTS}
						addresses={otherContractPool}
						account={account}
						moderator={moderator.address}
					/>
					<DecodeCard type={''} tenor={''}  contractName={'ESP'}/>
				</SContent>
			</Layout>
		);
	}
}
