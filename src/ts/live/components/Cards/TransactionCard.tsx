//import moment from 'moment';
import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { IBalances } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle, SCardTransactionForm, SInput } from './_styled';

interface IProps {
	account: string;
	balances: IBalances;
}

interface IState {
	isTransfer: boolean;
	token: string;
	address: string;
	addressError: string;
	amount: string;
	amountError: string;
	description: string;
}

export default class InfoCard extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			token: CST.TH_DUO,
			isTransfer: true,
			address: '',
			addressError: '',
			amount: '',
			amountError: '',
			description: ''
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
	private handleTypeChange = () =>
		this.setState({
			isTransfer: !this.state.isTransfer,
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

	private handleAmountChange = (value: string) =>
		this.setState({
			amount: value,
			amountError: !value || value.match(CST.RX_NUM_P) ? '' : 'Invalid number',
			description: ''
		});

	private handleAmountBlur = (limit: number) => {
		const { amountError, isTransfer, token } = this.state;
		const amount =
			!amountError && Number(this.state.amount) > limit ? limit + '' : this.state.amount;

		const description = !Number(amount)
			? ''
			: isTransfer
				? 'Transfer ' + amount + ' ' + token + ' out'
				: 'Approve ' + amount + ' ' + token + ' to be spent';
		this.setState({
			amount: amount,
			description: description
		});
	};

	private handleSubmit = () => {
		const { account } = this.props;
		const { token, isTransfer, address, amount } = this.state;
		isTransfer
			? token === CST.TH_DUO
				? contractUtil.duoTransfer(account, address, Number(amount))
				: contractUtil.transfer(account, address, Number(amount), token === CST.TH_TOKEN_A)
			: token === CST.TH_DUO
				? contractUtil.duoApprove(account, address, Number(amount))
				: contractUtil.approve(account, address, Number(amount), token === CST.TH_TOKEN_A);
	};

	private handleClear = () =>
		this.setState({
			address: '',
			addressError: '',
			amount: '',
			amountError: ''
		});

	public render() {
		const { duo, tokenA, tokenB } = this.props.balances;
		const {
			token,
			isTransfer,
			address,
			amount,
			addressError,
			amountError,
			description
		} = this.state;
		const limit = token === CST.TH_DUO ? duo : token === CST.TH_TOKEN_A ? tokenA : tokenB;

		return (
			<SCard title={<SCardTitle>TRANSFER</SCardTitle>} width="440px" margin="0 0 0 10px">
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardTransactionForm>
						<SDivFlexCenter horizontal width="100%" padding="10px 0 0 0">
							{[CST.TH_DUO, CST.TH_TOKEN_A, CST.TH_TOKEN_B].map(tk => (
								<button
									key={tk}
									className={
										token === tk
											? 'trans-button selected'
											: 'trans-button non-select'
									}
									onClick={() => token !== tk && this.handleTokenChange(tk)}
								>
									{tk}
								</button>
							))}
						</SDivFlexCenter>
						<SCardList>
							<div className="status-list-wrapper">
								<ul>
									<li className="block-title">Action</li>
									<li>
										<SDivFlexCenter horizontal width="100%" padding="10px 0px">
											<button
												className={
													'trans-button wide ' +
													(isTransfer ? 'selected' : 'non-select')
												}
												onClick={() =>
													!isTransfer && this.handleTypeChange()
												}
											>
												{CST.TH_TRANSFER}
											</button>
											<button
												className={
													'trans-button wide ' +
													(isTransfer ? 'non-select' : 'selected')
												}
												onClick={() =>
													isTransfer && this.handleTypeChange()
												}
											>
												{CST.TH_APPROVE}
											</button>
										</SDivFlexCenter>
									</li>
									<li className="input-line">
										<span className="title">Address</span>
										{!isTransfer && token === CST.TH_DUO ? (
											<div
												className="default-button"
												onClick={() =>
													this.handleAddressChange(
														contractUtil.custodianAddr
													)
												}
											>
												Custodian
											</div>
										) : null}
										<SInput
											className={addressError ? 'input-error' : ''}
											placeholder="Please input address"
											width="240px"
											value={address}
											onChange={e => this.handleAddressChange(e.target.value)}
											small
										/>
									</li>
									<li
										className={
											'input-line' +
											(!address || !!addressError ? ' input-disabled' : '')
										}
									>
										<SDivFlexCenter horizontal width="50%" padding="0">
											{[0.25, 0.5, 0.75, 1].map(pct => (
												<button
													key={pct + ''}
													className="percent-button"
													onClick={() =>
														this.handleAmountChange(limit * pct + '')
													}
												>
													{pct * 100 + '%'}
												</button>
											))}
										</SDivFlexCenter>
										<SInput
											className={amountError ? 'input-error' : ''}
											placeholder="Please input amount"
											right
											value={amount}
											onChange={e => this.handleAmountChange(e.target.value)}
											onBlur={() => this.handleAmountBlur(limit)}
										/>
									</li>
									<li className="description">
										<div>{addressError || amountError || description}</div>
									</li>
								</ul>
							</div>
						</SCardList>
						<SDivFlexCenter horizontal width="100%" padding="0">
							<button
								className="form-button"
								disabled={!address || !amount || !!addressError || !!amountError}
								onClick={this.handleSubmit}
							>
								{CST.TH_SUBMIT}
							</button>
							<button className="form-button" onClick={this.handleClear}>
								{CST.TH_CLEAR}
							</button>
						</SDivFlexCenter>
					</SCardTransactionForm>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
