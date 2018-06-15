//import moment from 'moment';
import { Radio, Tooltip } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import demoCreate from '../../../../images/createDemo.png';
import infoIcon from '../../../../images/info.svg';
import demoRedeem from '../../../../images/redeemDemo.png';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { IBalances, ICustodianPrice, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardConversionForm,
	SCardList,
	SCardRadioExtraDiv,
	SCardTitle,
	SInput,
	SRadioGroup
} from './_styled';

const RadioButton = Radio.Button;

interface IProps {
	reset: ICustodianPrice;
	states: ICustodianStates;
	balances: IBalances;
	account: string;
}

interface IState {
	ethFee: boolean;
	isCreate: boolean;
	amount: string;
	amountError: string;
	description: string;
}

const RadioExtraDiv = (props: { onChange: () => void; eth: boolean }) => {
	return (
		<SCardRadioExtraDiv>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Fee in</div>
				<SRadioGroup
					defaultValue={CST.TH_DUO}
					size="small"
					onChange={props.onChange}
					value={props.eth ? CST.TH_ETH : CST.TH_DUO}
				>
					<RadioButton value={CST.TH_DUO}>{CST.TH_DUO}</RadioButton>
					<RadioButton value={CST.TH_ETH}>{CST.TH_ETH}</RadioButton>
				</SRadioGroup>
			</div>
		</SCardRadioExtraDiv>
	);
};

export default class ConversionCard extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			ethFee: false,
			isCreate: true,
			amount: '',
			amountError: '',
			description: ''
		};
	}

	private handleFeeTypeChange = () => {
		this.setState({
			ethFee: !this.state.ethFee
		});
	};

	private handleTypeChange = () => this.setState({
		isCreate: !this.state.isCreate,
		amount: '',
		amountError: '',
		description: ''
	});

	private handleAmountChange = (value: string) =>
		this.setState({
			amount: value,
			amountError: !value || value.match(CST.RX_NUM_P) ? '' : 'Invalid number'
		});

	private handleAmountButton = (amount: string) =>
		this.setState({
			amount: amount,
			description: this.getDescription(amount)
		});

	private getDescription = (amount: string) => {
		const { states, reset } = this.props;
		const { isCreate } = this.state;
		return !Number(amount)
			? ''
			: isCreate
				? 'Create ' +
				d3.formatPrefix(',.8', 1)(
						(Number(amount) * (1 - states.commissionRate) * reset.price * states.beta) /
							2
				) +
				' Token A/B from ' +
				d3.formatPrefix(',.8', 1)(Number(amount) * (1 - states.commissionRate)) +
				' ' +
				CST.TH_ETH
				: 'Redeem ' +
				d3.formatPrefix(',.8', 1)(
						(Number(amount) / reset.price / states.beta) *
							2 *
							(1 - states.commissionRate)
				) +
				' ' +
				CST.TH_ETH +
				' from ' +
				d3.formatPrefix(',.8', 1)(Number(amount)) +
				' Token A/B';
	};

	private handleAmountBlur = (limit: number) => {
		const amount =
			!this.state.amountError && Number(this.state.amount) > limit
				? limit + ''
				: this.state.amount;
		this.setState({
			amount: amount,
			description: this.getDescription(amount)
		});
	};

	private handleSubmit = () => {
		const { account } = this.props;
		const { isCreate, amount, ethFee } = this.state;
		if (isCreate) contractUtil.create(account, Number(amount), ethFee);
		else contractUtil.redeem(account, Number(amount), Number(amount), ethFee);
	};

	private handleClear = () => this.setState({
		amount: '',
		amountError: '',
		description: ''
	});

	public render() {
		const { states, reset } = this.props;
		const { eth, tokenA, tokenB } = this.props.balances;
		const { ethFee, isCreate, amount, amountError, description } = this.state;
		const limit = isCreate ? eth : Math.min(tokenA, tokenB);

		const fee =
			(isCreate
				? Number(amount) * states.commissionRate
				: (Number(amount) / reset.price / states.beta) * 2 * states.commissionRate) *
			(ethFee ? 1 : states.ethDuoFeeRatio);

		const tooltipText = 'Estimated outcome may vary from actual result';
		return (
			<SCard
				title={<SCardTitle>CONVERSION</SCardTitle>}
				extra={<RadioExtraDiv onChange={this.handleFeeTypeChange} eth={ethFee} />}
				width="440px"
				margin="0 10px 0 10px"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardConversionForm>
						<SCardList>
							<div className="status-list-wrapper">
								<ul>
									<li className="img-line">
										<img
											className="demo-img"
											src={isCreate ? demoCreate : demoRedeem}
										/>
									</li>
								</ul>
							</div>
						</SCardList>
						<SDivFlexCenter horizontal width="100%" padding="10px 0 0 0">
							<button
								className={
									isCreate ? 'conv-button selected' : 'conv-button non-select'
								}
								onClick={() => !isCreate && this.handleTypeChange()}
							>
								{CST.TH_CREATE}
							</button>
							<button
								className={
									!isCreate ? 'conv-button selected' : 'conv-button non-select'
								}
								onClick={() => isCreate && this.handleTypeChange()}
							>
								{CST.TH_REDEEM}
							</button>
						</SDivFlexCenter>
						<SCardList>
							<div className="status-list-wrapper">
								<ul>
									<li className="input-line">
										<SDivFlexCenter horizontal width="50%" padding="0">
											{[0.25, 0.5, 0.75, 1].map(pct => (
												<button
													key={pct + ''}
													className="percent-button"
													onClick={() =>
														this.handleAmountButton(limit * pct + '')
													}
												>
													{pct * 100 + '%'}
												</button>
											))}
										</SDivFlexCenter>
										<SInput
											className={amountError ? 'input-error' : ''}
											value={amount}
											onChange={e => this.handleAmountChange(e.target.value)}
											onBlur={() => this.handleAmountBlur(limit)}
											placeholder="Please input amount"
											right
										/>
									</li>
									<li className="description">
										<div>{amountError || description}</div>
										<Tooltip title={tooltipText}>
											<img src={infoIcon} />
										</Tooltip>
									</li>
									<li>
										<div className="align-right">
											{states.commissionRate * 100 +
												'% Conversion Fee: ' +
												d3.formatPrefix(',.8', 1)(fee) +
												' ' +
												(ethFee ? CST.TH_ETH : CST.TH_DUO)}
										</div>
									</li>
								</ul>
							</div>
						</SCardList>
						<SDivFlexCenter horizontal width="100%" padding="0" marginBottom="10px">
							<button
								className="form-button"
								disabled={!amount || !!amountError}
								onClick={this.handleSubmit}
							>
								{CST.TH_SUBMIT}
							</button>
							<button
								className="form-button"
								onClick={() => this.handleClear()}
							>
								{CST.TH_CLEAR}
							</button>
						</SDivFlexCenter>
					</SCardConversionForm>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
