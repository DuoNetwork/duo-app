import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		custodianStates: state.contract.custodianStates,
		custodianPrices: state.contract.custodianPrices,
		balances: state.contract.balances
	};
}

export default connect(mapStateToProps, {})(Duo);
