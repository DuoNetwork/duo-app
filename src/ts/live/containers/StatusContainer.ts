import { connect } from 'react-redux';
import { IState } from '../common/types';
import Status from '../components/Status';

function mapStateToProps(state: IState) {
	return {
		status: state.dynamo.status
	};
}

export default connect(
	mapStateToProps,
	{}
)(Status);
