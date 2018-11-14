import { connect } from 'react-redux';
import { IState } from 'ts/common/types';
import Status from 'ts/components/Status';

function mapStateToProps(state: IState) {
	return {
		status: state.dynamo.status
	};
}

export default connect(
	mapStateToProps,
	{}
)(Status);
