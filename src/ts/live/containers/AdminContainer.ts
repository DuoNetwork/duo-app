import { connect } from 'react-redux';
import { IState } from '../common/types';
import Admin from '../components/Admin';

function mapStateToProps(state: IState) {
	return {
		network: state.contract.network,
		addresses: state.contract.addresses,
		states: state.contract.states,
		prices: state.contract.prices,
		addressPool: state.contract.addressPool
	};
}

export default connect(
	mapStateToProps,
	{}
)(Admin);
