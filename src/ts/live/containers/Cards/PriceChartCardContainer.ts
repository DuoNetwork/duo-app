import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IPriceBar, ISourceData, IState } from '../../common/types';
import PriceChartCard from '../../components/Cards/PriceChartCard';

function mapStateToProps(state: IState) {
	const hourly = state.dynamo.hourly;
	const minutely = state.dynamo.minutely;
	const price = state.dynamo.price;
	chartUtil.mergeLastToPriceBar(hourly, state.dynamo.last, true);
	chartUtil.mergeLastToPriceBar(minutely, state.dynamo.last, false);
	const mergedMinutely: ISourceData<IPriceBar[]> = {
		bitfinex: [],
		gemini: [],
		gdax: [],
		kraken: []
	};
	for (const src in minutely) {
		const srcData: IPriceBar[] = minutely[src];
		mergedMinutely[src] = [];
		for (let i = srcData.length; i > 0; i -= 5)
			mergedMinutely[src].push(chartUtil.mergePriceBars(srcData.slice(Math.max(0, i - 5), i)));
		mergedMinutely[src].sort((a, b) => a.timestamp - b.timestamp);
	}
	chartUtil.mergeLastToPrice(price, state.contract.states, state.contract.prices.last);
	return {
		hourly: state.dynamo.hourly,
		minutely: mergedMinutely,
		prices: state.dynamo.price
	};
}

export default connect(
	mapStateToProps,
	{}
)(PriceChartCard);
