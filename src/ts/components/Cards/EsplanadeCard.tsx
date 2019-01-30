import { Constants as WrapperConstants, IEsplanadeStates } from '@finbook/duo-contract-wrapper';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import {} from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SCard, SCardExtraDiv, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	states: IEsplanadeStates;
	locale: string;
	account: string;
	moderator: string;
	refresh: () => any;
}

interface IState {
	custodianAddressErr: string;
	otherContractAddressErr: string;
	custodianAddress: string;
	otherContractAddress: string;
	firstAddressToAdd: string;
	firstAddressToAddErr: string;
	secondAddressToAdd: string;
	secondAddressToAddErr: string;
	locale: string;
}

export default class EsplanadeOperationCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			custodianAddressErr: '',
			otherContractAddressErr: '',
			custodianAddress: '',
			otherContractAddress: '',
			firstAddressToAdd: '',
			secondAddressToAdd: '',
			firstAddressToAddErr: '',
			secondAddressToAddErr: '',
			locale: props.locale
		};
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		if (nextProps.locale !== prevState.locale)
			return {
				amount: '',
				amountError: '',
				description: '',
				locale: nextProps.locale
			};

		return null;
	}

	public handleAddCustodian = () =>
		esplanadeWrapper.addCustodian(this.props.account, this.state.custodianAddress);

	public handleAddOtherContract = () =>
		esplanadeWrapper.addOtherContracts(this.props.account, this.state.otherContractAddress);

	public handleAddAddresses = (isHot: boolean) => {
		if (
			this.state.firstAddressToAdd &&
			this.state.secondAddressToAdd &&
			!this.state.firstAddressToAddErr &&
			!this.state.secondAddressToAddErr
		)
			esplanadeWrapper.addAddress(
				this.props.account,
				this.state.firstAddressToAdd,
				this.state.secondAddressToAdd,
				isHot
			);
	};

	private handleCustodianAddressChange = (addr: string) =>
		this.setState({
			custodianAddress: addr,
			custodianAddressErr: esplanadeWrapper.web3Wrapper.checkAddress(addr)
				? ''
				: 'Invalid Address'
		});
	private handleOtherContractAddressChange = (addr: string) =>
		this.setState({
			otherContractAddress: addr,
			otherContractAddressErr: esplanadeWrapper.web3Wrapper.checkAddress(addr)
				? ''
				: 'Invalid Address'
		});

	private handleAddAddressChange = (index: number, addr: string) => {
		if (index === 0)
			this.setState({
				firstAddressToAdd: addr,
				firstAddressToAddErr: esplanadeWrapper.web3Wrapper.checkAddress(addr)
					? ''
					: 'Invalid Address'
			});
		else
			this.setState({
				secondAddressToAdd: addr,
				secondAddressToAddErr: esplanadeWrapper.web3Wrapper.checkAddress(addr)
					? ''
					: 'Invalid Address'
			});
	};

	public render() {
		const { locale, states, account, moderator } = this.props;
		const { custodianAddressErr, otherContractAddressErr } = this.state;
		const isModerator = moderator === account;

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
							{WrapperConstants.ESPLANADE.toUpperCase()}
						</a>
					</SCardTitle>
				}
				width={'1000px'}
				margin={'0 0 0 10px'}
				className={!states.isStarted ? 'card-disable' : ''}
				extra={
					<SCardExtraDiv>
						{states.isStarted ? (
							'STARTED'
						) : (
							<button
								className={'form-button'}
								disabled={!isModerator}
								onClick={() => esplanadeWrapper.startManager(account)}
							>
								{CST.TH_START_ESP}
							</button>
						)}
					</SCardExtraDiv>
				}
			>
				<SCardList>
					<div className="status-list-wrapper">
						<ul>
							<li>
								<span className="title">{CST.TH_LAST_OPT_TIME}</span>
								<span className="content">
									{moment
										.utc(states.lastOperationTime)
										.format('YYYY-MM-DD HH:mm:SS')}
								</span>
							</li>
							<li>
								<span className="title">{CST.TH_OPT_COOL_DOWN}</span>
								<span className="content">
									{states.operationCoolDown / (60 * 60 * 1000) + ' hours'}
								</span>
							</li>
							<li>
								<span className="title">{CST.TH_COLD_ADDR}</span>
								<span className="content">{states.poolSizes.cold}</span>
								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									disabled={!isModerator}
									width={'400px'}
									value={''}
									onChange={e => this.handleAddAddressChange(1, e.target.value)}
									small
								/>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddAddresses(false)}
								>
									{CST.TH_ADD_ADDR + ` to cold`}
								</button>
							</li>
							<li>
								<span className="title">{CST.TH_HOT_ADDR}</span>
								<span className="content">{states.poolSizes.hot}</span>
								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={''}
									onChange={e => this.handleAddAddressChange(0, e.target.value)}
									small
								/>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddAddresses(true)}
								>
									{CST.TH_ADD_ADDR}
								</button>
							</li>
							<li>
								<span className="title">{CST.TH_CUSTODIANS}</span>
								<span className="content">{states.poolSizes.custodian}</span>
								<SInput
									className={custodianAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={this.state.custodianAddress}
									onChange={e =>
										this.handleCustodianAddressChange(e.target.value)
									}
									small
								/>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddCustodian()}
								>
									{CST.TH_ADD_CUSTODIAN}
								</button>
							</li>
							<li>
								<span className="title">{CST.TH_OTHER_CONTRACTS}</span>
								<span className="content">{states.poolSizes.otherContract}</span>
								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={this.state.otherContractAddress}
									onChange={e =>
										this.handleOtherContractAddressChange(e.target.value)
									}
									small
								/>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddOtherContract()}
								>
									{CST.TH_ADD_OTHER_CONTRACT}
								</button>
							</li>
						</ul>
					</div>
				</SCardList>
			</SCard>
		);
	}
}
