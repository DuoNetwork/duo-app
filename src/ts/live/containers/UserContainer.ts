import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as contractActions from '../actions/contractActions';
import { IState } from '../common/types';
import User from '../components/User';

function mapStateToProps(state: IState) {
	return {
		network: state.contract.network,
		allBalances: state.contract.allBalances,
		userLength: state.contract.states.usersLength
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		load: (start: number, end: number) => {
			dispatch(contractActions.getCustodianStates());
			dispatch(contractActions.getAllBalances(start, end));
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(User) as any);
