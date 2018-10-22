import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovanActions from '../actions/beethovanActions';
import { IState } from '../common/types';
import User from '../components/User';

function mapStateToProps(state: IState) {
	return {
		network: state.web3.network,
		allBalances: state.beethovan.allBalances,
		userLength: state.beethovan.beethovanStates.usersLength
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		load: (start: number, end: number) => {
			dispatch(beethovanActions.getStates());
			dispatch(beethovanActions.getAllBalances(start, end));
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(User) as any);
