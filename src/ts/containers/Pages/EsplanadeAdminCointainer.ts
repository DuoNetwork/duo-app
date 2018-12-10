import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as esplanadeActions from 'ts/actions/esplanadeActions';
import { IState } from 'ts/common/types';
import EsplanadeAdmin from 'ts/components/Pages/EsplanadeAdmin';

function mapStateToProps(state: IState) {
	return {
		states: state.esplanade.esplanadeStates,
		account: state.web3.account,
		addresses: state.esplanade.esplanadeAddrs
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(esplanadeActions.subscribeAdmin()),
		unsubscribe: () => dispatch(esplanadeActions.subscriptionUpdate(0))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EsplanadeAdmin);
