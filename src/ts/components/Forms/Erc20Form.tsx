//import moment from 'moment';
import { Web3Wrapper } from '@finbook/duo-contract-wrapper';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { getDualClassAddressByTypeTenor, web3Wrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCardList, SCardTransactionForm, SInput } from '../Cards/_styled';

interface IProps {
	type: string;
	tenor: string;
	locale: string;
	account: string;
	aToken: number;
	bToken: number;
	mobile?: boolean;
}

interface IState {
	isA: boolean;
	address: string;
	addressError: string;
	amount: string;
	amountError: string;
}

export default class Erc20Form extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			isA: true,
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		};
	}

	private handleTokenChange = () =>
		this.setState({
			isA: !this.state.isA,
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		});

	private handleAddressChange = (addr: string) =>
		this.setState({
			address: addr,
			addressError: Web3Wrapper.checkAddress(addr) ? '' : 'Invalid Address',
			amount: '',
			amountError: ''
		});

	private handleAmountInputChange = (value: string) =>
		this.setState({
			amount: value,
			amountError: !value || value.match(CST.RX_NUM_P) ? '' : 'Invalid number'
		});

	private handleAmountButtonClick = (amount: string) =>
		this.setState({
			amount: amount
		});

	private handleAmountBlur = (limit: number) => {
		const { amountError } = this.state;
		const amount =
			!amountError && Number(this.state.amount) > limit ? limit + '' : this.state.amount;

		this.setState({
			amount: amount
		});
	};

	private handleTransfer = () => {
		const { account, tenor, type } = this.props;
		const { isA, address, amount } = this.state;
		const dualClassAddress = getDualClassAddressByTypeTenor(type, tenor);
		const contractAddress = isA
			? dualClassAddress.aToken.address
			: dualClassAddress.bToken.address;
		web3Wrapper.erc20Transfer(contractAddress, account, address, Number(amount));
		this.handleClear();
	};

	private handleApprove = () => {
		const { account, tenor, type } = this.props;
		const { isA, address, amount } = this.state;
		const dualClassAddress = getDualClassAddressByTypeTenor(type, tenor);
		const contractAddress = isA
			? dualClassAddress.aToken.address
			: dualClassAddress.bToken.address;
		web3Wrapper.erc20Approve(contractAddress, account, address, Number(amount));
		this.handleClear();
	};

	private handleClear = () =>
		this.setState({
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		});

	public render() {
		const { aToken, bToken, locale, mobile, type, tenor } = this.props;
		const { isA, address, amount, addressError, amountError } = this.state;
		const limit = isA ? aToken : bToken;
		const dualClassAddress = getDualClassAddressByTypeTenor(type, tenor);
		return (
			<SCardTransactionForm>
				<SCardList>
					<div className="status-list-wrapper">
						<ul>
							<li className="block-title no-borderbottom">
								<span>{CST.TH_ERC20}</span>
								<SDivFlexCenter horizontal width="170px">
									<button
										className={
											isA
												? 'token-button selected'
												: 'token-button non-select'
										}
										onClick={() => !isA && this.handleTokenChange()}
									>
										{dualClassAddress.aToken.code}
									</button>
									<button
										className={
											!isA
												? 'token-button selected'
												: 'token-button non-select'
										}
										onClick={() => isA && this.handleTokenChange()}
									>
										{dualClassAddress.bToken.code}
									</button>
								</SDivFlexCenter>
							</li>
							<li className="input-line">
								<span className="title">{CST.TH_ADDRESS[locale]}</span>
								<SInput
									className={addressError ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={mobile ? '240px' : '300px'}
									value={address}
									onChange={e => this.handleAddressChange(e.target.value)}
									small
								/>
							</li>
							<li
								className={
									'input-line' +
									(!address || !!addressError || limit <= 0
										? ' input-disabled'
										: '')
								}
							>
								<SDivFlexCenter horizontal width="50%" padding="0">
									{[0.25, 0.5, 0.75, 1].map(pct => (
										<button
											key={pct + ''}
											className={
												'percent-button' + (mobile ? ' p_mobile' : '')
											}
											onClick={() =>
												this.handleAmountButtonClick(limit * pct + '')
											}
										>
											{pct * 100 + '%'}
										</button>
									))}
								</SDivFlexCenter>
								<SInput
									className={amountError ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ETH_AMOUNT[locale]}
									right
									value={amount}
									width={mobile ? '140px' : ''}
									onChange={e => this.handleAmountInputChange(e.target.value)}
									onBlur={() => this.handleAmountBlur(limit)}
								/>
							</li>
							<li className="no-bg">
								<SDivFlexCenter horizontal width="100%" padding="0">
									<button
										className={'form-button' + (mobile ? ' b_mobile' : '')}
										disabled={
											!address || !amount || !!addressError || !!amountError
										}
										onClick={this.handleTransfer}
									>
										{CST.TH_TRANSFER[locale]}
									</button>
									<button
										className={'form-button' + (mobile ? ' b_mobile' : '')}
										disabled={
											!address || !amount || !!addressError || !!amountError
										}
										onClick={this.handleApprove}
									>
										{CST.TH_APPROVE[locale]}
									</button>
									<button
										className={'form-button' + (mobile ? ' b_mobile' : '')}
										onClick={this.handleClear}
									>
										{CST.TH_CLEAR[locale]}
									</button>
								</SDivFlexCenter>
							</li>
						</ul>
					</div>
				</SCardList>
			</SCardTransactionForm>
		);
	}
}
