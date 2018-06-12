//import moment from 'moment';
import { Radio } from 'antd';
import * as React from 'react';
import { IBalances, ICustodianPrices, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardConversionForm,
	SCardRadioExtraDiv,
	SCardTitle,
	SCardTransactionForm,
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
}) => {
	const { conversionType, changeConversionType } = props;
	return (
		<SCardConversionForm>
			<SDivFlexCenter horizontal width="100%" padding="10px 0px">
				<button
					className={
						conversionType === 'create'
							? 'conv-bottom selected'
							: 'conv-bottom non-select'
					}
					onClick={() => changeConversionType('create')}
				>
					CREATION
				</button>
				<button
					className={
						conversionType === 'redeem'
							? 'conv-bottom selected'
							: 'conv-bottom non-select'
					}
					onClick={() => changeConversionType('redeem')}
				>
					REDEMPTION
				</button>
			</SDivFlexCenter>
		</SCardConversionForm>
	);
};

const TransactionForm = (props: {
	transactionType: string;
	changeTransactionType: (type: string) => void;
}) => {
	const { transactionType, changeTransactionType } = props;
	return (
		<SCardTransactionForm>
			<SDivFlexCenter horizontal width="100%" padding="10px 0px">
				<button
					className={
						transactionType === 'duo'
							? 'trans-bottom selected'
							: 'trans-bottom non-select'
					}
					onClick={() => changeTransactionType('duo')}
				>
					DUO
				</button>
				<button
					className={
						transactionType === 'classa'
							? 'trans-bottom selected'
							: 'trans-bottom non-select'
					}
					onClick={() => changeTransactionType('classa')}
				>
					CLASS A
				</button>
				<button
					className={
						transactionType === 'classb'
							? 'trans-bottom selected'
							: 'trans-bottom non-select'
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
		const { states, prices } = this.props;
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
						/>
					</SDivFlexCenter>
				</SCard>
			</SDivFlexCenter>
		);
	}
}
