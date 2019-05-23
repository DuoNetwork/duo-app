import {
	Constants as WrapperConstants,
	DualClassWrapper,
	EsplanadeWrapper,
	ICustodianWrappers,
	MagiWrapper,
	Web3Wrapper
} from '@finbook/duo-contract-wrapper';
import {StakeContractWrapper} from '@finbook/duo-contract-wrapper/dist/StakeContractWrapper';

export const web3Wrapper = new Web3Wrapper(
	window,
	__KOVAN__ ? WrapperConstants.PROVIDER_INFURA_KOVAN : WrapperConstants.PROVIDER_INFURA_MAIN,
	'',
	!__KOVAN__
);
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
	return dualClassWrappers[WrapperConstants.BEETHOVEN][WrapperConstants.TENOR_PPT];
};

export const getDualClassAddressByTypeTenor = (type: string, tenor: string) => {
	if (web3Wrapper.contractAddresses.Custodians[type][tenor])
		return web3Wrapper.contractAddresses.Custodians[type][tenor];
	return web3Wrapper.contractAddresses.Custodians[WrapperConstants.BEETHOVEN][
		WrapperConstants.TENOR_PPT
	];
};

export const magiWrapper = new MagiWrapper(
	web3Wrapper,
	web3Wrapper.contractAddresses.Oracles[0].address
);

export const esplanadeWrapper = new EsplanadeWrapper(
	web3Wrapper,
	web3Wrapper.contractAddresses.MultiSigManagers[0].address
);

export const stakeWrapper = new StakeContractWrapper(web3Wrapper, web3Wrapper.contractAddresses.Stake);

export const calculateNav = DualClassWrapper.calculateNav;

export const getTokenInterestOrLeverage = DualClassWrapper.getTokenInterestOrLeverage;
