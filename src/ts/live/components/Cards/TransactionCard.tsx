//import moment from 'moment';
import { Radio, Tooltip } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import demoCreate from '../../../../images/createDemo.png';
import infoIcon from '../../../../images/info.svg';
import demoRedeem from '../../../../images/redeemDemo.png';
import contractUtil from '../../common/contractUtil';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardConversionForm,
	SCardList,
	SCardRadioExtraDiv,
	SCardTitle,
	SCardTransactionForm,
	SInput,
	SRadioGroup
} from './_styled';
import StateCard from './StateCard';

const RadioButton = Radio.Button;

interface IProps {
	prices: ICustodianPrices;
	states: ICustodianStates;
	refresh: number;
	balances: IBalances;
	account: string;
}

interface IState {
	ethFee: boolean;
	conversionType: string;
	transactionType: string;
	conversionInput: string;
	conversionInputValue: number;
}

const RadioExtraDiv = (props: { changeFeePayment: () => void; eth: boolean }) => {
	return (
		<SCardRadioExtraDiv>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Fee Payment Method</div>
				<SRadioGroup
					defaultValue="a"
					size="small"
					onChange={props.changeFeePayment}
					value={props.eth ? 'a' : 'b'}
				>
					<RadioButton value="a">ETH</RadioButton>
					<RadioButton value="b">DUO</RadioButton>
				</SRadioGroup>
			</div>
		</SCardRadioExtraDiv>
	);
};

const ConversionForm = (props: {
	conversionType: string;
	changeConversionType: (type: string) => void;
	balances: IBalances;
	ethFee: boolean;
	inputConversionAmount: (amount: string, limit: number) => void;
	conversionInput: string;
	conversionInputValue: number;
	lastResetETHPrice: number;
	commissionRate: number;
	ethDuoFeeRatio: number;
	limit: number;
	handleRatio: (limit: number, ratio: number) => void;
	clear: () => void;
	account: string;
}) => {
	const {
		conversionType,
		changeConversionType,
		ethFee,
		conversionInput,
		inputConversionAmount,
		conversionInputValue,
		lastResetETHPrice,
		commissionRate,
		ethDuoFeeRatio,
		limit,
		handleRatio,
		clear,
		account
	} = props;
	const { eth, tokenA, tokenB } = props.balances;
	const valueBeforeFee =
		conversionType === 'create'
			? conversionInputValue * lastResetETHPrice
			: (conversionInputValue * 2) / lastResetETHPrice;
	const conversionFeeValue = ethFee
		? valueBeforeFee * commissionRate
		: valueBeforeFee * commissionRate * ethDuoFeeRatio;
	const valueAfterFee = ethFee ? valueBeforeFee - conversionFeeValue : valueBeforeFee;
	const conversionOutcome = conversionType === 'create' ? valueAfterFee / 2 : valueAfterFee;
	const descriptionText =
		'' +
		(conversionType === 'create' ? 'Split ' : 'Combine ') +
		conversionInputValue +
		(conversionType === 'create' ? ' ETH' : ' Class A/B') +
		' into ' +
		(conversionOutcome ? d3.formatPrefix(',.8', 1)(conversionOutcome) : 0) +
		(conversionType === 'create' ? ' Class A/B' : ' ETH');
	const tooltipText = 'Estimated outcome may vary from actual result';
	return (
		<SCardConversionForm>
			<SDivFlexCenter horizontal width="100%" padding="10px 0 0 0">
				<button
					className={
						conversionType === 'create'
							? 'conv-button selected'
							: 'conv-button non-select'
					}
					onClick={() => conversionType !== 'create' && changeConversionType('create')}
				>
					CREATION
				</button>
				<button
					className={
						conversionType === 'redeem'
							? 'conv-button selected'
							: 'conv-button non-select'
					}
					onClick={() => conversionType !== 'redeem' && changeConversionType('redeem')}
				>
					REDEMPTION
				</button>
			</SDivFlexCenter>
			<SCardList>
				<div className="status-list-wrapper">
					<ul>
						<li className="block-title">Available Tokens</li>
						<li>
							<span className="title">ETH</span>
							<span className="content">{eth}</span>
						</li>
						<li>
							<span className="title">Class A</span>
							<span className="content">{tokenA}</span>
						</li>
						<li>
							<span className="title">Class B</span>
							<span className="content">{tokenB}</span>
						</li>
					</ul>
					<ul>
						<li className="block-title">Conversion Amount</li>
						<li className="input-line">
							<SDivFlexCenter horizontal width="50%" padding="0">
								<button
									className="percent-button"
									onClick={() => handleRatio(limit, 0.25)}
								>
									25%
								</button>
								<button
									className="percent-button"
									onClick={() => handleRatio(limit, 0.5)}
								>
									50%
								</button>
								<button
									className="percent-button"
									onClick={() => handleRatio(limit, 0.75)}
								>
									75%
								</button>
								<button
									className="percent-button"
									onClick={() => handleRatio(limit, 1)}
								>
									100%
								</button>
							</SDivFlexCenter>
							<SInput
								value={conversionInput}
								onChange={e => inputConversionAmount(e.target.value, limit)}
							/>
						</li>
						<li className="description">
							<div>{descriptionText}</div>
							<Tooltip title={tooltipText}>
								<img src={infoIcon} />
							</Tooltip>
						</li>
						<li>
							<div className="align-right">
								{'Conversion Fee: ' +
									d3.formatPrefix(',.8', 1)(
										conversionFeeValue / lastResetETHPrice
									) +
									(ethFee ? ' ETH' : ' DUO')}
							</div>
						</li>
					</ul>
				</div>
			</SCardList>
			<SDivFlexCenter horizontal width="100%" padding="0">
				<button
					className="form-button"
					onClick={() => {
						contractUtil.create(account, conversionInputValue, ethFee);
					}}
				>
					SUBMIT
				</button>
				<button className="form-button" onClick={() => clear()}>
					CLEAR
				</button>
			</SDivFlexCenter>
			<SCardList>
				<div className="status-list-wrapper">
					<ul>
						<li className="img-line">
							<img
								className="demo-img"
								src={conversionType === 'create' ? demoCreate : demoRedeem}
							/>
						</li>
					</ul>
				</div>
			</SCardList>
		</SCardConversionForm>
	);
};

