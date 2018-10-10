import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
// import * as contractActions from '../actions/contractActions';
// import * as uiActions from '../actions/uiActions';
import * as wsActions from '../actions/wsActions';
import { IState } from '../common/types';
import Dex from '../components/Dex';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		wsSubMsg: state.ws.subscribe,
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
		subscription: (marketId: string, pair: string) => {
			dispatch(wsActions.onSubscription(marketId, pair));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dex as any);
