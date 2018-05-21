import * as d3 from 'd3';
import * as React from 'react';
import classAIcon from '../../../images/ClassA_white.png';
import classBIcon from '../../../images/ClassB_white.png';
import ethIcon from '../../../images/ethIcon.png';
import { IAssets, IPriceData } from '../../types';

interface IProps {
	isShown: boolean;
	type: string;
	assets: IAssets;
	currentPrice: IPriceData;
	lastResetETHPrice: number;
	openTF: (e: boolean, type?: string) => void;
	handleBuySell: (amount: number, isA: boolean) => string;
	handleCreation: (amount: number) => string;
	handleRedemption: (amount: number) => string;
}

interface IState {
	valueIn: string;
	value: number;
	isShown: boolean;
	type: string;
}

const Asset = (props: { name: string; value: number; src: string }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: '10px'
		}}
	>
		<div className="tag-icon">
			<img src={props.src} />
			<div className="tag-unit-3">{props.name}</div>
		</div>
		<div className="tag-price-3">{d3.formatPrefix(',.2', 1)(props.value)}</div>
	</div>
);

const ButtonGroup = (
	value: number,
	type: string,
	openTF: (e: boolean, type?: string) => void,
	handleBuySell: (amount: number, isA: boolean) => string,
	handleCreation: (amount: number) => string,
	handleRedemption: (amount: number) => string
) => {
	const buttons: JSX.Element[] = [];
	const isA = type === 'Class A' ? true : false;
	switch (type) {
		case 'Creation': {
			buttons.push(
				<button key="1" onClick={() => handleCreation(value)}>
					CREATE
				</button>
			);
			break;
		}
		case 'Redemption': {
			buttons.push(
				<button key="1" onClick={() => handleRedemption(value)}>
					REDEEM
				</button>
			);
			break;
		}
		default: {
			buttons.push(
				<button key="1" onClick={() => handleBuySell(value, isA)}>
					BUY
				</button>
			);
			buttons.push(
				<button key="2" onClick={() => handleBuySell(value, isA)}>
					SELL
				</button>
			);
			break;
		}
	}
	buttons.push(
		<button key="3" onClick={() => openTF(false)}>
			CANCEL
		</button>
	);
	return buttons;
};

const Description = (
	type: string,
	value: number,
	currentPrice: IPriceData,
	lastResetETHPrice: number
) => {
	const contents: JSX.Element[] = [];
	switch (type) {
		case 'Creation': {
			contents.push(
				<div key="1" className="tf-contents-item">
					Split
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					ETH
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					into
					<span>{d3.formatPrefix(',.2', 1)(value * currentPrice.ETH / 2)}</span>
					Class A/B
				</div>
			);
			break;
		}
		case 'Redemption': {
			contents.push(
				<div key="1" className="tf-contents-item">
					Combine
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					Class A/B
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					into
					<span>{d3.formatPrefix(',.6', 1)(value * 2 / lastResetETHPrice)}</span>
					ETH
				</div>
			);
			break;
		}
		case 'Class A': {
			contents.push(
				<div key="1" className="tf-contents-item">
					Buy/Sell
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					Class A
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					with/for
					<span>
						{d3.formatPrefix(',.6', 1)(value * currentPrice.ClassA / currentPrice.ETH)}
					</span>
					ETH
				</div>
			);
			break;
		}
		case 'Class B': {
			contents.push(
				<div key="1" className="tf-contents-item">
					Buy/Sell
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					Class B
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					with/for
					<span>
						{d3.formatPrefix(',.6', 1)(value * currentPrice.ClassB / currentPrice.ETH)}
					</span>
					ETH
				</div>
			);
			break;
		}
		default: {
			contents.push(<div key="1" className="tf-contents-item"/>);
			break;
		}
	}
	return contents;
};

export default class TransactionForm extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			valueIn: '',
			value: 0,
			isShown: props.isShown,
			type: props.type
		};
	}
	public round = num => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};

	public handle25 = (value: number) => {
		const result = value / 4;
		this.setState({
			valueIn: this.round(result).toString(),
			value: result
		});
	};

	public handle50 = (value: number) => {
		const result = value / 2;
		this.setState({
			valueIn: this.round(result).toString(),
			value: result
		});
	};

	public handle75 = (value: number) => {
		const result = value / 4 * 3;
		this.setState({
			valueIn: this.round(result).toString(),
			value: result
		});
	};

	public handle100 = (value: number) => {
		const result = value;
		this.setState({
			valueIn: this.round(result).toString(),
			value: result
		});
	};

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		if (nextProps.isShown)
			return {
				valueIn: '',
				value: 0,
				isShown: nextProps.isShown,
				type: nextProps.type
			};
		else
			return {
				valueIn: prevState.valueIn,
				value: prevState.value,
				isShown: nextProps.isShown,
				type: prevState.type
			};
	}

	public render() {
		const {
			isShown,
			type,
			assets,
			currentPrice,
			lastResetETHPrice,
			openTF,
			handleBuySell,
			handleCreation,
			handleRedemption
		} = this.props;
		const { valueIn, value } = this.state;
		let limit = 0;
		switch (type) {
			case 'Creation': {
				limit = assets.ETH;
				break;
			}
			case 'Redemption': {
				limit = d3.min([assets.ClassA, assets.ClassB]) || 0;
				break;
			}
			case 'Class A': {
				limit = assets.ClassA;
				break;
			}
			default: {
				limit = assets.ClassB;
				break;
			}
		}
		return (
			<div className={'tf-' + isShown + ' transaction-form'}>
				<div className="transaction-form-title">{type}</div>
				<div className="transaction-form-body">
					<div className="tfbody-left">
						<div className="tfbody-title">Holdings</div>
						<div className="tfbody-body">
							<Asset name="ETH" value={assets.ETH} src={ethIcon} />
							<Asset name="Class A" value={assets.ClassA} src={classAIcon} />
							<Asset name="Class B" value={assets.ClassB} src={classBIcon} />
						</div>
					</div>
					<div className="tfbody-right">
						<div className="tfbody-title">Transaction</div>
						<div className="tfbody-body">
							<div>{Description(this.state.type, value, currentPrice, lastResetETHPrice)}</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<div className="pb-wrapper">
									<button onClick={() => this.handle25(limit)}>25%</button>
									<button onClick={() => this.handle50(limit)}>50%</button>
									<button onClick={() => this.handle75(limit)}>75%</button>
									<button onClick={() => this.handle100(limit)}>100%</button>
								</div>
								<input
									onChange={e =>
										this.setState({
											valueIn: e.target.value,
											value:
												this.round(Number(e.target.value)) < limit
													? this.round(Number(e.target.value))
													: limit
										})
									}
									value={valueIn}
									className="tf-input"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="transaction-form-bottom">
					{ButtonGroup(
						value,
						type,
						openTF,
						handleBuySell,
						handleCreation,
						handleRedemption
					)}
				</div>
			</div>
		);
	}
}
