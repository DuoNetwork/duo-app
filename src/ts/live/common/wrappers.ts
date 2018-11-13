import infura from '../../../../../duo-admin/src/keys/infura.json';
import BeethovanWapper from '../../../../../duo-contract-wrapper/src/BeethovanWapper';
import Web3Wrapper from '../../../../../duo-contract-wrapper/src/Web3Wrapper';
import * as CST from './constants';

const provider =
	(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) + '/' + infura.token;
export const web3Wrapper = new Web3Wrapper(window, '', provider, !__KOVAN__);
export const beethovanWapper = new BeethovanWapper(web3Wrapper, !__KOVAN__);
