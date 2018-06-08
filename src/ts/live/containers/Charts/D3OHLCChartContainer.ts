import { connect } from 'react-redux';
import { IState } from '../../common/types';
import D3OHLCChart from '../../components/Charts/D3OHLCChart';

function mapStateToProps(state: IState) {
	return {
		account: state.contract.account,
		refresh: state.ui.refresh,
		states: state.contract.states,
		prices: state.contract.prices,
		balances: state.contract.balances,
		hourly: state.dynamo.hourly,
		minutely: state.dynamo.minutely
	};
}

export default connect(
	mapStateToProps,
	{}
)(D3OHLCChart);
