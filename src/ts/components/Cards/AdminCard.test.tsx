// fix for @ledgerhq/hw-transport-u2f 4.28.0
import '@babel/polyfill';
import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { shallow } from 'enzyme';
import * as React from 'react';
import AdminCard from './AdminCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const addresses = {
			feeCollector: '0x0017d61f0B0a28E2F0eBB3B6E269738a6252CFeD',
			oracle: '0x00D8d0660b243452fC2f996A892D3083A903576F',
			aToken: '0x00184D7745ef135490114EEFfB762C2A60E067d3',
			bToken: '0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
			operator: '0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
			roleManager: '0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a'
		};

		const account = '0x0';
		// const account1 = '0x01';

		const states = {
			resetState: 'test',
			alpha: 1,
			beta: 1,
			periodCoupon: 0.000017,
			limitPeriodic: 1.035,
			limitLower: 0.25,
			limitUpper: 2,
			iterationGasThreshold: 65000,
			state: 'Trading',
			minBalance: 1,
			totalSupplyA: 82880.4753362674,
			totalSupplyB: 82880.4753362674,
			collateral: 1,
			navA: 1.026299,
			navB: 0.5862017153842389,
			lastPrice: 12,
			lastPriceTime: 12,
			resetPrice: 12,
			resetPriceTime: 12,
			createCommRate: 0.01,
			redeemCommRate: 0.01,
			period: 3600,
			maturity: 12,
			preResetWaitingBlocks: 10,
			priceFetchCoolDown: 123,
			nextResetAddrIndex: 0,
			totalUsers: 123,
			feeBalance: 123,
			lastOperationTime: 123,
			operationCoolDown: 123
		};

		it('Test Snapshot', () => {
			const wrapper1 = shallow(
				<AdminCard
					type={WrapperConstants.BEETHOVEN}
					tenor={WrapperConstants.TENOR_PPT}
					addresses={addresses}
					states={states}
					account={account}
				/>
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(
				<AdminCard
					type={WrapperConstants.BEETHOVEN}
					tenor={WrapperConstants.TENOR_PPT}
					addresses={addresses}
					states={states}
					account={'0x01'}
				/>
			);
			expect(wrapper2).toMatchSnapshot();
		});
		// test('dummy', () => expect(true).toBeTruthy());
	});
});
