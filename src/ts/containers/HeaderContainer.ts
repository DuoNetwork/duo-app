import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dualClassActions from 'ts/actions/dualClassActions';
import * as esplanadeActions from 'ts/actions/esplanadeActions';
import * as magiActions from 'ts/actions/magiActions';
import * as uiActions from 'ts/actions/uiActions';
import * as web3Actions from 'ts/actions/web3Actions';
import * as CST from 'ts/common/constants';
import { IState } from 'ts/common/types';
import Header from 'ts/components/Header';

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
			const lowerPath = path.toLocaleLowerCase();
			console.log('lowerPath, ###########');
			console.log(lowerPath);
			if (lowerPath.includes(CST.BEETHOVEN.toLowerCase()))
				dispatch(dualClassActions.refresh(true));
			else if (lowerPath.includes(CST.TH_MAGI.toLowerCase())) dispatch(magiActions.refresh());
			else if (lowerPath.includes('esplanade')) dispatch(esplanadeActions.refreshAdmin());
		},
		updateLocale: (locale: string) => dispatch(uiActions.localeUpdate(locale))
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Header) as any);
