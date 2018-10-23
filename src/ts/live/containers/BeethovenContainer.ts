import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovanActions from '../actions/beethovanActions';
import * as uiActions from '../actions/uiActions';
import { IState } from '../common/types';
import util from '../common/util';
import Beethoven from '../components/Beethoven';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.beethovan.beethovanStates,
		prices: state.beethovan.beethovanPrices,
		balances: state.beethovan.beethovanBalances,
		network: state.web3.network,
		account: state.web3.account,
		sourceLast: util.getLastPriceFromStatus(state.dynamo.status),
		conversions: state.beethovan.beethovanConversions,
		gasPrice: state.web3.gasPrice
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		refresh: () => {
			dispatch(beethovanActions.refresh());
		},
		refreshBalance: () => {
			dispatch(beethovanActions.getBalances());
			dispatch(beethovanActions.getStates());
		},
		updateLocale: (locale: string) => dispatch(uiActions.localeUpdate(locale))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Beethoven) as any);
