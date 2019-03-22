import { IEsplanadeStates, IVotingData , Web3Wrapper} from '@finbook/duo-contract-wrapper';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IAddresses } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	locale: string;
	states: IEsplanadeStates;
	votingData: IVotingData;
	account: string;
	coldAddressPool: IAddresses;
	moderator: string;
	candidate: string;
}

interface IState {
	candidateContractAddr: string;
	candidateContractAddrErr: string;
}

export default class EsplanadeVotingCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			candidateContractAddr: '',
			candidateContractAddrErr: ''
		};
	}
	private handleCandidateContractAddressChange = (address: string) =>
		this.setState({
			candidateContractAddr: address,
			candidateContractAddrErr: Web3Wrapper.checkAddress(address)
				? ''
				: 'Invalid Address'
		});

	public handleVote = (isVotingFor: boolean) =>
		esplanadeWrapper.vote(this.props.account, isVotingFor);

	public handleStartContractVoting = () => {
		if (this.state.candidateContractAddr && !this.state.candidateContractAddrErr)
			esplanadeWrapper.startContractVoting(
				this.props.account,
				this.state.candidateContractAddr
			);
	};

	public handleStartModeratorVoting = () =>
		esplanadeWrapper.startModeratorVoting(this.props.account);

	public handleTerminateVoting = () =>
		esplanadeWrapper.terminateContractVoting(this.props.account);

	public handleTerminateByTimeout = () => esplanadeWrapper.terminateByTimeout(this.props.account);

	public render() {
		const { locale, votingData, states, coldAddressPool, moderator, candidate } = this.props;
		const { candidateContractAddr, candidateContractAddrErr } = this.state;

		const isInVoting = states.votingStage !== 'NotStarted';
		const isModerator = this.props.account === moderator;
		const isInCold = Object.keys(coldAddressPool).includes(this.props.account);

		return (
			<SCard
				title={
					<SCardTitle>
						<a
							className="tag-content"
							href={
								'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/address/' +
								esplanadeWrapper.web3Wrapper.contractAddresses.MultiSigManagers[0]
									.address
							}
							target="_blank"
							style={{ color: 'white' }}
						>
							{CST.TH_VOTING.toUpperCase()}
						</a>
					</SCardTitle>
				}
				width={'1000px'}
				margin={'0 10px 0 10px'}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList noMargin>
						<div className="status-list-wrapper">
							<ul style={{ paddingTop: '10px' }}>
								<li>
									<span className="title">{CST.TH_VOTING_STAGE}</span>
									<span className="content">{states.votingStage}</span>
								</li>
								<li>
									<span className="title">{CST.TH_MODERATOR}</span>
									<span className="content">{moderator}</span>
									<button
										className={'form-button'}
										disabled={!isInCold}
										onClick={() => this.handleStartModeratorVoting()}
									>
										{CST.TH_START_MODERATOR_VOTING}
									</button>
								</li>
								<li>
									<span className="title">{CST.TH_CANDIDATE}</span>
									<span className="content">{candidate}</span>
									<button
										className={'form-button'}
										disabled={!isInCold}
										onClick={() => this.handleTerminateByTimeout()}
									>
										{CST.TH_TERMINATE_BY_TIME_OUT}
									</button>
								</li>
								<li>
									<span className="title">{CST.TH_STARTED}</span>
									<span className="content">
										{votingData.started
											? moment
													.utc(votingData.started)
													.format('YYYY-MM-DD HH:mm:SS')
											: 'never'}
									</span>
									<button
										className={'form-button'}
										disabled={!isModerator || states.votingStage !== 'Contract'}
										onClick={() => this.handleTerminateVoting()}
									>
										{CST.TH_TERMINATE_VOTING}
									</button>
								</li>
								<li>
									<span className="title">{CST.TH_VOTE_FOR}</span>
									<span className="content">{`${votingData.votedFor}/${
										votingData.totalVoters
									}`}</span>
									<button
										className={'form-button'}
										disabled={!isInVoting || !isInCold}
										onClick={() => this.handleVote(true)}
									>
										{CST.TH_VOTE_FOR}
									</button>
								</li>
								<li>
									<span className="title">{CST.TH_VOTE_AGAINST}</span>
									<span className="content">{`${votingData.votedAgainst}/${
										votingData.totalVoters
									}`}</span>
									<button
										className={'form-button'}
										disabled={!isInVoting || !isInCold}
										onClick={() => this.handleVote(false)}
									>
										{CST.TH_VOTE_AGAINST}
									</button>
								</li>
								<li className="no-bg">
									<span className="title">{CST.TH_START_CONTRACT_VOTING}</span>
									<SInput
										className={candidateContractAddrErr ? 'input-error' : ''}
										placeholder={CST.TT_INPUT_ADDR[locale]}
										width={'400px'}
										value={candidateContractAddr}
										onChange={e =>
											this.handleCandidateContractAddressChange(
												e.target.value
											)
										}
										small
									/>
									<button
										className={'form-button'}
										disabled={!isModerator}
										onClick={() => this.handleStartContractVoting()}
									>
										{CST.TH_START_CONTRACT_VOTING}
									</button>
								</li>
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
