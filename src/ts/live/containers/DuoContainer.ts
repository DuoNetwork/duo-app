import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as contractActions from '../actions/contractActions';
import * as uiActions from '../actions/uiActions';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		network: state.contract.network,
		account: state.contract.account,
		sourceLast: state.dynamo.last,
		conversion: state.dynamo.conversion,
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Duo);
