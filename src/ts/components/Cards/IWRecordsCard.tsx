// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
//import * as d3 from 'd3';
//import moment from 'moment';
import * as React from 'react';
//import { Link } from 'react-router-dom';
//import * as StakingCST from 'ts/common/stakingCST';
//import * as CST from 'ts/common/constants';
//import warrantUtil from 'ts/common/warrantUtil';
//import { web3Wrapper } from 'ts/common/wrappers';
import { SCard, SCardTitle, SCardTitleSwitch, SRefreshButton } from './_styled';

interface IProps {
	address: string;
	locale: string;
	currentRoundInfo: any;
	addressInfo: any;
	refresh: () => any;
}

// interface IState {
// 	tagIndex: number;
// }

export default class IWRecordsCard extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		// this.state = {
		// 	tagIndex: 0
		// };
	}

	private intervalID: number = 0;

	private fetchData = () => {
		console.log('fetching');
		this.props.refresh();
	};

	public componentDidMount() {
		this.fetchData();
		this.intervalID = window.setTimeout(() => this.fetchData(), 2000);
		console.log(this.props.refresh);
	}

	public componentWillUnmount() {
		window.clearInterval(this.intervalID);
	}

	public render() {
		const { addressInfo, currentRoundInfo, refresh } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>
						<SCardTitleSwitch>Records</SCardTitleSwitch>
					</SCardTitle>
				}
				width="700px"
				margin="0 20px 0 0"
				extra={
					<SRefreshButton icon="reload" onClick={refresh} />
				}
			>
				<div>{JSON.stringify(currentRoundInfo, null, '\t')}</div>
				<div>{JSON.stringify(addressInfo, null, '\t')}</div>
			</SCard>
		);
	}
}
