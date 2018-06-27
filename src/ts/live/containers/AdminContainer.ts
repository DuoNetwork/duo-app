import { connect } from 'react-redux';
import { IState } from '../common/types';
import Admin from '../components/Admin';

function mapStateToProps(state: IState) {
	return {
		network: state.contract.network,
		addresses: state.contract.addresses,
	};
}

export default connect(
	mapStateToProps,
	{}
)(Admin);
