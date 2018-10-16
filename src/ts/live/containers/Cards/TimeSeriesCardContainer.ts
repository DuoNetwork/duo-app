import { connect } from 'react-redux';
// import chartUtil from '../../common/chartUtil';
import { IState } from '../../common/types';
import TimeSeriesCard from '../../components/Cards/TimeSeriesCard';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		prices: state.dynamo.prices,
		acceptedPrices: state.dynamo.acceptedPrices,
		source: state.ui.source,
		period: state.ui.period
	};
}

function mapDispatchToProps(/*dispatch: ThunkDispatch<IState, undefined, AnyAction>*/) {
	return {
		handleSourceUpdate: (src: string) => src,
		handlePeriodUpdate: (period: number) => period
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimeSeriesCard);
