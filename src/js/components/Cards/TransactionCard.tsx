//import * as d3 from 'd3';
import * as React from 'react';
import { IAssets, IPriceData } from '../../common/types';
import TransactionForm from '../Forms/TransactionForm';
import HistroyCard from './HistoryCard';

interface IProps {
	handleBuySell: (amount: number, isA: boolean) => void;
	handleCreation: (amount: number) => void;
	handleRedemption: (amount: number) => void;
	assets: IAssets;
	currentPrice: IPriceData;
	resetToggle: boolean;
	lastResetETHPrice: number;
	showTFGlobal: boolean;
	typeTF: string;
	openTF: (e: boolean, type?: string) => void;
	history: string[];
}

interface IState {
	resetToggle: boolean;
	tfType: string;
}

export default class TransactionCard extends React.PureComponent<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			resetToggle: false,
			tfType: ''
		};
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		if (nextProps.resetToggle !== prevState.resetToggle)
			return {
				resetToggle: nextProps.resetToggle,
				tfType: nextProps.typeTF
			};

		return null;
	}

	public round = num => {
		return +(Math.round((num + 'e+2') as any) + 'e-2');
	};

	public render() {
		const {
			assets,
			currentPrice,
			lastResetETHPrice,
			handleBuySell,
			handleCreation,
			handleRedemption,
			showTFGlobal,
			typeTF,
			openTF,
			history
		} = this.props;
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
							isShown={showTFGlobal}
							type={typeTF}
							assets={assets}
							currentPrice={currentPrice}
							lastResetETHPrice={lastResetETHPrice}
							openTF={openTF}
							handleBuySell={handleBuySell}
							handleCreation={handleCreation}
							handleRedemption={handleRedemption}
						/>
					</div>
					<div style={{ width: '360px' }}>
						<div className="tc-buttons-wrapper">
							<div className="tc-buttons-title">Transaction</div>
							<div className="tc-buttons-body">
								<button disabled={showTFGlobal} onClick={() => openTF(true, 'Creation')}>
									CREATION
								</button>
								<button disabled={showTFGlobal} onClick={() => openTF(true, 'Redemption')}>
									REDEMPTION
								</button>
								<button disabled={showTFGlobal} onClick={() => openTF(true, 'Class A')}>
									ETH &#60; &#62; ClassA
								</button>
								<button disabled={showTFGlobal} onClick={() => openTF(true, 'Class B')}>
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
