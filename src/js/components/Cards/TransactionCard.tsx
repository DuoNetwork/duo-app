//import * as d3 from 'd3';
import * as React from 'react';
import { IAssets, IPriceData } from '../../common/types';
import TransactionForm from '../Forms/TransactionForm';
import HistroyCard from './HistoryCard';

interface IProps {
	handleBuySell: (amount: number, isA: boolean) => boolean;
	handleCreation: (amount: number) => boolean;
	handleRedemption: (amount: number) => boolean;
	assets: IAssets;
	currentPrice: IPriceData;
	resetPrice: number;
	beta: number
	history: string[];
}

interface IState {
	type: string;
}

export default class TransactionCard extends React.PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			type: ''
		};
	}

	public round = num => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};

	public handleOpen = (type: string) => this.setState({ type });

	public handleClose = () => this.setState({type: ''});

	public render() {
		const {
			assets,
			currentPrice,
			resetPrice,
			beta,
			handleBuySell,
			handleCreation,
			handleRedemption,
			history
		} = this.props;
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
						<HistroyCard history={history} />
						<TransactionForm
							visible={!!type}
							type={type}
							onClose={this.handleClose}
							assets={assets}
							currentPrice={currentPrice}
							resetPrice={resetPrice}
							beta={beta}
							handleBuySell={handleBuySell}
							handleCreation={handleCreation}
							handleRedemption={handleRedemption}
						/>
					</div>
					<div style={{ width: '360px' }}>
						<div className="tc-buttons-wrapper">
							<div className="tc-buttons-title">Transaction</div>
							<div className="tc-buttons-body">
								<button disabled={!!type} onClick={() => this.handleOpen('Creation')}>
									CREATION
								</button>
								<button
									disabled={!!type}
									onClick={() => this.handleOpen('Redemption')}
								>
									REDEMPTION
								</button>
								<button disabled={!!type} onClick={() => this.handleOpen('Class A')}>
									ETH &#60; &#62; ClassA
								</button>
								<button disabled={!!type} onClick={() => this.handleOpen('Class B')}>
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
