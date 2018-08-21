//import moment from 'moment';
import { Tooltip } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { IBalances } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCardList, SCardTransactionForm, SInput } from '../Cards/_styled';

interface IProps {
	locale: string;
	account: string;
	balances: IBalances;
	mobile?: boolean;
}

interface IState {
	token: string;
	address: string;
	addressError: string;
	amount: string;
	amountError: string;
}

export default class Erc20Form extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			token: CST.TH_DUO,
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		};
	}

	private handleTokenChange = (type: string) =>
		this.setState({
			token: type,
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		});

	private handleAddressChange = (addr: string) =>
		this.setState({
			address: addr,
			addressError: contractUtil.checkAddress(addr) ? '' : 'Invalid Address',
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
		const { account } = this.props;
		const { token, address, amount } = this.state;
		token === CST.TH_DUO
			? contractUtil.duoTransfer(account, address, Number(amount))
			: contractUtil.transfer(account, address, Number(amount), token === CST.TH_TOKEN_A);
		this.handleClear();
	};

	private handleApprove = () => {
		const { account } = this.props;
		const { token, address, amount } = this.state;
		token === CST.TH_DUO
			? contractUtil.duoApprove(account, address, Number(amount))
			: contractUtil.approve(account, address, Number(amount), token === CST.TH_TOKEN_A);
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
		const { balances, locale, mobile } = this.props;
		const { duo, tokenA, tokenB } = balances;
		const { token, address, amount, addressError, amountError } = this.state;
		const limit = token === CST.TH_DUO ? duo : token === CST.TH_TOKEN_A ? tokenA : tokenB;
		const noTransferAddr = address === contractUtil.custodianAddr;
		return (
			<SCardTransactionForm>
				<SCardList>
					<div className="status-list-wrapper">
						<ul>
							<li className="block-title">
								<span>{CST.TH_ERC20}</span>
								<SDivFlexCenter horizontal width="200px">
									{[CST.TH_DUO, CST.TH_TOKEN_A, CST.TH_TOKEN_B].map(tk => (
										<button
											key={tk}
											className={
												token === tk
													? 'token-button selected'
													: 'token-button non-select'
											}
											onClick={() =>
												token !== tk && this.handleTokenChange(tk)
											}
										>
											{tk}
										</button>
									))}
								</SDivFlexCenter>
							</li>
							<li className="input-line">
								<span className="title">{CST.TH_ADDRESS[locale]}</span>
								{token === CST.TH_DUO ? (
									<Tooltip title={CST.TT_BEETHOVEN_ADDR[locale]} mouseEnterDelay={1.2}>
										<div
											className="default-button"
											onClick={() =>
												this.handleAddressChange(contractUtil.custodianAddr)
											}
										>
											{CST.TH_BEETHOVEN}
										</div>
									</Tooltip>
								) : null}
								<SInput
									className={addressError ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={token === CST.TH_DUO ? (mobile ? '180px' : '240px') : (mobile ? '240px' : '300px')}
									value={address}
									onChange={e => this.handleAddressChange(e.target.value)}
									small
								/>
							</li>
							<li
								className={
									'input-line' +
									(!address || !!addressError || limit <= 0 ? ' input-disabled' : '')
								}
							>
								<SDivFlexCenter horizontal width="50%" padding="0">
									{[0.25, 0.5, 0.75, 1].map(pct => (
										<button
											key={pct + ''}
											className={"percent-button" + (mobile ? ' p_mobile' : '')}
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
									placeholder={CST.TT_INPUT_AMOUNT[locale]}
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
										className={"form-button" + (mobile ? ' b_mobile' : '')}
										disabled={
											!address ||
											!amount ||
											!!addressError ||
											!!amountError ||
											noTransferAddr
										}
										onClick={this.handleTransfer}
									>
										{CST.TH_TRANSFER[locale]}
									</button>
									<button
										className={"form-button" + (mobile ? ' b_mobile' : '')}
										disabled={
											!address || !amount || !!addressError || !!amountError
										}
										onClick={this.handleApprove}
									>
										{CST.TH_APPROVE[locale]}
									</button>
									<button className={"form-button" + (mobile ? ' b_mobile' : '')} onClick={this.handleClear}>
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
