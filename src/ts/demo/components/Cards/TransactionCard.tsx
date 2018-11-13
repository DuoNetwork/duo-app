import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
import { IAssets, IPriceData } from '../../common/types';
import TransactionForm from '../Forms/TransactionForm';
import HistroyCard from './HistoryCard';

interface IProps {
	assets: IAssets;
	price: IPriceData;
	resetPrice: number;
	beta: number;
	trades: string[];
	trade: (tradeString: string, assets: IAssets) => any;
	message: (type: string, content: string) => any;
}

interface IState {
	type: string;
}

export default class TransactionCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			type: ''
		};
	}

	public round = (num: number) => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};

	public handleOpen = (type: string) => this.setState({ type });

	public handleClose = () => this.setState({ type: '' });

	public handleBuySell = (amount: number, isA: boolean): boolean => {
		const { trade, message, assets, price } = this.props;

		const ethPx = price.ETH;
		const navA = price.ClassA;
		const navB = price.ClassB;
		const valueClassAB = amount * (isA ? navA : navB);
		const valueETH = assets.ETH * ethPx;
		if (amount > 0)
			if (valueClassAB <= valueETH) {
				const rETH = (valueETH - valueClassAB) / ethPx;
				const newAssets: IAssets = {
					ETH: rETH,
					ClassA: assets.ClassA + (isA ? amount : 0),
					ClassB: assets.ClassB + (isA ? 0 : amount)
				};
				trade(
					moment(price.Date).format('YYYY-MM-DD') +
						': Bought ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						' with ' +
						d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
						' ETH.',
					newAssets
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>You bought <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> with <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(valueClassAB / ethPx) +
						' ETH</span>.</div>'
				);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>"
				);
				return false;
			}
		else if (amount < 0)
			if (amount <= assets.ClassA) {
				trade(
					moment(price.Date).format('YYYY-MM-DD') +
						': Sold ' +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						' for ' +
						d3.formatPrefix(',.6', 1)(Math.abs(valueClassAB) / ethPx) +
						' ETH.',
					{
						ETH: assets.ETH - valueClassAB / ethPx,
						ClassA: assets.ClassA + (isA ? amount : 0),
						ClassB: assets.ClassB + (isA ? 0 : amount)
					}
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>You sold <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(-amount) +
						' Class ' +
						(isA ? 'A' : 'B') +
						"</span> for <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(Math.abs(valueClassAB) / ethPx) +
						' ETH</span>.</div>'
				);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient Class " +
						(isA ? 'A' : 'B') +
						' balance.</div>'
				);
				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);
			return false;
		}
	};

	public handleCreation = (amount: number): boolean => {
		const { trade, message, assets, resetPrice, beta, price } = this.props;

		const valuelastResetETHPrice = amount * resetPrice * beta;
		if (amount && amount > 0)
			if (amount <= assets.ETH) {
				const rETH = assets.ETH - amount;
				const splitOutcome = valuelastResetETHPrice / 2;
				const rClassA = assets.ClassA + splitOutcome,
					rClassB = assets.ClassB + splitOutcome;
				trade(
					moment(price.Date).format('YYYY-MM-DD') +
						': Split ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' ETH into ' +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B.',
					{
						ETH: rETH,
						ClassA: rClassA,
						ClassB: rClassB
					}
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>Split <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ETH</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(splitOutcome) +
						' ClassA/B</span>'
				);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient ETH balance.</div>"
				);

				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);

			return false;
		}
	};

	public handleRedemption = (amount: number): boolean => {
		const { trade, message, assets, resetPrice, beta, price } = this.props;
		if (amount && amount > 0)
			if (amount <= (d3.min([assets.ClassA, assets.ClassB]) || 0)) {
				const rClassA = assets.ClassA - amount,
					rClassB = assets.ClassB - amount;
				const combineOutcome = amount * 2;
				const rETH = assets.ETH + combineOutcome / resetPrice / beta;
				trade(
					moment(price.Date).format('YYYY-MM-DD') +
						': Combine ' +
						d3.formatPrefix(',.2', 1)(amount) +
						' ClassA/B into ' +
						d3.formatPrefix(',.6', 1)(combineOutcome / resetPrice) +
						' ETH.',
					{
						ETH: rETH,
						ClassA: rClassA,
						ClassB: rClassB
					}
				);
				message(
					"<div style='color: rgba(136,208,64,1)'>SUCCESS</div>",
					"<div style='color: rgba(255,255,255, .6)'>Combine <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.2', 1)(amount) +
						" ClassA/B</span> into <span style='color: rgba(255,255,255, 1)'>" +
						d3.formatPrefix(',.6', 1)(combineOutcome / resetPrice) +
						' ETH</span>'
				);
				return true;
			} else {
				message(
					"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
					"<div style='color: rgba(255,255,255, .8)'>Insufficient Class A/B balance.</div>"
				);

				return false;
			}
		else {
			message(
				"<div style='color: rgba(214,48,48,1)'>ERROR</div>",
				"<div style='color: rgba(255,255,255, .6)'>Please input a <span style='color: rgba(255,255,255, 1)'>valid(non-zero positive)</span> value.</div>"
			);

			return false;
		}
	};

	public render() {
		const { assets, price, resetPrice, beta, trades } = this.props;
		const { type } = this.state;
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
					<div className="history-transaction-card-wrapper">
						<HistroyCard trades={trades} />
						<TransactionForm
							visible={!!type}
							type={type}
							onClose={this.handleClose}
							assets={assets}
							price={price}
							resetPrice={resetPrice}
							beta={beta}
							handleBuySell={this.handleBuySell}
							handleCreation={this.handleCreation}
							handleRedemption={this.handleRedemption}
						/>
					</div>
					<div style={{ width: '360px' }}>
						<div className="tc-buttons-wrapper">
							<div className="tc-buttons-title">Transaction</div>
							<div className="tc-buttons-body">
								<button
									disabled={!!type}
									onClick={() => this.handleOpen('Creation')}
								>
									CREATION
								</button>
								<button
									disabled={!!type}
									onClick={() => this.handleOpen('Redemption')}
								>
									REDEMPTION
								</button>
								<button
									disabled={!!type}
									onClick={() => this.handleOpen('Class A')}
								>
									ETH &#60; &#62; ClassA
								</button>
								<button
									disabled={!!type}
									onClick={() => this.handleOpen('Class B')}
								>
									ETH &#60; &#62; ClassB
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
