//import * as d3 from 'd3';
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
	resetToggle: boolean;
	showTF: boolean;
}

export default class TransactionCard extends React.PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			history: [],
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
		} = this.props;
		const {
			history,
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
					<div className="history-transaction-card-wrapper">
						<HistroyCard history={history} />
						<TransactionForm
							isShown={showTF}
							type="Creation"
							assets={assets}
							currentPrice={currentPrice}
							lastResetETHPrice={lastResetETHPrice}
						/>
					</div>
					<div style={{ width: '360px' }}>
						<div className="tc-buttons-wrapper">
							<div className="tc-buttons-title">Transaction</div>
							<div className="tc-buttons-body">
								<button>CREATION</button>
								<button>REDEMPTION</button>
								<button>ETH &#60;-&#62; ClassA</button>
								<button>ETH &#60;-&#62; ClassB</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
