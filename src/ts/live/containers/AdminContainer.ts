import { connect } from 'react-redux';
import { IState } from '../common/types';
import Admin from '../components/Admin';

function mapStateToProps(state: IState) {
	return {
		allBalances: state.contract.allBalances,
		userLength: state.contract.states.usersLength
	};
}

export default connect(
	mapStateToProps,
	{}
)(Admin);
