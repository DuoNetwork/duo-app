import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import NavChartCard from '../../components/Cards/NavChartCard';

function mapStateToProps(state: IState) {
	const price = state.dynamo.price;
	const reset = chartUtil.reset(
		price,
		state.contract.states.limitUpper,
		state.contract.states.limitLower,
		state.contract.states.limitPeriodic
	);
	const mergedPrice = chartUtil.mergeReset(price, reset);
	chartUtil.mergeLastToPrice(mergedPrice, state.contract.states, state.contract.prices.last);
	return {
		price: mergedPrice,
		reset: reset
	};
}

export default connect(
	mapStateToProps,
	{}
)(NavChartCard);
