import { connect } from 'react-redux';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import * as dualClassActions from 'ts/actions/dualClassActions';
// import * as uiActions from 'ts/actions/uiActions';
import chartUtil from 'ts/common/chartUtil';
import { IState } from 'ts/common/types';
//import util from 'ts/common/util';
import TimeSeriesCard from 'ts/components/Cards/TimeSeriesCardIW';

function mapStateToProps(state: IState) {
	console.log(state.inlineWarrent);
	const prices = state.inlineWarrent.exchangePrices
	//const period = state.ui.period;
	return {
		locale: state.ui.locale,
		prices: chartUtil.mergePrices(prices, 5)
	};
}

// function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
// 	return {
// 		handleSourceUpdate: (src: string) => {
// 			dispatch(uiActions.updateSource(src));
// 			dispatch(dualClassActions.fetchExchangePrices());
// 		},
// 		handlePeriodUpdate: (period: number) => {
// 			dispatch(uiActions.updatePeriod(period));
// 			dispatch(dualClassActions.fetchExchangePrices());
// 		}
// 	};
// }

export default connect(mapStateToProps)(TimeSeriesCard);
