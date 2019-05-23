// import { contractAddresses} from '@finbook/duo-contract-wrapper';
import { connect } from 'react-redux';
//import { AnyAction } from 'redux';
//import { ThunkDispatch } from 'redux-thunk';
// import * as dualClassActions from 'ts/actions/dualClassActions';
// import * as web3Actions from 'ts/actions/web3Actions';
import { IState } from 'ts/common/types';
//import { web3Wrapper } from 'ts/common/wrappers';
//import util from 'ts/common/util';
import Staking from 'ts/components/Pages/Staking';

function mapStateToProps(state: IState) {
	return {
		account: state.web3.account,
	};
}

// function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
// 	return {
// 		getDUOBalance: (address: string) =>
// 			dispatch(web3Wrapper.getErc20Balance('0x61ca89cfc5e8099702e64e97d9b5fc457cf1d355', address))
// 	};
// }

export default connect(
	mapStateToProps,
	//mapDispatchToProps
)(Staking);
