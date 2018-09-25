import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../common/types';
import Status from '../components/Status';

function mapStateToProps(state: IState) {
	return {
		network: state.contract.network,
		status: state.dynamo.status
	};
}

export default withRouter(connect(
	mapStateToProps,
	{}
)(Status) as any);
