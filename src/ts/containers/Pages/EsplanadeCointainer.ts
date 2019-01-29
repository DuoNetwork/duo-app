import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as esplanadeActions from 'ts/actions/esplanadeActions';
import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
import Esplanade from 'ts/components/Pages/Esplanade';

function mapStateToProps(state: IState) {
	return {
		states: state.esplanade.states,
		account: state.web3.account,
		hotAddressPool: state.esplanade.hotAddressPool,
		coldAddressPool: state.esplanade.coldAddressPool,
		custodianPool: state.esplanade.custodianPool,
		otherContractPool: state.esplanade.otherContractPool,
		moderator: state.esplanade.moderator,
		candidate: state.esplanade.candidate,
		votingData: state.esplanade.votingData,
		gasPrice: state.web3.gasPrice
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(esplanadeActions.subscribe()),
		unsubscribe: () => dispatch(esplanadeActions.subscriptionUpdate(0)),
		refresh: () => {
			dispatch(web3Actions.getBalance());
			dispatch(esplanadeActions.refresh());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Esplanade);
