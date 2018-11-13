import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
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

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
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
