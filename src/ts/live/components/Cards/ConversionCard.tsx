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
}

const RadioExtraDiv = (props: { onChange: () => void; eth: boolean }) => {
	return (
		<SCardRadioExtraDiv>
			<div className="extend-extra-wrapper">
				<div className="tag-title">Fee Payment Method</div>
				<SRadioGroup
					defaultValue="a"
					size="small"
					onChange={props.onChange}
					value={props.eth ? 'a' : 'b'}
				>
					<RadioButton value="a">ETH</RadioButton>
					<RadioButton value="b">DUO</RadioButton>
				</SRadioGroup>
			</div>
		</SCardRadioExtraDiv>
	);
};

export default class ConversionCard extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			ethFee: true,
			isCreate: true,
			amount: '',
			amountError: ''
		};
	}

	private handleFeeTypeChange = () => {
		this.setState({
			ethFee: !this.state.ethFee
		});
	};

	private handleTypeChange = () => this.setState({ isCreate: !this.state.isCreate });

	private handleAmountChange = (value: string) =>
		this.setState({
			amount: value,
			amountError: !value || value.match(CST.RX_NUM_P) ? '' : 'Invalid number'
		});

	private handleAmountBlur = (limit: number) => {
		const { amount, amountError } = this.state;
		if (!amountError && Number(amount) > limit) this.setState({ amount: limit + '' });
	};

	private handleSubmit = () => {
		const { account } = this.props;
		const { isCreate, amount, ethFee } = this.state;
		if (isCreate) contractUtil.create(account, Number(amount), ethFee);
		else contractUtil.redeem(account, Number(amount), Number(amount), ethFee);
	};

	public render() {
		const { states, reset } = this.props;
		const { eth, tokenA, tokenB } = this.props.balances;
		const { ethFee, isCreate, amount, amountError } = this.state;
		const limit = isCreate ? eth : Math.min(tokenA, tokenB);

		const description =
			amountError ||
			(isCreate
				? 'Create ' +
				(Number(amount) * (1 - states.commissionRate) * reset.price * states.beta) / 2 +
				' Token A/B from ' +
				Number(amount) * (1 - states.commissionRate) +
				' ETH'
				: 'Redeem ' +
				(Number(amount) / reset.price / states.beta) * 2 * (1 - states.commissionRate) +
				' ETH from ' +
				Number(amount) +
				' Token A/B');

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
									<li className="block-title">Conversion</li>
									<li className="input-line">
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
											value={amount}
											onChange={e => this.handleAmountChange(e.target.value)}
											onBlur={() => this.handleAmountBlur(limit)}
											placeholder="Please input amount"
											right
										/>
									</li>
									<li className="description">
										<div>{description}</div>
										<Tooltip title={tooltipText}>
											<img src={infoIcon} />
										</Tooltip>
									</li>
									<li>
										<div className="align-right">
											{'Conversion Fee: ' +
												d3.formatPrefix(',.8', 1)(fee) +
												(ethFee ? ' ETH' : ' DUO')}
										</div>
									</li>
								</ul>
							</div>
						</SCardList>
						<SDivFlexCenter horizontal width="100%" padding="0">
							<button
								className="form-button"
								disabled={!amount || !!amountError}
								onClick={this.handleSubmit}
							>
								{CST.TH_SUBMIT}
							</button>
							<button
								className="form-button"
								onClick={() => this.handleAmountChange('')}
							>
								{CST.TH_CLEAR}
							</button>
						</SDivFlexCenter>
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
					</SCardConversionForm>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
