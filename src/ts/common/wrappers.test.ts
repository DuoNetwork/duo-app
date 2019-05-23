import * as Constants from '@finbook/duo-contract-wrapper/dist/constants';
import { kovan } from '@finbook/duo-contract-wrapper/dist/contractAddresses';
jest.mock('@finbook/duo-contract-wrapper', () => ({
	Constants: Constants,
	Web3Wrapper: jest.fn(() => ({ contractAddresses: kovan })),
	DualClassWrapper: jest.fn(() => ({
		contract: 'dualClassWrapper'
	})),
	EsplanadeWrapper: jest.fn(() => ({
		contract: 'EsplanadeWrapper'
	})),
	MagiWrapper: jest.fn(() => ({
		contract: 'MagiWrapper'
	}))
}));

jest.mock('@finbook/duo-contract-wrapper/dist/StakeContractWrapper', () => ({
	StakeContractWrapper: jest.fn(() => ({
		contract: 'StakeContractWrapper'
	}))
}));

import {
	DualClassWrapper,
	EsplanadeWrapper,
	MagiWrapper,
	Web3Wrapper
} from '@finbook/duo-contract-wrapper';
import { StakeContractWrapper } from '@finbook/duo-contract-wrapper/dist/StakeContractWrapper';

import {
	dualClassWrappers,
	esplanadeWrapper,
	magiWrapper,
	stakeWrapper,
	web3Wrapper
} from './wrappers';

test('Web3Wrapper', () => {
	expect(web3Wrapper).toBeTruthy();
	expect((Web3Wrapper as any).mock.calls).toMatchSnapshot();
});

test('DualClassWrapper', () => {
	expect(dualClassWrappers).toMatchSnapshot();
	expect((DualClassWrapper as any).mock.calls).toMatchSnapshot();
});

test('EsplanadeWrapper', () => {
	expect(esplanadeWrapper).toMatchSnapshot();
	expect((EsplanadeWrapper as any).mock.calls).toMatchSnapshot();
});

test('MagiWrapper', () => {
	expect(magiWrapper).toMatchSnapshot();
	expect((MagiWrapper as any).mock.calls).toMatchSnapshot();
});

test('StakeContractWrapper', () => {
	expect(stakeWrapper).toMatchSnapshot();
	expect((StakeContractWrapper as any).mock.calls).toMatchSnapshot();
});
