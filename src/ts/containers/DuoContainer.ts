import { connect } from 'react-redux';
import * as uiActions from '../actions/uiActions';
import * as reduxTypes from '../common/reduxTypes';
import Duo from '../components/Duo';

function mapStateToProps(state: reduxTypes.IState) {
	return {
		eth: state.ui.eth,
		classA: state.ui.classA,
		classB: state.ui.classB,
		upward: state.ui.upward,
		downward: state.ui.downward,
		periodic: state.ui.periodic,
		mv: state.ui.mv,
		assets: state.ui.assets,
		price: state.ui.price,
		dayCount: state.ui.day,
		couponRate: state.ui.setting.couponRate,
		upwardResetLimit: state.ui.setting.upwardResetLimit,
		downwardResetLimit: state.ui.setting.downwardResetLimit,
		periodicResetLimit: state.ui.setting.periodicResetLimit
	};
}

function mapDispatchToProps(dispatch: reduxTypes.Dispatch) {
	return {
		refresh: () => dispatch(uiActions.refresh()),
		next: () => dispatch(uiActions.next()),
		setting: (c: number, u: number, d: number, p: number) => dispatch(uiActions.setting( c, u, d, p))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Duo);
