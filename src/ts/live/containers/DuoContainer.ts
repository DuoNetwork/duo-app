import { connect } from 'react-redux';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		account: state.contract.account,
		refresh: state.ui.refresh,
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		hourly: state.dynamo.hourly,
		minutely: state.dynamo.minutely,
		network: state.contract.network
	};
}

export default connect(
	mapStateToProps,
	{}
)(Duo);
