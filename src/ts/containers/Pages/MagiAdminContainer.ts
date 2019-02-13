import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as esplanadeActions from 'ts/actions/esplanadeActions';
import * as magiActions from 'ts/actions/magiActions';
import { IState } from 'ts/common/types';
import MagiAdmin from 'ts/components/Pages/MagiAdmin';

function mapStateToProps(state: IState) {
	return {
		states: state.magi.states,
		priceFeedAddrs: state.magi.addresses.priceFeed,
		account: state.web3.account,
		coldAddresses: state.esplanade.coldAddressPool,
		locale: state.ui.locale,
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => {
			dispatch(magiActions.subscribe());
			dispatch(esplanadeActions.subscribe())
		},
		unsubscribe: () => {
			dispatch(magiActions.subscriptionUpdate(0));
			dispatch(esplanadeActions.subscriptionUpdate(0))
		},
		refresh: () => {
			dispatch(magiActions.refresh());
			dispatch(esplanadeActions.refresh());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MagiAdmin);
