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
		for (let i = 0; i < srcData.length; i += 5)
			mergedMinutely[src].push(
				chartUtil.mergePriceBars(srcData.slice(i, Math.min(srcData.length, i + 5)))
			);
	}
	const price = chartUtil.mergeLastToPrice(
		state.dynamo.price,
		state.contract.states,
		state.contract.prices.last
	);
	return {
		hourly: {
			bitfinex: chartUtil.mergeLastToPriceBar(
				state.dynamo.hourly.bitfinex,
				state.dynamo.last.bitfinex,
				true
			),
			gemini: chartUtil.mergeLastToPriceBar(
				state.dynamo.hourly.gemini,
				state.dynamo.last.gemini,
				true
			),
			gdax: chartUtil.mergeLastToPriceBar(
				state.dynamo.hourly.gdax,
				state.dynamo.last.gdax,
				true
			),
			kraken: chartUtil.mergeLastToPriceBar(
				state.dynamo.hourly.kraken,
				state.dynamo.last.kraken,
				true
			)
		},
		minutely: mergedMinutely,
		prices: price
	};
}

export default connect(
	mapStateToProps,
	{}
)(TimeSeriesCard);
