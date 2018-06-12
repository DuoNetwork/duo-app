import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import NavChartCard from '../../components/Cards/NavChartCard';

function mapStateToProps(state: IState) {
	const prices = state.dynamo.prices;
	const resets = chartUtil.reset(
		prices,
		state.contract.states.limitUpper,
		state.contract.states.limitLower,
		state.contract.states.limitPeriodic
	);
	const mergedPrices = chartUtil.mergeReset(prices, resets);
	chartUtil.mergeLastToPrice(mergedPrices, state.contract.states, state.contract.prices.last);
	return {
		prices: mergedPrices,
		resets: resets
	};
}

export default connect(
	mapStateToProps,
	{}
)(NavChartCard);
