import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		state: state.contract.state
	};
}

export default connect(mapStateToProps, {})(Duo);
