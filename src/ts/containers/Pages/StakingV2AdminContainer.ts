// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as stakeV2Actions from 'ts/actions/stakeV2Actions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import StakingV2Admin from 'ts/components/Pages/StakingV2Admin';

function mapStateToProps(state: IState) {
	return {
		account: state.web3.account,
		duoBalance: state.stakeV2.duo,
		addresses: state.stakeV2.addresses,
		contractStates: state.stakeV2.states,
		contractDUO: state.stakeV2.contractDUO,
		gasPrice: state.web3.gasPrice,
		stagingAdd: state.stakeV2.stagingAdd
	};
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		subscribe: () => dispatch(stakeV2Actions.subscribe()),
		refresh: () => dispatch(stakeV2Actions.refresh()),
		getStagingAdd: (start: number, end: number) => dispatch(stakeV2Actions.getStagingAdd(start, end))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StakingV2Admin);
