import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dualClassActions from 'ts/actions/dualClassActions';
import * as esplanadeActions from 'ts/actions/esplanadeActions';
import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
import EsplanadeAdmin from 'ts/components/Pages/EsplanadeAdmin';

function mapStateToProps(state: IState) {
	return {
		states: state.esplanade.esplanadeStates,
		account: state.web3.account,
		addresses: state.esplanade.esplanadeAddrs,
		gasPrice: state.web3.gasPrice,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(esplanadeActions.subscribeAdmin()),
		unsubscribe: () => dispatch(esplanadeActions.subscriptionUpdate(0)),
		refresh: () => {
			dispatch(web3Actions.getBalance());
			dispatch(dualClassActions.refresh(false));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EsplanadeAdmin);
