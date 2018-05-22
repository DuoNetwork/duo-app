import { connect } from 'react-redux';
import * as uiActions from '../actions/uiActions';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		history: state.ui.history
	};
}

function mapDispatchToProps(dispatch: reduxTypes.Dispatch) {
	return {
		refresh: () => dispatch(uiActions.refresh()),
		addHistory: (tx: string) => dispatch(uiActions.addHistory(tx))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Duo);
