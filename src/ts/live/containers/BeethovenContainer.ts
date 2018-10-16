import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as contractActions from '../actions/contractActions';
import * as uiActions from '../actions/uiActions';
import { IState } from '../common/types';
import util from '../common/util';
import Beethoven from '../components/Beethoven';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		network: state.contract.network,
		account: state.contract.account,
		sourceLast: util.getLastPriceFromStatus(state.dynamo.status),
		conversions: state.dynamo.conversions,
		gasPrice: state.contract.gasPrice
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		refresh: () => dispatch(uiActions.refresh()),
		refreshBalance: () => {
			dispatch(contractActions.getBalances());
			dispatch(contractActions.getCustodianStates());
		},
		updateLocale: (locale: string) => dispatch(uiActions.localeUpdate(locale))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Beethoven) as any);
