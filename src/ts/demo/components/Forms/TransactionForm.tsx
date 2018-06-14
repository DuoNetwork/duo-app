import * as d3 from 'd3';
import * as React from 'react';
import classAIcon from '../../../../images/ClassA_white.png';
import classBIcon from '../../../../images/ClassB_white.png';
import ethIcon from '../../../../images/ethIcon.png';
import { IAssets, IPriceData } from '../../common/types';

interface IProps {
	visible: boolean;
	type: string;
	assets: IAssets;
	price: IPriceData;
	resetPrice: number;
	beta: number;
	onClose: () => void;
	handleBuySell: (amount: number, isA: boolean) => boolean;
	handleCreation: (amount: number) => boolean;
	handleRedemption: (amount: number) => boolean;
}

interface IState {
	valueIn: string;
	value: number;
	type: string;
	isETH: boolean;
	visible: boolean;
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
	onClose: () => void,
	handleBuySell: (amount: number, isA: boolean) => boolean,
	handleCreation: (amount: number) => boolean,
	handleRedemption: (amount: number) => boolean,
	isETH?: boolean
) => {
	const buttons: JSX.Element[] = [];
	const isA = type === 'Class A' ? true : false;
	switch (type) {
		case 'Creation': {
			buttons.push(
				<button key="1" onClick={() => handleCreation(value) && onClose()}>
					CREATE
				</button>
			);
			break;
		}
		case 'Redemption': {
			buttons.push(
				<button key="1" onClick={() => handleRedemption(value) && onClose()}>
					REDEEM
				</button>
			);
			break;
		}
		default: {
			buttons.push(
				<button
					key="1"
					onClick={() => handleBuySell(isETH ? value : -value, isA) && onClose()}
				>
					COMFIRM
				</button>
			);
			break;
		}
	}
	buttons.push(
		<button key="3" onClick={onClose}>
			CANCEL
		</button>
	);
	return buttons;
};

const Description = (
	type: string,
	value: number,
	price: IPriceData,
	resetPrice: number,
	beta: number,
	isETH?: boolean
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
					<span>{d3.formatPrefix(',.2', 1)(value * resetPrice / 2)}</span>
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
					<span>{d3.formatPrefix(',.6', 1)(value * 2 / resetPrice / beta)}</span>
					ETH
				</div>
			);
			break;
		}
		case 'Class A': {
			contents.push(
				<div key="1" className="tf-contents-item">
					{isETH ? 'Buy' : 'Sell'}
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					Class A
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					{isETH ? 'with' : 'for'}
					<span>{d3.formatPrefix(',.6', 1)(value * price.ClassA / price.ETH)}</span>
					ETH
				</div>
			);
			break;
		}
		case 'Class B': {
			contents.push(
				<div key="1" className="tf-contents-item">
					{isETH ? 'Buy' : 'Sell'}
					<span>{d3.formatPrefix(',.2', 1)(value)}</span>
					Class B
				</div>
			);
			contents.push(
				<div key="2" className="tf-contents-item">
					{isETH ? 'with' : 'for'}
					<span>{d3.formatPrefix(',.6', 1)(value * price.ClassB / price.ETH)}</span>
					ETH
				</div>
			);
			break;
		}
		default: {
			contents.push(<div key="1" className="tf-contents-item" />);
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
			type: props.type,
			isETH: true,
			visible: false
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
		if (nextProps.visible !== prevState.visible)
			return {
				valueIn: '',
				value: 0,
				type: nextProps.type,
				visible: nextProps.visible
			};

		return null;
	}

	public render() {
		const {
			visible,
			type,
			assets,
			price,
			resetPrice,
			beta,
			onClose,
			handleBuySell,
			handleCreation,
			handleRedemption
		} = this.props;
		const { valueIn, value, isETH } = this.state;
		const isBuySell: boolean = this.state.type === 'Class A' || this.state.type === 'Class B';
		let limit = 0,
			limit1 = 0;
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
				limit = assets.ETH;
				limit1 = assets.ClassA;
				break;
			}
			default: {
				limit = assets.ETH;
				limit1 = assets.ClassB;
				break;
			}
		}
		limit = isBuySell
			? isETH
				? limit * price.ETH / (this.state.type === 'Class A' ? price.ClassA : price.ClassB)
				: limit1
			: limit;
		console.log(limit);
		return (
			<div className={'tf-' + visible + ' transaction-form'}>
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
							<div>
								{Description(
									this.state.type,
									value,
									price,
									resetPrice,
									beta,
									isETH
								)}
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<div className="pb-wrapper">
									{isBuySell ? (
										<div
											style={{
												display: 'flex',
												marginBottom: 5,
												color: 'rgba(250,250,250,0.6)',
												fontSize: '14px',
												marginTop: -20
											}}
										>
											<div
												onClick={() => {
													this.setState({
														isETH: true,
														valueIn: '',
														value: 0
													});
												}}
												style={{
													display: 'flex',
													alignItems: 'center',
													marginRight: 20,
													cursor: 'pointer'
												}}
											>
												<div
													className={
														'input-radio ' +
														(isETH ? 'selected' : 'unselected')
													}
												/>
												<span>BUY</span>
											</div>
											<div
												onClick={() => {
													this.setState({
														isETH: false,
														valueIn: '',
														value: 0
													});
												}}
												style={{
													display: 'flex',
													alignItems: 'center',
													cursor: 'pointer'
												}}
											>
												<div
													className={
														'input-radio ' +
														(isETH ? 'unselected' : 'selected')
													}
												/>
												<span>SELL</span>
											</div>
										</div>
									) : null}
									<div
										style={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<button onClick={() => this.handle25(limit)}>25%</button>
										<button onClick={() => this.handle50(limit)}>50%</button>
										<button onClick={() => this.handle75(limit)}>75%</button>
										<button onClick={() => this.handle100(limit)}>100%</button>
									</div>
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
						onClose,
						handleBuySell,
						handleCreation,
						handleRedemption,
						isETH
					)}
				</div>
			</div>
		);
	}
}
