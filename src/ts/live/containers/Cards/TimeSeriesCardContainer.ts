import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dynamoActions from '../../actions/dynamoActions';
import * as uiActions from '../../actions/uiActions';
import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import util from '../../common/util';
import TimeSeriesCard from '../../components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	const latest = util.getLastPriceFromStatus(state.dynamo.status)[state.ui.source];
	const prices = chartUtil.mergeLastestToPrices(state.dynamo.prices, latest);
	const period = state.ui.period;
	return {
		locale: state.ui.locale,
		prices: prices.length
			? period === prices[0].period
				? prices
				: chartUtil.mergePrices(prices, period)
			: prices,
		acceptedPrices: chartUtil.mergeLastestToAcceptedPrices(
			state.dynamo.acceptedPrices,
			state.contract.states,
			latest
		),
		source: state.ui.source,
		period: period
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		handleSourceUpdate: (src: string) => {
			dispatch(uiActions.updateSource(src));
			dispatch(dynamoActions.fetchPrices());
		},
		handlePeriodUpdate: (period: number) => {
			dispatch(uiActions.updatePeriod(period));
			dispatch(dynamoActions.fetchPrices());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeSeriesCard);
