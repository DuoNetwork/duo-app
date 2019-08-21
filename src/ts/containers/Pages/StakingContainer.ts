// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as stakeActions from 'ts/actions/stakeActions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import Staking from 'ts/components/Pages/Staking';

function mapStateToProps(state: IState) {
	return {
		contractStates: state.stake.states,
		account: state.web3.account,
		duoBalance: state.stake.duo,
		duoAllowance: state.stake.allowance,
		addresses: state.stake.addresses,
		userStakes: state.stake.userStake,
		oracleStakes: state.stake.oracleStake,
		userAward: state.stake.userAward,
		locale: state.ui.locale
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: (index: number) => dispatch(stakeActions.subscribe(index)),
		refresh: (index: number) => dispatch(stakeActions.refresh(index))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Staking);
