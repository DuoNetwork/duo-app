import { connect } from 'react-redux';
import * as uiActions from '../../actions/uiActions';
import * as reduxTypes from '../../common/reduxTypes';
import { IAssets } from '../../common/types';
import TransactionCard from '../../components/Cards/TransactionCard';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		price: state.ui.price,
		assets: state.ui.assets,
		history: state.ui.history,
		resetPrice: state.ui.resetPrice,
		beta: state.ui.beta,
	};
}

function mapDispatchToProps(dispatch: reduxTypes.Dispatch) {
	return {
		message: (type: string, content: string) =>
			dispatch(uiActions.messsage(type, content, true)),
		trade: (history: string, assets: IAssets) => dispatch(uiActions.trade(history, assets)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard);
