import Web3 from 'web3';
import { Contract } from 'web3/types';
import abi from '../../../static/Custodian.json';
import * as CST from './constants';
//import util from './util';
//const Tx = require('ethereumjs-tx');
//const abiDecoder = require('abi-decoder');

class ContractUtil {
	public web3: Web3;
	public abi: any;
	public contract: Contract;
	public isReadOnly: boolean;

	constructor() {
		if (typeof (window as any).web3 !== 'undefined') {
			this.isReadOnly = false;
			// Use Mist/MetaMask's provider.
			this.web3 = new Web3((window as any).web3.currentProvider);
		} else {
			this.web3 = new Web3(
				new Web3.providers.HttpProvider(
					__DEV__ ? CST.PROVIDER_INFURA_LIVE : CST.PROVIDER_INFURA_DEV
				)
			);
			this.isReadOnly = true;
		}
		console.log(this.web3.currentProvider);
		this.abi = abi;
		this.contract = new this.web3.eth.Contract(this.abi.abi, CST.CUSTODIAN_ADDR);
	}

	public async read(name: string) {
		return await this.contract.methods[name]().call();
	}

	public async getGasPrice(): Promise<number> {
		return await this.web3.eth.getGasPrice();
	}
}

const contractUtil = new ContractUtil();
export default contractUtil;
