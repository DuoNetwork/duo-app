import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from '../actions/beethovenActions';
import * as uiActions from '../actions/uiActions';
import * as web3Actions from '../actions/web3Actions';
import * as CST from '../common/constants';
import { IState } from '../common/types';
import { web3Wrapper } from '../common/wrappers';
import Header from '../components/Header';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		network: state.web3.network
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		refresh: (path: string) => {
			dispatch(web3Actions.refresh());
			switch (path.toLowerCase()) {
				case CST.TH_BEETHOVEN.toLowerCase():
					dispatch(
						beethovenActions.refresh(web3Wrapper.contractAddresses.Beethoven.custodian)
					);
					break;
				case CST.TH_MAGI.toLowerCase():
					dispatch(beethovenActions.refresh(web3Wrapper.contractAddresses.Magi));
					break;
				default:
					break;
			}
		},
		updateLocale: (locale: string) => dispatch(uiActions.localeUpdate(locale))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Header) as any);
