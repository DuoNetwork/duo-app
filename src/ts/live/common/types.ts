export interface ICustodianPrice {
	address: string;
	price: number;
	timestamp: number;
}

export interface ICustodianStates {
	state: string;
	navA: number;
	navB: number;
	totalSupplyA: number;
	totalSupplyB: number;
	alpha: number;
	beta: number;
	// feeAccumulated: number;
	periodCoupon: number;
	limitPeriodic: number;
	limitUpper: number;
	limitLower: number;
	commissionRate: number;
	period: number;
	// iterationGasThreshold: number;
	ethDuoFeeRatio: number;
	preResetWaitingBlocks: number;
	// priceTol: number;
	// priceFeedTol: number;
	// priceFeedTimeTol: number;
	// priceUpdateCoolDown: number;
	// numOfPrices: number;
	nextResetAddrIndex: number;
	// lastAdminTime: number;
	// adminCoolDown: number;
	usersLength: number;
	// addrPoolLength: number;
}

export interface IBalances {
	eth: number,
	duo: number,
	allowance: number,
	tokenA: number,
	tokenB: number
}
