import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		custodianStates: state.contract.custodianStates
	};
}

export default connect(mapStateToProps, {})(Duo);
