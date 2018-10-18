import { shallow } from 'enzyme';
import * as React from 'react';
import PriceCard from './PriceCard';

describe('AuthCard Test', () => {
	describe('User Login', () => {
		const last = {
			address: '0x00476E55e02673B0E4D2B474071014D5a366Ed4E',
			price: 203.59500509278894,
			timestamp: 1539846000000
		};
		const locale = 'EN';
		const reset = {
			address: '0x00476E55e02673B0E4D2B474071014D5a366Ed4E',
			price: 252.93877621546696,
			timestamp: 1534258801000
		};
		const sourceLast = {
			gdax: { address: '0x0', price: 203.59, timestamp: 1539844701135 },
			gemini: { address: '0x0', price: 203.51, timestamp: 1539844427990 },
			kraken: { address: '0x0', price: 203.76, timestamp: 1539844698485 }
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
			navA: 1.026367,
			navB: 0.5834692468501522,
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
			const wrapper = shallow(
				<PriceCard
					last={last}
					locale={locale}
					reset={reset}
					sourceLast={sourceLast}
					states={states}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
