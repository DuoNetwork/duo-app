// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as inlineWarrentAction from 'ts/actions/inlineWarrentActions';
import * as magiActions from 'ts/actions/magiActions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import InlineWarrentM from 'ts/components/Pages/InlineWarrantM';

function mapStateToProps(state: IState) {
	const prices = state.inlineWarrent.exchangePrices;
	return {
		locale: state.ui.locale,
		contractStates: state.inlineWarrent.states,
		duoBalance: state.inlineWarrent.duo,
		allowance: state.inlineWarrent.allowance,
		userAward: state.inlineWarrent.userAward,
		address: state.web3.account,
		addressInfo: state.inlineWarrent.addressInfo,
		currentRoundInfo: state.inlineWarrent.currentRoundInfo,
		boundaries: state.inlineWarrent.boundaries,
		lastPrice: state.inlineWarrent.exchangePrices[0]
			? state.inlineWarrent.exchangePrices[0].close
			: 0,
		prices: prices,
		acceptedPrices: state.magi.acceptedPrices
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribeMagi: () => dispatch(magiActions.subscribe()),
		unsubscribeMagi: () => dispatch(magiActions.subscriptionUpdate(0)),
		subscribe: () => dispatch(inlineWarrentAction.subscribe()),
		refresh: () => dispatch(inlineWarrentAction.refresh()),
		unsubscribe: () => dispatch(inlineWarrentAction.subscriptionUpdate(0))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InlineWarrentM);
