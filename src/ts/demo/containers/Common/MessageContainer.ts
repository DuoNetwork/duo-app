import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as uiActions from '../../actions/uiActions';
import { IState } from '../../common/types';
import Message from '../../components/Common/Message';

function mapStateToProps(state: IState) {
	return {
		type: state.ui.message.type,
		content: state.ui.message.content,
		visible: state.ui.message.visible
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		close: () => dispatch(uiActions.messsage('', '', false))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Message);
