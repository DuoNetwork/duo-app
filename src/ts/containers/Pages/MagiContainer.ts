import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as magiActions from 'ts/actions/magiActions';
import { IState } from 'ts/common/types';
import Magi from 'ts/components/Pages/Magi';

function mapStateToProps(state: IState) {
	return {
		acceptedPrices: state.magi.acceptedPrices
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(magiActions.subscribe()),
		unsubscribe: () => dispatch(magiActions.subscriptionUpdate(0))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Magi);
