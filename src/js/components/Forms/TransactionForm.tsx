import * as d3 from 'd3';
import * as React from 'react';
import { IAssets, IPriceData } from '../../types';

interface IProps {
	isShown: boolean;
	type: string;
	assets: IAssets;
	currentPrice: IPriceData;
	lastResetETHPrice: number;
}

const Asset = (props: { name: string; value: number }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: '10px'
		}}
	>
		<div className="tag-unit-3">{props.name}</div>
		<div className="tag-price-3">{d3.formatPrefix(',.2', 1)(props.value)}</div>
	</div>
);

const ButtonGroup = (type: string) => {
	const buttons: JSX.Element[] = [];
	switch (type) {
		case 'Creation': {
			buttons.push(<button key="1">CREATE</button>);
			break;
		}
		case 'Redemption': {
			buttons.push(<button key="1">REDEEM</button>);
			break;
		}
		default: {
			buttons.push(<button key="1">BUY</button>);
			buttons.push(<button key="2">SELL</button>);
			break;
		}
	}
	buttons.push(<button key="3">CANCEL</button>);
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
		default: {
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
	}
	return contents;
};

const PercentageButtons = () => (
	<div className="pb-wrapper">
		<button>25%</button>
		<button>50%</button>
		<button>75%</button>
		<button>100%</button>
	</div>
);

export default class TransactionForm extends React.Component<IProps> {
	constructor(props) {
		super(props);
	}

	public render() {
		const { isShown, type, assets, currentPrice, lastResetETHPrice } = this.props;
		return (
			<div className={'tf-' + isShown + ' transaction-form'}>
				<div className="transaction-form-title">{type}</div>
				<div className="transaction-form-body">
					<div className="tfbody-left">
						<div className="tfbody-title">Holdings</div>
						<div className="tfbody-body">
							<Asset name="ETH" value={assets.ETH} />
							<Asset name="Class A" value={assets.ClassA} />
							<Asset name="Class B" value={assets.ClassB} />
						</div>
					</div>
					<div className="tfbody-right">
						<div className="tfbody-title">Transaction</div>
						<div className="tfbody-body">
							<div>{Description(type, 10, currentPrice, lastResetETHPrice)}</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<PercentageButtons />
								<input className="tf-input" />
							</div>
						</div>
					</div>
				</div>
				<div className="transaction-form-bottom">{ButtonGroup(type)}</div>
			</div>
		);
	}
}
