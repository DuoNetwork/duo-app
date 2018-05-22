import { connect } from 'react-redux';
import * as uiActions from '../../actions/uiActions';
import * as reduxTypes from '../../common/reduxTypes';
import Message from '../../components/Common/Message';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		type: state.ui.message.type,
		content: state.ui.message.content,
		visible: state.ui.message.visible
	};
}

function mapDispatchToProps(dispatch: reduxTypes.Dispatch) {
	return {
		close: () => dispatch(uiActions.messsage('', '', false))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
