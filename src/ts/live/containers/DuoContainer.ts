import { connect } from 'react-redux';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		network: state.contract.network,
		account: state.contract.account,
		sourceLast: state.dynamo.last,
		conversion: state.dynamo.conversion
	};
}

export default connect(
	mapStateToProps,
	{}
)(Duo);
