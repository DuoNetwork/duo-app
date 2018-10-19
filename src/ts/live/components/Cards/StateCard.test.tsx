import { shallow } from 'enzyme';
import * as React from 'react';
import StateCard from './StateCard';

describe('StateCard Test', () => {
	describe('User Login', () => {
		const reset = {
			address: '0x00476E55e02673B0E4D2B474071014D5a366Ed4E',
			price: 252.93877621546696,
			timestamp: 1534258801000
		};
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
		const mobile = true;
		const locale = 'EN';
		it('Test Snapshot', () => {
			const wrapper = shallow(
				<StateCard reset={reset} states={states} mobile={mobile} locale={locale} />
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
