import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as dualClassActions from 'ts/actions/dualClassActions';
import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
import util from 'ts/common/util';
import DualClassCustodian from 'ts/components/Pages/DualClassCustodian';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.dualClass.states,
		account: state.web3.account,
		sourceLast: util.getLastPriceFromStatus(state.dynamo.status),
		conversions: state.dualClass.conversions,
		gasPrice: state.web3.gasPrice,
		eth: state.web3.balance,
		aToken: state.dualClass.balances.a,
		bToken: state.dualClass.balances.b
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (type: string, tenor: string) =>
			dispatch(dualClassActions.subscribe(type, tenor)),
		unsubscribe: (type: string, tenor: string) =>
			dispatch(dualClassActions.subscriptionUpdate(type, tenor, 0)),
		refresh: () => {
			dispatch(web3Actions.getBalance());
			dispatch(dualClassActions.refresh(false));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DualClassCustodian);
