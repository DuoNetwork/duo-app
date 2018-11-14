import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as magiActions from '../actions/magiActions';
import { IState } from '../common/types';
import Magi from '../components/Magi';

function mapStateToProps(state: IState) {
	return {
		network: state.web3.network,
		acceptedPrices: state.magi.acceptedPrices
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (contractAddress: string) => dispatch(magiActions.subscribe(contractAddress)),
		unsubscribe: () => dispatch(magiActions.subscriptionUpdate(0))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Magi) as any);
