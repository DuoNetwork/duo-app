import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import PriceChartCard from '../../components/Cards/PriceChartCard';

function mapStateToProps(state: IState) {
	const hourly = state.dynamo.hourly;
	const minutely = state.dynamo.minutely;
	chartUtil.mergeLastToPriceBar(hourly, state.dynamo.last, true);
	chartUtil.mergeLastToPriceBar(minutely, state.dynamo.last, false);
	return {
		hourly: state.dynamo.hourly,
		minutely: state.dynamo.minutely,
		prices: state.dynamo.prices
	};
}

export default connect(
	mapStateToProps,
	{}
)(PriceChartCard);
