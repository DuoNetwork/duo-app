import { connect, Dispatch } from 'react-redux';
import * as uiActions from '../actions/uiActions';
import { IState } from '../common/types';
import Duo from '../components/Duo';

function mapStateToProps(state: IState) {
	return {
		eth: state.ui.eth,
		classA: state.ui.classA,
		classB: state.ui.classB,
		upward: state.ui.upward,
		downward: state.ui.downward,
		periodic: state.ui.periodic,
		resetPrice: state.ui.resetPrice,
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

function mapDispatchToProps(dispatch: Dispatch<IState>) {
	return {
		refresh: () => dispatch(uiActions.refresh()),
		next: () => dispatch(uiActions.next()),
		forward: () => dispatch(uiActions.forward()),
		setting: (c: number, u: number, d: number, p: number) =>
			dispatch(uiActions.setting(c, u, d, p))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Duo);
