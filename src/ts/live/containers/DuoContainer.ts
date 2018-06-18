import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as uiActions from '../actions/uiActions';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		network: state.contract.network,
		account: state.contract.account,
		sourceLast: state.dynamo.last,
		conversion: state.dynamo.conversion,
		uiConversion: state.dynamo.uiConversion
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		refresh: () => dispatch(uiActions.refresh())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Duo);