const TransactionForm = (props: {
	transactionType: string;
	changeTransactionType: (type: string) => void;
	balances: IBalances;
}) => {
	const { transactionType, changeTransactionType } = props;
	return (
		<SCardTransactionForm>
			<SDivFlexCenter horizontal width="100%" padding="10px 0px">
				<button
					className={
						transactionType === 'duo'
							? 'trans-button selected'
							: 'trans-button non-select'
					}
					onClick={() => changeTransactionType('duo')}
				>
					DUO
				</button>
				<button
					className={
						transactionType === 'classa'
							? 'trans-button selected'
							: 'trans-button non-select'
					}
					onClick={() => changeTransactionType('classa')}
				>
					CLASS A
				</button>
				<button
					className={
						transactionType === 'classb'
							? 'trans-button selected'
							: 'trans-button non-select'
					}
					onClick={() => changeTransactionType('classb')}
				>
					CLASS B
				</button>
			</SDivFlexCenter>
		</SCardTransactionForm>
	);
};

export default class InfoCard extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			ethFee: true,
			conversionType: 'create',
			transactionType: 'duo',
			conversionInput: '',
			conversionInputValue: 0
		};
	}
	private round = num => {
		return +(Math.round((num + 'e+8') as any) + 'e-8');
	};

	private changeFeePayment = () => {
		this.setState({
			ethFee: !this.state.ethFee
		});
	};

	private changeConversionType = (type: string) => {
		this.setState({
			conversionType: type,
			conversionInput: '',
			conversionInputValue: 0
		});
	};

	private changeTransactionType = (type: string) => {
		this.setState({
			transactionType: type
		});
	};

	private inputConversionAmount = (amount: string, limit: number) => {
		this.setState({
			conversionInput: amount,
			conversionInputValue:
				this.round(Number(amount)) < limit ? this.round(Number(amount)) : limit
		});
	};

	private handleRatio = (value: number, ratio: number) => {
		const result = value * ratio;
		if (value)
			this.setState({
				conversionInput: this.round(result).toString(),
				conversionInputValue: result
			});
	};

	private clear = () => {
		this.setState({
			conversionInput: '',
			conversionInputValue: 0
		});
	};

	public render() {
		const { states, prices, balances, account } = this.props;
		const {
			ethFee,
			conversionType,
			transactionType,
			conversionInput,
			conversionInputValue
		} = this.state;
		const availableAB = balances.tokenA > balances.tokenB ? balances.tokenA : balances.tokenB;
		const limit = conversionType === 'create' ? balances.eth : availableAB;
		return (
			<SDivFlexCenter center horizontal marginBottom="20px;">
				<StateCard states={states} prices={prices} />
				<SCard
					title={<SCardTitle>CONVERSION</SCardTitle>}
					extra={<RadioExtraDiv changeFeePayment={this.changeFeePayment} eth={ethFee} />}
					width="440px"
					margin="0 10px 0 10px"
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<ConversionForm
							conversionType={conversionType}
							changeConversionType={this.changeConversionType}
							balances={balances}
							ethFee={ethFee}
							inputConversionAmount={this.inputConversionAmount}
							conversionInput={conversionInput}
							conversionInputValue={conversionInputValue}
							lastResetETHPrice={prices.reset.price}
							commissionRate={states.commissionRate}
							ethDuoFeeRatio={states.ethDuoFeeRatio}
							limit={limit}
							handleRatio={this.handleRatio}
							clear={this.clear}
							account={account}
						/>
					</SDivFlexCenter>
				</SCard>
				<SCard
					title={<SCardTitle>TRANSACTION</SCardTitle>}
					width="440px"
					margin="0 0 0 10px"
				>
					<SDivFlexCenter horizontal padding="0 10px">
						<TransactionForm
							transactionType={transactionType}
							changeTransactionType={this.changeTransactionType}
							balances={balances}
						/>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
