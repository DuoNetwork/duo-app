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
	})),
	StakeWrapper: jest.fn(() => ({
		contract: 'StakeWrapper'
	})),
	StakeV2Wrapper: jest.fn(() => ({
		contract: 'StakeV2Wrapper'
	}))
}));

import {
	DualClassWrapper,
	EsplanadeWrapper,
	MagiWrapper,
	StakeV2Wrapper,
	StakeWrapper,
	Web3Wrapper
} from '@finbook/duo-contract-wrapper';
import {
	dualClassWrappers,
	esplanadeWrapper,
	magiWrapper,
	stakeV2Wrapper,
	stakeWrappers,
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

test('StakeWrapper', () => {
	expect(stakeWrappers[0]).toMatchSnapshot();
	expect((StakeWrapper as any).mock.calls).toMatchSnapshot();
});

test('StakeV2Wrapper', () => {
	expect(stakeV2Wrapper).toMatchSnapshot();
	expect((StakeV2Wrapper as any).mock.calls).toMatchSnapshot();
});
