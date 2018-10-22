import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../common/types';
import Admin from '../components/Admin';

function mapStateToProps(state: IState) {
	return {
		network: state.web3.network,
		addresses: state.beethovan.beethovanAddresses,
		states: state.beethovan.beethovanStates,
		prices: state.beethovan.beethovanPrices,
		addressPool: state.beethovan.addressPool,
		account: state.web3.account
	};
}

export default withRouter(connect(
	mapStateToProps,
	{}
)(Admin) as any);
