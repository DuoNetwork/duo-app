import { connect } from 'react-redux';
import chartUtil from '../../common/chartUtil';
import { IPriceBar, ISourceData, IState } from '../../common/types';
import TimeSeriesCard from '../../components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	const minutely = state.dynamo.minutely;
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
			mergedMinutely[src].push(
				chartUtil.mergePriceBars(srcData.slice(Math.max(0, i - 5), i))
			);
		mergedMinutely[src].sort((a, b) => a.timestamp - b.timestamp);
	}
	const price = chartUtil.mergeLastToPrice(
		state.dynamo.price,
		state.contract.states,
		state.contract.prices.last
	);
	return {
		hourly: state.dynamo.hourly,
		minutely: mergedMinutely,
		prices: price
	};
}

export default connect(
	mapStateToProps,
	{}
)(TimeSeriesCard);
