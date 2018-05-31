import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Status from '../components/Status';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		addresses: state.contract.addresses,
		status: state.dynamo.status
	};
}

export default connect(mapStateToProps, {})(Status);
