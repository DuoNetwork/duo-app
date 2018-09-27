import infura from '../../../../../duo-admin/src/keys/infura.json';
import ContractUtil from '../../../../../duo-contract-util/src/contractUtil';
import * as CST from './constants';

const provider =
	(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) + '/' + infura.token;
const contract = new ContractUtil(window, '', provider, !__KOVAN__);
export default contract;
