import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dualClassActions from 'ts/actions/dualClassActions';
import { IState } from 'ts/common/types';
import DualClassCustodianAdmin from 'ts/components/Pages/DualClassCustodianAdmin';

function mapStateToProps(state: IState) {
	return {
		states: state.dualClass.states,
		account: state.web3.account,
		addresses: state.dualClass.addresses
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (type: string, tenor: string) => dispatch(dualClassActions.subscribeAdmin(type, tenor)),
		unsubscribe: (type: string, tenor: string) => dispatch(dualClassActions.subscriptionUpdate(type, tenor, 0))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DualClassCustodianAdmin);
