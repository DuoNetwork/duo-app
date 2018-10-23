import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovanActions from '../actions/beethovanActions';
import * as web3Actions from '../actions/web3Actions';
import { IState } from '../common/types';
import Admin from '../components/Admin';

function mapStateToProps(state: IState) {
	return {
		network: state.web3.network,
		addresses: state.beethovan.beethovanAddresses,
		states: state.beethovan.beethovanStates,
		prices: state.beethovan.beethovanPrices,
		addressPool: state.beethovan.addressPool,
		account: state.web3.account
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		init: async () => {
			await dispatch(beethovanActions.getStates());
			dispatch(beethovanActions.getAddresses());
			dispatch(web3Actions.getAccount());
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin) as any);
