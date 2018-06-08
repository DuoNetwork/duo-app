import { connect, Dispatch } from 'react-redux';
import * as uiActions from '../../actions/uiActions';
import { IAssets, IState } from '../../common/types';
import TransactionCard from '../../components/Cards/TransactionCard';

function mapStateToProps(state: IState) {
	return {
		price: state.ui.price,
		assets: state.ui.assets,
		trades: state.ui.trades,
		resetPrice: state.ui.resetPrice[state.ui.day].value,
		beta: state.ui.beta[state.ui.day].value
	};
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
	return {
		message: (type: string, content: string) =>
			dispatch(uiActions.messsage(type, content, true)),
		trade: (history: string, assets: IAssets) => dispatch(uiActions.trade(history, assets))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionCard);
