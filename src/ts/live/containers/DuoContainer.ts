import { connect } from 'react-redux';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		refresh: state.ui.refresh,
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		network: state.contract.network
	};
}

export default connect(
	mapStateToProps,
	{}
)(Duo);
