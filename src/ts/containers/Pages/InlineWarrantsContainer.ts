// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as inlineWarrentAction from 'ts/actions/inlineWarrentActions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import InlineWarrent from 'ts/components/Pages/InlineWarrant';

function mapStateToProps(state: IState) {
	return {
		locale: state.ui.locale,
		address: state.web3.account,
		duoBalance: state.stake.duo,
		addressInfo: state.inlineWarrent.addressInfo,
		currentRoundInfo: state.inlineWarrent.currentRoundInfo
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(inlineWarrentAction.subscribe()),
		refresh: () => dispatch(inlineWarrentAction.refresh())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InlineWarrent);
