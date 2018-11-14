import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from 'ts/actions/beethovenActions';
import { IState } from 'ts/common/types';
import BeethovenAdmin from 'ts/components/BeethovenAdmin';

function mapStateToProps(state: IState) {
	return {
		states: state.beethoven.states,
		account: state.web3.account,
		addresses: state.beethoven.addresses
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(beethovenActions.subscribeAdmin()),
		unsubscribe: () => dispatch(beethovenActions.subscriptionUpdate(0))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BeethovenAdmin);
