import moment from 'moment';
// import hourly from '../samples/hourly.json';
// import minutely from '../samples/minutely.json';
// import prices from '../samples/prices.json';
import chartUtil from './chartUtil';
// import util from './util';

const hourlyBar1 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 60,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar2 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 60,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 01:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar3 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 60,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 03:0', 'YYYY-MM-DD HH:m').valueOf()
};

test('mergePrices', () => {
	expect(chartUtil.mergePrices([hourlyBar1, hourlyBar2, hourlyBar3], 180)).toMatchSnapshot();
});

const minutelyBar1 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 1,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar2 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 1,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 00:1', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar3 = {
	source: 'source',
	base: 'base',
	quote: 'quote',
	period: 1,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment.utc('2018-06-06 00:3', 'YYYY-MM-DD HH:m').valueOf()
};

test('minutely merged correctly to 5 minute bar', () => {
	expect(chartUtil.mergePrices([minutelyBar1, minutelyBar2, minutelyBar3], 5)).toMatchSnapshot();
});

const acceptedPrice1 = {
	contractAddress: '0x0',
	price: 123,
	navA: 1,
	navB: 1,
	timestamp: 1000,
	blockNumber: 111,
	transactionHash: 'aaa'
};

const acceptedPrice2 = {
	contractAddress: '0x0',
	price: 123,
	navA: 1,
	navB: 2,
	timestamp: 2000,
	blockNumber: 222,
	transactionHash: 'bbb'
};

const acceptedPrice3 = {
	contractAddress: '0x0',
	price: 123,
	navA: 1,
	navB: 0.25,
	timestamp: 3000,
	blockNumber: 333,
	transactionHash: 'ccc'
};

const acceptedPrice4 = {
	contractAddress: '0x0',
	price: 123,
	navA: 1.1,
	navB: 1,
	timestamp: 4000,
	blockNumber: 444,
	transactionHash: 'ddd'
};

const acceptedPriceNow = {
	contractAddress: '0x0',
	price: 123,
	navA: 1.1,
	navB: 1,
	timestamp: (Number(moment.now.valueOf()) / 1000),
	blockNumber: 444,
	transactionHash: 'ddd'
};

const reset = chartUtil.reset(
	[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4],
	2,
	0.25,
	1.05
);

const beethovenStates = {
	lastOperationTime: 12,
	operationCoolDown: 23,
	alpha: 12,
	beta: 23,
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
	navA: 1.025942,
	navB: 0.595738272490127,
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
	usersLength: 295,
	minBalance: 6,
	ethCollateral: 6,
	lastPrice: 6,
	lastPriceTime: 6,
	resetPrice: 6,
	resetPriceTime: 6,
	priceFetchCoolDown: 6,
	totalUsers: 6,
	feeBalance: 6,
	resetState: 'true',
	maturity: 12,
};

const contractPrice = {
	price: 12,
	timestamp: moment.utc('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

test('find reset points correctly', () => expect(reset).toMatchSnapshot());

test('merge reset correctly', () =>
	expect(
		chartUtil.mergeReset(
			[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4],
			reset
		)
	).toMatchSnapshot());

test('merge Prices correctly', () => {
	expect(chartUtil.mergePricesToPrice([hourlyBar1, hourlyBar2, hourlyBar3], 5)).toMatchSnapshot();
	expect(chartUtil.mergePricesToPrice([], 5)).toMatchSnapshot();
});

test('merge last price correctly', () => {
	const lastDataBefore = { address: '0x0', price: 205.01, timestamp: 1528200000 };
	const lastData = { address: '0x0', price: 205.01, timestamp: 1539755124695 };
	const lastDataNew = { address: '0x0', price: 205.01, timestamp: 1528243212000 };
	const lastDataSameTime = {
		address: '0x0',
		price: 205.1,
		timestamp: moment.utc('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
	};
	expect(chartUtil.mergeLastestToPrices([], lastData)).toMatchSnapshot();
	expect(chartUtil.mergeLastestToPrices([], lastDataBefore)).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToPrices([hourlyBar1, hourlyBar2, hourlyBar3], lastData)
	).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToPrices([hourlyBar1, hourlyBar2, hourlyBar3], lastDataNew)
	).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToPrices([hourlyBar1, hourlyBar2, hourlyBar3], lastDataBefore)
	).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToPrices([hourlyBar1, hourlyBar2, hourlyBar3], lastDataSameTime)
	).toMatchSnapshot();
});

test('mergeLastestToAcceptedPrices', () => {
	expect(
		chartUtil.mergeLastestToAcceptedPrices(
			[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4],
			beethovenStates,
			contractPrice
		)
	).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToAcceptedPrices([], beethovenStates, contractPrice)
	).toMatchSnapshot();
	expect(
		chartUtil.mergeLastestToAcceptedPrices(
			[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4, acceptedPriceNow],
			beethovenStates,
			contractPrice
		)
	).toMatchSnapshot();
});

// test('merge last price to accepted price correctly', () => {
// 	const lastData = { address: '0x0', price: 205.01, timestamp: 1539755124695 };
// 	const lastDataSameTime = { address: '0x0', price: 250.01, timestamp: 4000 };
// 	const states = {
// 		addrPoolLength: 6,
// 		adminCoolDown: 3600,
// 		alpha: 1,
// 		beta: 1,
// 		createCommRate: 0.01,
// 		duoBalance: 2482128.9762267205,
// 		ethBalance: 742.408092589115,
// 		ethDuoFeeRatio: 800,
// 		feeAccumulated: 87.06788278541666,
// 		iterationGasThreshold: 65000,
// 		lastAdminTime: 0,
// 		limitLower: 0.25,
// 		limitPeriodic: 1.035,
// 		limitUpper: 2,
// 		navA: 1.025942,
// 		navB: 0.595738272490127,
// 		nextResetAddrIndex: 0,
// 		numOfPrices: 0,
// 		period: 3600,
// 		periodCoupon: 0.000017,
// 		preResetWaitingBlocks: 10,
// 		priceFeedTimeTol: 60,
// 		priceFeedTol: 0.01,
// 		priceTol: 0.05,
// 		priceUpdateCoolDown: 3000,
// 		redeemCommRate: 0.01,
// 		state: 'Trading',
// 		totalSupplyA: 82880.4753362674,
// 		totalSupplyB: 82880.4753362674,
// 		usersLength: 295
// 	};
// 	expect(
// 		chartUtil.mergeLastestToAcceptedPrices(
// 			[acceptedPrice1, acceptedPrice2, acceptedPrice3],
// 			states,
// 			lastData
// 		)
// 	).toMatchSnapshot();
// 	expect(chartUtil.mergeLastestToAcceptedPrices([], states, lastData)).toMatchSnapshot();
// 	expect(
// 		chartUtil.mergeLastestToAcceptedPrices(
// 			[acceptedPrice1, acceptedPrice2, acceptedPrice3],
// 			states,
// 			lastDataSameTime
// 		)
// 	).toMatchSnapshot();
// });
