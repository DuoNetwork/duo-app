// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as stakeActions from 'ts/actions/stakeActions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import StakingAdmin from 'ts/components/Pages/StakingAdmin';

function mapStateToProps(state: IState) {
	return {
		account: state.web3.account,
		duoBalance: state.stake.duo,
		addresses: state.stake.addresses,
		contractStates: state.stake.states,
		contractDUO: state.stake.contractDUO,
		gasPrice: state.web3.gasPrice
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(stakeActions.subscribe())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StakingAdmin);
