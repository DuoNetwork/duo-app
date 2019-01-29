import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IEsplanadeStates } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SCard, SCardExtraDiv, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	states: IEsplanadeStates;
	locale: string;
	account: string;
	moderator: string;
	gasPrice: number;
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
		const { gasPrice, locale, states, account, moderator } = this.props;
		const { custodianAddressErr, otherContractAddressErr } = this.state;
		const isModerator = moderator === account;

		return (
			<SCard
				title={<SCardTitle>{CST.TH_OPERATION[locale].toUpperCase()}</SCardTitle>}
				width={'440px'}
				margin={'0 0 0 10px'}
				className={!states.isStarted ? 'card-disable' : ''}
				extra={
					<SCardExtraDiv>
						{CST.TH_NETWORK_GAS_PRICE[locale] +
							': ' +
							(gasPrice
								? +Math.round(gasPrice / 1e9) + ' Gwei'
								: CST.TH_LOADING[locale])}
					</SCardExtraDiv>
				}
			>
				<SCardList>
					<div className="status-list-wrapper">
						<ul>
							<li className="no-bg">
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => esplanadeWrapper.startManager(account)}
								>
									{CST.TH_START_ESP}
								</button>
							</li>
							<li className="no-bg">
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

							<li className="no-bg">
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

							<li className="no-bg">
								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={''}
									onChange={e => this.handleAddAddressChange(0, e.target.value)}
									small
								/>

								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									disabled={!isModerator}
									width={'400px'}
									value={''}
									onChange={e => this.handleAddAddressChange(1, e.target.value)}
									small
								/>
							</li>
							<li>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddAddresses(true)}
								>
									{CST.TH_ADD_ADDR + ` to hot`}
								</button>
								<button
									className={'form-button'}
									disabled={!isModerator}
									onClick={() => this.handleAddAddresses(false)}
								>
									{CST.TH_ADD_ADDR + ` to cold`}
								</button>
							</li>
						</ul>
					</div>
				</SCardList>
			</SCard>
		);
	}
}
