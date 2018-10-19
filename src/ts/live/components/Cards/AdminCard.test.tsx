import { shallow } from 'enzyme';
import * as React from 'react';
import AdminCard from './AdminCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const addresses = {
			feeCollector: {
				address: '0x0017d61f0B0a28E2F0eBB3B6E269738a6252CFeD',
				balance: 1.018807107
			},
			operator: {
				address: '0x00D8d0660b243452fC2f996A892D3083A903576F',
				balance: 633.4949078983998
			},
			poolManager: { address: '0x00184D7745ef135490114EEFfB762C2A60E067d3', balance: 0.5 },
			priceFeed1: {
				address: '0x0022BFd6AFaD3408A1714fa8F9371ad5Ce8A0F1a',
				balance: 6.273545199123697
			},
			priceFeed2: {
				address: '0x002002812b42601Ae5026344F0395E68527bb0F8',
				balance: 7.798265271106233
			},
			priceFeed3: {
				address: '0x00476E55e02673B0E4D2B474071014D5a366Ed4E',
				balance: 7.837778352174341
			}
		};

		const account = '0x0';

		const states = {
			addrPoolLength: 6,
			adminCoolDown: 3600,
			alpha: 1,
			beta: 1,
			createCommRate: 0.01,
			duoBalance: 2482128.9762267205,
			ethBalance: 742.408092589115,
			ethDuoFeeRatio: 800,
			feeAccumulated: 87.06788278541666,
			iterationGasThreshold: 65000,
			lastAdminTime: 0,
			limitLower: 0.25,
			limitPeriodic: 1.035,
			limitUpper: 2,
			navA: 1.026299,
			navB: 0.5862017153842389,
			nextResetAddrIndex: 0,
			numOfPrices: 0,
			period: 3600,
			periodCoupon: 0.000017,
			preResetWaitingBlocks: 10,
			priceFeedTimeTol: 60,
			priceFeedTol: 0.01,
			priceTol: 0.05,
			priceUpdateCoolDown: 3000,
			redeemCommRate: 0.01,
			state: 'Trading',
			totalSupplyA: 82880.4753362674,
			totalSupplyB: 82880.4753362674,
			usersLength: 295
		};

		it('Test Snapshot', () => {
			const wrapper1 = shallow(
				<AdminCard addresses={addresses} states={states} account={account} />
			);
			expect(wrapper1).toMatchSnapshot();
			const wrapper2 = shallow(<AdminCard addresses={addresses} states={states} account={'0x01'} />);
			expect(wrapper2).toMatchSnapshot();
		});
	});
});
