//import moment from 'moment';
import { Radio } from 'antd';
import * as React from 'react';
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
}

interface IState {
	ethFee: boolean;
	conversionType: string;
	transactionType: string;
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
}) => {
	const { conversionType, changeConversionType } = props;
	const { eth, tokenA, tokenB } = props.balances;
	return (
		<SCardConversionForm>
			<SDivFlexCenter horizontal width="100%" padding="10px 0 0 0">
				<button
					className={
						conversionType === 'create'
							? 'conv-button selected'
							: 'conv-button non-select'
					}
					onClick={() => changeConversionType('create')}
				>
					CREATION
				</button>
				<button
					className={
						conversionType === 'redeem'
							? 'conv-button selected'
							: 'conv-button non-select'
					}
					onClick={() => changeConversionType('redeem')}
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
							<SDivFlexCenter horizontal width='50%' padding='0'>
								<button className='percent-button'>25%</button>
								<button className='percent-button'>50%</button>
								<button className='percent-button'>75%</button>
								<button className='percent-button'>100%</button>
							</SDivFlexCenter>
							<SInput/>
						</li>
						<li>
							123
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
			transactionType: 'duo'
		};
	}

	private changeFeePayment = () => {
		this.setState({
			ethFee: !this.state.ethFee
		});
	};

	private changeConversionType = (type: string) => {
		this.setState({
			conversionType: type
		});
	};

	private changeTransactionType = (type: string) => {
		this.setState({
			transactionType: type
		});
	};

	public render() {
		const { states, prices, balances } = this.props;
		const { ethFee, conversionType, transactionType } = this.state;
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
