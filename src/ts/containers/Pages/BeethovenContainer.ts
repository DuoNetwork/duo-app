import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as beethovenActions from 'ts/actions/beethovenActions';
import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
import util from 'ts/common/util';
import Beethoven from 'ts/components/Pages/Beethoven';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		states: state.beethoven.states,
		account: state.web3.account,
		sourceLast: util.getLastPriceFromStatus(state.dynamo.status),
		conversions: state.beethoven.conversions,
		gasPrice: state.web3.gasPrice,
		eth: state.web3.balance,
		aToken: state.beethoven.balances.a,
		bToken: state.beethoven.balances.b
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (tenor: string) =>
			dispatch(beethovenActions.subscribe(tenor)),
		unsubscribe: (tenor: string) => dispatch(beethovenActions.subscriptionUpdate(tenor, 0)),
		refresh: () => {
			dispatch(web3Actions.getBalance());
			dispatch(beethovenActions.refresh(false));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Beethoven);
