import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovanActions from '../actions/beethovanActions';
import { IState } from '../common/types';
import Status from '../components/Status';

function mapStateToProps(state: IState) {
	return {
		network: state.web3.network,
		status: state.dynamo.status
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		getStates: async () => {
			await dispatch(beethovanActions.statusActions());
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Status) as any);
