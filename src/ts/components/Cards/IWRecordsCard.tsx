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
import { SCard, SCardTitle, SCardTitleSwitch } from './_styled';

interface IProps {
	address: string;
	locale: string;
	currentRoundInfo: any;
	addressInfo: any;
	refresh: () => any;
}

interface IState {
	tagIndex: number;
}

export default class IWRecordsCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			tagIndex: 0
		};
	}

	// public componentDidMount = async () => {
	// 	this.checkTx();
	// };

	// public componentDidUpdate = async (prevProps: IProps) => {
	// 	if (
	// 		JSON.stringify(
	// 			this.props.currentRoundInfo !== JSON.stringify(prevProps.currentRoundInfo)
	// 		)
	// 	) {
	// 		this.checkTx();
	// 	}
	// };

	public render() {
		console.log('rerendered');
		const { addressInfo, currentRoundInfo } = this.props;
		const { tagIndex } = this.state;
		return (
			<SCard
				title={
					<SCardTitle>
						<SCardTitleSwitch>
							<span
								style={{
									opacity: tagIndex ? 0.75 : 1,
									pointerEvents: tagIndex ? 'auto' : 'none'
								}}
								onClick={() => this.setState({ tagIndex: 0 })}
							>
								Current Round
							</span>
							|
							<span
								style={{
									opacity: tagIndex ? 1 : 0.75,
									pointerEvents: tagIndex ? 'none' : 'auto'
								}}
								onClick={() => this.setState({ tagIndex: 1 })}
							>
								{' '}
								Last Round
							</span>
						</SCardTitleSwitch>
					</SCardTitle>
				}
				width="700px"
				margin="0 20px 0 0"
			>
				{!tagIndex ? (
					<div>{JSON.stringify(currentRoundInfo, null, '\t')}</div>
				) : (
					<div>{JSON.stringify(addressInfo, null, '\t')}</div>
				)}
			</SCard>
		);
	}
}
