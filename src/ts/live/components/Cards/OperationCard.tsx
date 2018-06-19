//import moment from 'moment';
import { Affix, Popconfirm, Radio, Tooltip } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';
import demoCreate from '../../../../images/createDemo.png';
import infoIcon from '../../../../images/info.svg';
import demoRedeem from '../../../../images/redeemDemo.png';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import dynamoUtil from '../../common/dynamoUtil';
import { IBalances, ICustodianPrice, ICustodianStates } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import Erc20Form from '../Forms/Erc20Form';
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
	refresh: () => any;
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
			description: 'Estimated outcome'
		};
	}

	private handleFeeTypeChange = () => {
		this.setState({
			ethFee: !this.state.ethFee
		});
	};

	private handleTypeChange = () =>
		this.setState({
			isCreate: !this.state.isCreate,
			amount: '',
			amountError: '',
			description: 'Estimated outcome'
		});

	private handleAmountInputChange = (value: string) =>
		this.setState({
			amount: value,
			amountError: !value || value.match(CST.RX_NUM_P) ? '' : 'Invalid number'
		});

	private handleAmountButtonClick = (amount: string) =>
		this.setState({
			amount: amount,
			description: this.getDescription(amount)
		});

	private getConversionDescription = (eth: number, ab: number, isCreate: boolean) => {
		return isCreate
			? 'Create ' +
					d3.formatPrefix(',.8', 1)(ab) +
					' Token A/B from ' +
					d3.formatPrefix(',.8', 1)(eth) +
					' ' +
					CST.TH_ETH
			: 'Redeem ' +
					d3.formatPrefix(',.8', 1)(eth) +
					' ' +
					CST.TH_ETH +
					' from ' +
					d3.formatPrefix(',.8', 1)(ab) +
					' Token A/B';
	};

	private getDescription = (amount: string) => {
		const { states } = this.props;
		const { isCreate } = this.state;
		const amtNum = Number(amount);
		return !amtNum
			? 'Estimated outcome'
			: isCreate
				? this.getConversionDescription(
						amtNum * (1 - states.commissionRate),
						this.getABFromEth(amtNum),
						true
					)
				: this.getConversionDescription(this.getEthFromAB(amtNum), amtNum, false);
	};

	private getABFromEth = (amount: number) => {
		const { states, reset } = this.props;
		return (amount * (1 - states.commissionRate) * reset.price * states.beta) / 2;
	};

	private getEthFromAB = (amount: number) => {
		const { states, reset } = this.props;
		return ((2 * amount) / reset.price / states.beta) * (1 - states.commissionRate);
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
		const { account, states, refresh } = this.props;
		const { isCreate, amount, ethFee } = this.state;
		const amtNum = Number(amount);
		if (isCreate)
			contractUtil.create(account, amtNum, ethFee, (txHash: string) =>
				dynamoUtil
					.insertUIConversion(
						account,
						txHash,
						true,
						amtNum * (1 - states.commissionRate),
						this.getABFromEth(amtNum)
					)
					.then(() => refresh())
			);
		else
			contractUtil.redeem(account, amtNum, amtNum, ethFee, (txHash: string) =>
				dynamoUtil
					.insertUIConversion(
						account,
						txHash,
						false,
						this.getEthFromAB(amtNum),
						amtNum * (1 - states.commissionRate)
					)
					.then(() => refresh())
			);
		this.setState({
			amount: '',
			amountError: '',
			description: 'Estimated outcome'
		});
	};

	private handleClear = () =>
		this.setState({
			amount: '',
			amountError: '',
			description: 'Estimated outcome'
		});

	public render() {
		const { states, reset, account, balances } = this.props;
		const { eth, tokenA, tokenB, allowance, duo } = this.props.balances;
		const { ethFee, isCreate, amount, amountError, description } = this.state;
		const limit = isCreate ? eth : Math.min(tokenA, tokenB);

		const fee =
			(isCreate
				? Number(amount) * states.commissionRate
				: (Number(amount) / reset.price / states.beta) * 2 * states.commissionRate) *
			(ethFee ? 1 : states.ethDuoFeeRatio);
		const duoIsSuffient = ethFee ? true : fee < allowance || fee < duo;

		const tooltipText = 'Estimated outcome may vary from actual result';
		return (
			<Affix offsetTop={20}>
				<SCard
					title={
						<SCardTitle>
							{CST.TH_OPERATION.toUpperCase() +
								(states.state !== CST.CTD_TRADING ? ' (Disabled)' : '')}
						</SCardTitle>
					}
					width="440px"
					margin="0 0 0 10px"
					className={states.state !== CST.CTD_TRADING ? 'card-disable' : ''}
				>
					<SCardConversionForm>
						<SCardList>
							<div className="status-list-wrapper">
								<ul>
									<li className="block-title">
										<span>{CST.TH_CONVERSION}</span>
										<RadioExtraDiv
											onChange={this.handleFeeTypeChange}
											eth={ethFee}
										/>
									</li>
									<li className="img-line no-bg">
										<img
											className="demo-img"
											src={isCreate ? demoCreate : demoRedeem}
										/>
									</li>
									<li>
										<SDivFlexCenter
											horizontal
											width="100%"
											padding="5px 0 0 0"
											marginBottom="10px"
										>
											<button
												className={
													isCreate
														? 'conv-button selected'
														: 'conv-button non-select'
												}
												onClick={() => !isCreate && this.handleTypeChange()}
											>
												{CST.TH_CREATE}
											</button>
											<button
												className={
													!isCreate
														? 'conv-button selected'
														: 'conv-button non-select'
												}
												onClick={() => isCreate && this.handleTypeChange()}
											>
												{CST.TH_REDEEM}
											</button>
										</SDivFlexCenter>
									</li>
									<li className="input-line">
										<SDivFlexCenter horizontal width="50%" padding="0">
											{[0.25, 0.5, 0.75, 1].map(pct => (
												<button
													key={pct + ''}
													className="percent-button"
													onClick={() =>
														this.handleAmountButtonClick(
															limit * pct + ''
														)
													}
												>
													{pct * 100 + '%'}
												</button>
											))}
										</SDivFlexCenter>
										<SInput
											className={amountError ? 'input-error' : ''}
											value={amount}
											onChange={e =>
												this.handleAmountInputChange(e.target.value)
											}
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
									<li>
										<SDivFlexCenter
											horizontal
											width="100%"
											padding="0"
											marginTop="10px"
										>
											{!duoIsSuffient ? (
												<Popconfirm
													title="Insufficient DUO Allowance balance, transaction may fail"
													onConfirm={this.handleSubmit}
													onCancel={this.handleClear}
													okText="Submit"
													cancelText="Cancel"
												>
													<button
														className="form-button"
														disabled={!amount || !!amountError}
													>
														{CST.TH_SUBMIT}
													</button>
												</Popconfirm>
											) : (
												<button
													className="form-button"
													disabled={!amount || !!amountError}
													onClick={this.handleSubmit}
												>
													{CST.TH_SUBMIT}
												</button>
											)}
											<button
												className="form-button"
												onClick={this.handleClear}
											>
												{CST.TH_CLEAR}
											</button>
										</SDivFlexCenter>
									</li>
								</ul>
							</div>
						</SCardList>
					</SCardConversionForm>
					<Erc20Form balances={balances} account={account} />
				</SCard>
			</Affix>
		);
	}
}
