import { connect } from 'react-redux';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances
	};
}

export default connect(mapStateToProps, {})(Duo);
