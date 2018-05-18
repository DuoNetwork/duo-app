import * as d3 from 'd3';
import * as React from 'react';
import { IAssets, IPriceData } from '../../types';
import TransactionForm from '../Forms/TransactionForm';
import HistroyCard from './HistoryCard';

interface IProps {
	handleBuySell: (amount: number, isA: boolean) => string;
	handleCreation: (amount: number) => string;
	handleRedemption: (amount: number) => string;
	assets: IAssets;
	currentPrice: IPriceData;
	resetToggle: boolean;
	lastResetETHPrice: number;
}

interface IState {
	history: string[];
	CreationIn: string;
	RedemptionIn: string;
	ClassAIn: string;
	ClassBIn: string;
	Creation: number;
	Redemption: number;
	ClassA: number;
	ClassB: number;
	resetToggle: boolean;
	showTF: boolean;
}

export default class TransactionCard extends React.PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			history: [],
			CreationIn: '',
			RedemptionIn: '',
			ClassAIn: '',
			ClassBIn: '',
			Creation: 0,
			Redemption: 0,
			ClassA: 0,
			ClassB: 0,
			resetToggle: false,
			showTF: false
		};
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		if (nextProps.resetToggle !== prevState.resetToggle)
			return {
				history: [],
				CreationIn: '',
				RedemptionIn: '',
				ClassAIn: '',
				ClassBIn: '',
				Creation: 0,
				Redemption: 0,
				ClassA: 0,
				ClassB: 0,
				resetToggle: nextProps.resetToggle
			};

		return null;
	}

	public round = num => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};

	public toggleShown = () => {
		const newShow = !this.state.showTF;
		this.setState({
			showTF: newShow
		});
	};

	public render() {
		const {
			assets,
			currentPrice,
			lastResetETHPrice,
			handleBuySell,
			handleCreation,
			handleRedemption
		} = this.props;
		const {
			history,
			CreationIn,
			RedemptionIn,
			ClassAIn,
			ClassBIn,
			Creation,
			Redemption,
			ClassA,
			ClassB,
			showTF
		} = this.state;
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						width: '960px',
						position: 'relative'
					}}
				>
					<button
						style={{
							position: 'absolute',
							left: '610px',
							top: '10px',
							padding: '5px 15px'
						}}
						onClick={this.toggleShown}
					>
						open
					</button>
					<div className="history-transaction-card-wrapper">
						<HistroyCard history={history} />
						<TransactionForm
							isShown={showTF}
							type="Redemption"
							assets={assets}
							currentPrice={currentPrice}
							lastResetETHPrice={lastResetETHPrice}
						/>
					</div>
					<div style={{ width: '360px' }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row',
								color: 'white'
							}}
						>
							<table className="transaction">
								<tbody>
									<tr style={{ textAlign: 'center' }}>
										<td>Transaction</td>
										<td>Input</td>
										<td>Action</td>
										<td>Currently Own</td>
									</tr>
									<tr>
										<td>Creation</td>
										<td className="trans-input-wrapper">
											Number of ETH
											<input
												onChange={e =>
													this.setState({
														CreationIn: e.target.value,
														Creation: this.round(Number(e.target.value))
													})
												}
												value={CreationIn}
												className="trans-input"
											/>
										</td>
										<td>
											<button
												onClick={() => {
													const result = handleCreation(Creation);
													this.setState({
														CreationIn: '',
														Creation: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
											>
												Create
											</button>
										</td>
										<td style={{ textAlign: 'right' }}>
											{assets.ETH.toFixed(2)}
										</td>
									</tr>
									<tr>
										<td>Redemption</td>
										<td className="trans-input-wrapper">
											Number of ClassA/B
											<input
												onChange={e =>
													this.setState({
														RedemptionIn: e.target.value,
														Redemption: this.round(
															Number(e.target.value)
														)
													})
												}
												value={RedemptionIn}
												className="trans-input"
											/>
										</td>
										<td>
											<button
												onClick={() => {
													const result = handleRedemption(Redemption);
													this.setState({
														RedemptionIn: '',
														Redemption: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
											>
												Redeem
											</button>
										</td>
										<td style={{ textAlign: 'right' }}>
											{(d3.min([assets.ClassA, assets.ClassB]) || 0).toFixed(
												2
											)}
										</td>
									</tr>
									<tr>
										<td>ClassA</td>
										<td className="trans-input-wrapper">
											Number of ClassA
											<input
												onChange={e =>
													this.setState({
														ClassAIn: e.target.value,
														ClassA: this.round(Number(e.target.value))
													})
												}
												value={ClassAIn}
												className="trans-input"
											/>
										</td>
										<td>
											<button
												onClick={() => {
													const result = handleBuySell(ClassA, true);
													this.setState({
														ClassAIn: '',
														ClassA: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
												style={{ marginBottom: '2px' }}
											>
												Buy
											</button>
											<button
												onClick={() => {
													const result = handleBuySell(-ClassA, true);
													this.setState({
														ClassAIn: '',
														ClassA: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
											>
												Sell
											</button>
										</td>
										<td style={{ textAlign: 'right' }}>
											{assets.ClassA.toFixed(2)}
										</td>
									</tr>
									<tr>
										<td>ClassB</td>
										<td className="trans-input-wrapper">
											Number of ClassB
											<input
												onChange={e =>
													this.setState({
														ClassBIn: e.target.value,
														ClassB: this.round(Number(e.target.value))
													})
												}
												value={ClassBIn}
												className="trans-input"
											/>
										</td>
										<td>
											<button
												onClick={() => {
													const result = handleBuySell(ClassB, false);
													this.setState({
														ClassBIn: '',
														ClassB: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
												style={{ marginBottom: '2px' }}
											>
												Buy
											</button>
											<button
												onClick={() => {
													const result = handleBuySell(-ClassB, false);
													this.setState({
														ClassBIn: '',
														ClassB: 0,
														history: result
															? [...history, result]
															: history
													});
												}}
											>
												Sell
											</button>
										</td>
										<td style={{ textAlign: 'right' }}>
											{assets.ClassB.toFixed(2)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
