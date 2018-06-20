import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import PriceChartCard from '../../components/Cards/PriceChartCard';

function mapStateToProps(state: IState) {
	const hourly = state.dynamo.hourly;
	const minutely = state.dynamo.minutely;
	const price = state.dynamo.price;
	chartUtil.mergeLastToPriceBar(hourly, state.dynamo.last, true);
	chartUtil.mergeLastToPriceBar(minutely, state.dynamo.last, false);
	chartUtil.mergeLastToPrice(price, state.contract.states, state.contract.prices.last);
	return {
		hourly: state.dynamo.hourly,
		minutely: state.dynamo.minutely,
		prices: state.dynamo.price
	};
}

export default connect(
	mapStateToProps,
	{}
)(PriceChartCard);
