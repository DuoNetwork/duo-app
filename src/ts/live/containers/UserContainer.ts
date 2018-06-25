import { connect } from 'react-redux';
import { IState } from '../common/types';
import User from '../components/User';

function mapStateToProps(state: IState) {
	return {
		network: state.contract.network,
		allBalances: state.contract.allBalances,
		userLength: state.contract.states.usersLength
	};
}

export default connect(
	mapStateToProps,
	{}
)(User);
