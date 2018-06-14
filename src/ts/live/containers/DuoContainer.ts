import { connect } from 'react-redux';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		states: state.contract.states,
		reset: state.contract.prices.reset,
		balances: state.contract.balances,
		network: state.contract.network,
		account: state.contract.account
	};
}

export default connect(
	mapStateToProps,
	{}
)(Duo);
