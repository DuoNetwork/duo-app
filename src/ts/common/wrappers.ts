import infura from 'ts/keys/infura.json';
import BeethovenWapper from '../../../../duo-contract-wrapper/src/BeethovenWapper';
import MagiWrapper from '../../../../duo-contract-wrapper/src/MagiWrapper';
import Web3Wrapper from '../../../../duo-contract-wrapper/src/Web3Wrapper';
import * as CST from './constants';

const provider =
	(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) + '/' + infura.token;
export const web3Wrapper = new Web3Wrapper(window, '', provider, !__KOVAN__);
export const beethovenWappers: { [tenor: string]: BeethovenWapper } = {};
for (const tenor in web3Wrapper.contractAddresses.Custodians.Beethoven)
	beethovenWappers[tenor] = new BeethovenWapper(
		web3Wrapper,
		web3Wrapper.contractAddresses.Custodians.Beethoven[tenor].custodian.address
	);

export const getBeethovenWrapperByTenor = (tenor: string) => {
	return beethovenWappers[tenor] || beethovenWappers[CST.TENOR_PPT];
};

export const getBeethovenAddressByTenor = (tenor: string) => {
	if (beethovenWappers[tenor]) return web3Wrapper.contractAddresses.Custodians.Beethoven[tenor];

	return web3Wrapper.contractAddresses.Custodians.Beethoven[CST.TENOR_PPT];
};

export const magiWrapper = new MagiWrapper(
	web3Wrapper,
	web3Wrapper.contractAddresses.Oracles[0].address
);
