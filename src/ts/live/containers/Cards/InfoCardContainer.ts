import { connect } from 'react-redux';
//import { AnyAction } from 'redux';
//import { ThunkDispatch } from 'redux-thunk';
import { IState } from '../../common/types';
import InfoCard from '../../components/Cards/InfoCard';

function mapStateToProps(state: IState) {
	return {
		account: state.contract.account,
		last: state.contract.prices.last,
		reset: state.contract.prices.reset,
		states: state.contract.states,
		navA: state.contract.states.navA,
		navB: state.contract.states.navB,
		balances: state.contract.balances,
		sourceLast: state.dynamo.last
	};
}

export default connect(
	mapStateToProps,
	{}
)(InfoCard);
