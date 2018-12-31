// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
// import infura from 'ts/keys/infura.json';
import DualClassWrapper from '../../../../duo-contract-wrapper/src/DualClassWrapper';
import EsplanadeWrapper from '../../../../duo-contract-wrapper/src/EsplanadeWrapper';
import MagiWrapper from '../../../../duo-contract-wrapper/src/MagiWrapper';
import Web3Wrapper from '../../../../duo-contract-wrapper/src/Web3Wrapper';
import * as CST from './constants';
import { ICustodianWrappers } from './types';

let infura = {
	token: ''
};

try {
	infura = require('ts/keys/infura.json');
} catch (e) {
	console.log(e);
}

const provider =
	(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) + '/' + infura.token;
export const web3Wrapper = new Web3Wrapper(window, '', provider, !__KOVAN__);
export const dualClassWrappers: ICustodianWrappers = {};
for (const type in web3Wrapper.contractAddresses.Custodians) {
	dualClassWrappers[type] = {};
	for (const tenor in web3Wrapper.contractAddresses.Custodians[type])
		dualClassWrappers[type][tenor] = new DualClassWrapper(
			web3Wrapper,
			web3Wrapper.contractAddresses.Custodians[type][tenor].custodian.address
		);
}

export const getDualClassWrapperByTypeTenor = (type: string, tenor: string) => {
	if (dualClassWrappers[type] && dualClassWrappers[type][tenor])
		return dualClassWrappers[type][tenor];
	return dualClassWrappers[CST.BEETHOVEN][CST.TENOR_PPT];
};

export const getDualClassAddressByTypeTenor = (type: string, tenor: string) => {
	if (web3Wrapper.contractAddresses.Custodians[type][tenor])
		return web3Wrapper.contractAddresses.Custodians[type][tenor];
	return web3Wrapper.contractAddresses.Custodians[CST.BEETHOVEN][CST.TENOR_PPT];
};

export const magiWrapper = new MagiWrapper(
	web3Wrapper,
	web3Wrapper.contractAddresses.Oracles[0].address
);

export const esplanadeWrapper = new EsplanadeWrapper(
	web3Wrapper,
	web3Wrapper.contractAddresses.MultiSigManagers[0].address
);

export const calculateNav = DualClassWrapper.calculateNav;

export const getTokenInterestOrLeverage = DualClassWrapper.getTokenInterestOrLeverage;
