import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		custodianStates: state.contract.custodianStates,
		resetPrice: state.contract.custodianPrices.reset,
		lastPrice: state.contract.custodianPrices.last
	};
}

export default connect(mapStateToProps, {})(Duo);
