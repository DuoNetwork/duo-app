import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dualClassActions from 'ts/actions/dualClassActions';
import * as uiActions from 'ts/actions/uiActions';
import chartUtil from 'ts/common/chartUtil';
import { IState } from 'ts/common/types';
import util from 'ts/common/util';
import TimeSeriesCard from 'ts/components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	const prices = chartUtil.mergeLastestToPrices(
		state.dualClass.exchangePrices,
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
			state.dualClass.acceptedPrices,
			state.dualClass.states,
			{
				price: state.dualClass.states.lastPrice,
				timestamp: state.dualClass.states.lastPriceTime
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
			dispatch(dualClassActions.fetchExchangePrices());
		},
		handlePeriodUpdate: (period: number) => {
			dispatch(uiActions.updatePeriod(period));
			dispatch(dualClassActions.fetchExchangePrices());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeSeriesCard);
