import { connect } from 'react-redux';
import { IState } from '../../common/types';
import PriceChartCard from '../../components/Cards/PriceChartCard';

function mapStateToProps(state: IState) {
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
