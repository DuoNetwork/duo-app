import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from '../actions/beethovenActions';
import * as web3Actions from '../actions/web3Actions';
import { IState } from '../common/types';
import util from '../common/util';
import { web3Wrapper } from '../common/wrappers';
import Beethoven from '../components/Beethoven';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.beethoven.states,
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
		subscribe: () =>
			dispatch(beethovenActions.subscribe(web3Wrapper.contractAddresses.Beethoven.custodian)),
		unsubscribe: () => dispatch(beethovenActions.subscriptionUpdate(0)),
		refresh: () => {
			dispatch(web3Actions.getBalance());
			dispatch(beethovenActions.getBalances());
			dispatch(beethovenActions.getStates());
			dispatch(
				beethovenActions.fetchConversions(web3Wrapper.contractAddresses.Beethoven.custodian)
			);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Beethoven);
