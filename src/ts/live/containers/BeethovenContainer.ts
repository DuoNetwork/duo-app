import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from '../actions/beethovenActions';
import * as uiActions from '../actions/uiActions';
import * as web3Actions from '../actions/web3Actions';
import { IState } from '../common/types';
import util from '../common/util';
import Beethoven from '../components/Beethoven';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.beethoven.states,
		network: state.web3.network,
		account: state.web3.account,
		sourceLast: util.getLastPriceFromStatus(state.dynamo.status),
		conversions: state.beethoven.conversions,
		gasPrice: state.web3.gasPrice,
		eth: state.web3.balance,
		aToken: state.beethoven.balances.a,
		bToken: state.beethoven.balances.b
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (custodian: string) => dispatch(beethovenActions.subscribe(custodian)),
		unsubscribe: () => dispatch(beethovenActions.subscriptionUpdate(0)),
		refresh: (custodian: string) => dispatch(beethovenActions.refresh(custodian)),
		refreshBalance: (custodian: string) => {
			dispatch(web3Actions.getBalance());
			dispatch(beethovenActions.getBalances());
			dispatch(beethovenActions.getStates());
			dispatch(beethovenActions.fetchConversions(custodian));
		},
		updateLocale: (locale: string) => dispatch(uiActions.localeUpdate(locale))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Beethoven) as any);
