import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovanActions from '../../actions/beethovanActions';
import * as uiActions from '../../actions/uiActions';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import util from '../../common/util';
import TimeSeriesCard from '../../components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	const prices = chartUtil.mergeLastestToPrices(
		state.beethovan.exchangePrices,
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
			state.beethovan.acceptedPrices,
			state.beethovan.states,
			{
				price: state.beethovan.states.lastPrice,
				timestamp: state.beethovan.states.lastPriceTime
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
			dispatch(beethovanActions.fetchExchangePrices());
		},
		handlePeriodUpdate: (period: number) => {
			dispatch(uiActions.updatePeriod(period));
			dispatch(beethovanActions.fetchExchangePrices());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeSeriesCard);
