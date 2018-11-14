import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from '../../actions/beethovenActions';
import * as uiActions from '../../actions/uiActions';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import util from '../../common/util';
import TimeSeriesCard from '../../components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	const prices = chartUtil.mergeLastestToPrices(
		state.beethoven.exchangePrices,
		util.getLastPriceFromStatus(state.dynamo.status)[state.ui.source]
	);
	const period = state.ui.period;
	return {
		locale: state.ui.locale,
		prices: prices.length
			? period === prices[0].period
				? prices
				: chartUtil.mergePrices(prices, period)
			: prices,
		acceptedPrices: chartUtil.mergeLastestToAcceptedPrices(
			state.beethoven.acceptedPrices,
			state.beethoven.states,
			{
				price: state.beethoven.states.lastPrice,
				timestamp: state.beethoven.states.lastPriceTime
			}
		),
		source: state.ui.source,
		period: period
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		handleSourceUpdate: (src: string) => {
			dispatch(uiActions.updateSource(src));
			dispatch(beethovenActions.fetchExchangePrices());
		},
		handlePeriodUpdate: (period: number) => {
			dispatch(uiActions.updatePeriod(period));
			dispatch(beethovenActions.fetchExchangePrices());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeSeriesCard);
