import BeethovenWapper from '../../../../../duo-contract-wrapper/src/BeethovenWapper';
import Web3Wrapper from '../../../../../duo-contract-wrapper/src/Web3Wrapper';
import infura from '../../keys/infura.json';
import * as CST from './constants';

const provider =
	(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) + '/' + infura.token;
export const web3Wrapper = new Web3Wrapper(window, '', provider, !__KOVAN__);
export const beethovenWapper = new BeethovenWapper(web3Wrapper);
