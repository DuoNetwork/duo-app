//import moment from 'moment';
import { Tooltip } from 'antd';
import * as d3 from 'd3';
import demoCreate from 'images/createDemo.png';
import infoIcon from 'images/info.svg';
import demoRedeem from 'images/redeemDemo.png';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { ICustodianContractAddress, IDualClassStates } from 'ts/common/types';
import util from 'ts/common/util';
import { getDualClassAddressByTypeTenor, getDualClassWrapperByTypeTenor } from 'ts/common/wrappers';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import DualClassWrapper from '../../../../../duo-contract-wrapper/src/DualClassWrapper';
import { SDivFlexCenter } from '../_styled';
import Erc20Form from '../Forms/Erc20Form';
import { SCard, SCardConversionForm, SCardExtraDiv, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	type: string;
	tenor: string;
	locale: string;
	states: IDualClassStates;
	contractAddress: ICustodianContractAddress;
	eth: number;
	aToken: number;
	bToken: number;
	account: string;
	gasPrice: number;
	mobile?: boolean;
	refresh: () => any;
}

interface IState {
	isCreate: boolean;
	amount: string;
	amountError: string;
	description: string;
	locale: string;
}

export default class OperationCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			isCreate: true,
			amount: '',
			amountError: '',
			description: this.getConversionDescription(0, 0, true),
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

	private handleTypeChange = () => {
		this.setState({
			isCreate: !this.state.isCreate,
			amount: '',
			amountError: '',
			description: this.getConversionDescription(0, 0, !this.state.isCreate)
		});
	};

	private handleAmountInputChange = (value: string) =>
		this.setState({
			amount: value,
			amountError:
				!value || (value.match(CST.RX_NUM_P) && Number(value) > 0)
					? ''
					: CST.TT_INVALID_NUMBER[this.props.locale]
		});

	private handleAmountButtonClick = (amount: string) =>
		this.setState({
			amount: amount,
			description: this.getDescription(amount)
		});

	private getConversionDescription = (eth: number, ab: number, isCreate: boolean) => {
		const amount = isCreate ? eth : ab;
		const { states, contractAddress } = this.props;

		if (amount === 0)
			return isCreate
				? `Create ${contractAddress.aToken.code} and ${
						contractAddress.bToken.code
				} with ETH`
				: `Redeem ETH from ${contractAddress.aToken.code} and ${
						contractAddress.bToken.code
				}`;
		const [aTokenPerEth, bTokenPerEth] = states
			? DualClassWrapper.getTokensPerEth(states)
			: [0, 0];

		const ethNum = isCreate ? amount : Number(amount) / aTokenPerEth;
		const feeNum = Number(ethNum) * (isCreate ? states.createCommRate : states.redeemCommRate);
		const ethAfterFeeNum = Number(ethNum) - feeNum;
		const aTokenAmt = util.formatBalance(ethAfterFeeNum * aTokenPerEth);
		const bTokenAmt = util.formatBalance(ethAfterFeeNum * bTokenPerEth);
		const feeAmt = util.formatBalance(feeNum);
		const ethAmt = util.formatBalance(ethAfterFeeNum);

		return isCreate
			? `${ethAmt}(after fee ${feeAmt}) ETH --> ${aTokenAmt} ${
					contractAddress.aToken.code
			} + ${bTokenAmt} ${contractAddress.bToken.code}`
			: `${aTokenAmt} ${contractAddress.aToken.code} + ${bTokenAmt} ${
					contractAddress.bToken.code
			} --> ${ethAmt}(after fee ${feeAmt}) ETH`;
	};

	private getDescription = (amount: string) => {
		const { states } = this.props;
		const { isCreate } = this.state;
		const amtNum = Number(amount);
		if (!amtNum) return '';

		if (isCreate)
			return this.getConversionDescription(
				amtNum,
				this.getABFromEth(amtNum * (1 - states.createCommRate))[0],
				true
			);
		else
			return this.getConversionDescription(
				this.getEthFromAB(amtNum) * (1 - states.redeemCommRate),
				amtNum,
				false
			);
	};

	private getABFromEth = (amount: number) => {
		const { states } = this.props;
		const tokenB = (amount * states.resetPrice * states.beta) / (1 + states.alpha);
		return [tokenB * states.alpha, tokenB];
	};

	private getEthFromAB = (amount: number) => {
		const { states } = this.props;
		return (2 * amount) / states.resetPrice / states.beta;
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

	private handleSubmit = async () => {
		const { account, states, refresh, tenor, type } = this.props;
		const { isCreate, amount } = this.state;
		const amtNum = Number(amount);
		const dualClassWrapper = getDualClassWrapperByTypeTenor(type, tenor);
		const contractAddress = getDualClassAddressByTypeTenor(type, tenor).custodian.address;
		if (isCreate) {
			const fee = amtNum * states.createCommRate;
			const ethNetOfFee = amtNum - fee;
			const [tokenA, tokenB] = this.getABFromEth(ethNetOfFee);
			const txHash = await dualClassWrapper.create(account, amtNum, '');
			dynamoUtil
				.insertUIConversion(
					contractAddress,
					account,
					txHash,
					true,
					ethNetOfFee,
					tokenA,
					tokenB,
					fee
				)
				.then(() => refresh());
		} else {
			const ethAmount = this.getEthFromAB(amtNum);
			const fee = ethAmount * states.redeemCommRate;
			const txHash = await dualClassWrapper.redeem(account, amtNum, amtNum);
			dynamoUtil
				.insertUIConversion(
					contractAddress,
					account,
					txHash,
					false,
					ethAmount - fee,
					amtNum,
					amtNum,
					fee
				)
				.then(() => refresh());
		}
		this.setState({
			amount: '',
			amountError: '',
			description: ''
		});
	};

	private handleClear = () =>
		this.setState({
			amount: '',
			amountError: '',
			description: ''
		});

	public render() {
		const {
			states,
			account,
			eth,
			aToken,
			bToken,
			gasPrice,
			locale,
			mobile,
			tenor,
			type,
			contractAddress
		} = this.props;
		const { isCreate, amount, amountError, description } = this.state;
		const limit = util.round(isCreate ? eth : Math.min(aToken, bToken));
		const commissionRate = isCreate ? states.createCommRate : states.redeemCommRate;

		const fee = isCreate
			? Number(amount) * commissionRate
			: (Number(amount) / states.resetPrice / states.beta) * 2 * commissionRate;

		const tooltipText = CST.TT_RESULT_VARY[locale];
		return (
			<SCard
				title={
					<SCardTitle>
						{CST.TH_OPERATION[locale].toUpperCase() +
							(states.state !== CST.CTD_TRADING
								? '(' + CST.TH_DISABLED[locale] + ')'
								: '')}
					</SCardTitle>
				}
				width={mobile ? '100%' : '440px'}
				margin={mobile ? '20px 0 0 0' : '0 0 0 10px'}
				className={states.state !== CST.CTD_TRADING ? 'card-disable' : ''}
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
				<SCardConversionForm>
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li className="img-line no-bg">
									<img
										className="demo-img"
										src={isCreate ? demoCreate : demoRedeem}
									/>
								</li>
								<li className="no-bg">
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="2px 0 2px 0"
										marginBottom="10px"
									>
										<button
											className={
												(isCreate
													? 'conv-button selected'
													: 'conv-button non-select') +
												(mobile ? ' mobile' : '')
											}
											onClick={() => !isCreate && this.handleTypeChange()}
										>
											{CST.TH_CREATE[locale]}
										</button>
										<button
											className={
												(!isCreate
													? 'conv-button selected'
													: 'conv-button non-select') +
												(mobile ? ' mobile' : '')
											}
											onClick={() => isCreate && this.handleTypeChange()}
										>
											{CST.TH_REDEEM[locale]}
										</button>
									</SDivFlexCenter>
								</li>
								<li
									className={'input-line' + (limit <= 0 ? ' input-disabled' : '')}
								>
									<SDivFlexCenter horizontal width="50%" padding="0">
										{[0.25, 0.5, 0.75, 0.99].map(pct => (
											<button
												key={pct + ''}
												className={
													'percent-button' + (mobile ? ' p_mobile' : '')
												}
												onClick={() =>
													this.handleAmountButtonClick(
														util.round(limit * pct) + ''
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
										onChange={e => this.handleAmountInputChange(e.target.value)}
										width={mobile ? '140px' : ''}
										onBlur={() => this.handleAmountBlur(limit)}
										placeholder={
											isCreate
												? CST.TT_INPUT_ETH_AMOUNT[locale]
												: `Please input ${
														contractAddress.aToken.code
												} amount`
										}
										right
									/>
								</li>
								<li className="description" style={{ height: 40 }}>
									<div>{amountError || description}</div>
									<Tooltip title={tooltipText}>
										<img src={infoIcon} />
									</Tooltip>
								</li>
								<li>
									<div className="align-right">
										{commissionRate * 100 +
											'% ' +
											CST.TH_CONVERSION_FEE[locale] +
											': ' +
											d3.formatPrefix(',.8', 1)(isNaN(fee) ? 0 : fee) +
											' ' +
											CST.TH_ETH}
									</div>
								</li>
								<li>
									<SDivFlexCenter horizontal width="100%" padding="2px 0 2px 0">
										<button
											className={'form-button' + (mobile ? ' mobile' : '')}
											disabled={!amount || !!amountError}
											onClick={this.handleSubmit}
										>
											{CST.TH_SUBMIT[locale]}
										</button>
										<button
											className={'form-button' + (mobile ? ' mobile' : '')}
											onClick={this.handleClear}
										>
											{CST.TH_CLEAR[locale]}
										</button>
									</SDivFlexCenter>
								</li>
							</ul>
						</div>
					</SCardList>
				</SCardConversionForm>
				<Erc20Form
					type={type}
					tenor={tenor}
					aToken={aToken}
					bToken={bToken}
					account={account}
					locale={locale}
					mobile={mobile}
				/>
			</SCard>
		);
	}
}
