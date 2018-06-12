import moment from 'moment';
import chartUtil from './chartUtil';
import dynamoUtil from './dynamoUtil';
const hourly = require('../samples/hourly.json');
const minutely = require('../samples/minutely.json');
const prices = require('../samples/prices.json');

const hourlyBar1 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar2 = {
	source: 'source',
	date: '2018-06-06',
	hour: '01',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 01:0', 'YYYY-MM-DD HH:m').valueOf()
};

const hourlyBar3 = {
	source: 'source',
	date: '2018-06-06',
	hour: '03',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 03:0', 'YYYY-MM-DD HH:m').valueOf()
};

test('does not interpolate unnecessarily', () => {
	const result = chartUtil.interpolate([hourlyBar1, hourlyBar2], true);
	expect(result.length).toBe(2);
	expect(result[0]).toBe(hourlyBar1);
	expect(result[1]).toEqual(hourlyBar2);
});

test('interpolate correctly', () => {
	const result = chartUtil.interpolate([hourlyBar1, hourlyBar3], true);
	expect(result.length).toBe(4);
	expect(result[0]).toBe(hourlyBar1);
	expect(result[3]).toEqual(hourlyBar3);
	expect(result[1]).toMatchSnapshot();
	expect(result[2]).toMatchSnapshot();
});

const minutelyBar1 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 0,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:0', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar2 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 1,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:1', 'YYYY-MM-DD HH:m').valueOf()
};

const minutelyBar3 = {
	source: 'source',
	date: '2018-06-06',
	hour: '00',
	minute: 3,
	open: 1,
	high: 3,
	low: 0,
	close: 2,
	volume: 123,
	timestamp: moment('2018-06-06 00:3', 'YYYY-MM-DD HH:m').valueOf()
};

test('does not interpolate unnecessarily', () => {
	const result = chartUtil.interpolate([minutelyBar1, minutelyBar2], false);
	expect(result.length).toBe(2);
	expect(result[0]).toBe(minutelyBar1);
	expect(result[1]).toEqual(minutelyBar2);
});

test('interpolate correctly', () => {
	const result = chartUtil.interpolate([minutelyBar1, minutelyBar3], false);
	expect(result.length).toBe(4);
	expect(result[0]).toBe(minutelyBar1);
	expect(result[3]).toEqual(minutelyBar3);
	expect(result[1]).toMatchSnapshot();
	expect(result[2]).toMatchSnapshot();
});

const acceptedPrice1 = {
	price: 123,
	navA: 1,
	navB: 1,
	timestamp: 1000
};

const acceptedPrice2 = {
	price: 123,
	navA: 1,
	navB: 2,
	timestamp: 2000
};

const acceptedPrice3 = {
	price: 123,
	navA: 1,
	navB: 0.25,
	timestamp: 3000
};

const acceptedPrice4 = {
	price: 123,
	navA: 1.1,
	navB: 1,
	timestamp: 4000
};

const reset = chartUtil.reset(
	[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4],
	2,
	0.25,
	1.05
);

test('find reset points correctly', () => expect(reset).toMatchSnapshot());

test('merge reset correctly', () =>
	expect(
		chartUtil.mergeReset(
			[acceptedPrice1, acceptedPrice2, acceptedPrice3, acceptedPrice4],
			reset
		)
	).toMatchSnapshot());

test('merge last price to hourly correctly', () => {
	const parsedHourly = dynamoUtil.convertHourly(hourly);
	const sourceHourly = {
		bitfinex: parsedHourly,
		gemini: [],
		kraken: [],
		gdax: []
	};
	chartUtil.mergeLastToPriceBar(
		sourceHourly,
		{
			bitfinex: {
				address: '0x0',
				price: 600,
				timestamp: 1528072200000
			},
			gemini: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			kraken: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gdax: {
				address: '0x0',
				price: 0,
				timestamp: 0
			}
		},
		true
	);
	expect(sourceHourly.bitfinex).toMatchSnapshot();
	chartUtil.mergeLastToPriceBar(
		sourceHourly,
		{
			bitfinex: {
				address: '0x0',
				price: 620,
				timestamp: 1528074000000
			},
			gemini: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			kraken: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gdax: {
				address: '0x0',
				price: 0,
				timestamp: 0
			}
		},
		true
	);
	expect(sourceHourly.bitfinex).toMatchSnapshot();
});

test('merge last price to minutely correctly', () => {
	const parsedMinutely = dynamoUtil.convertMinutely(minutely);
	const sourceMinutely = {
		bitfinex: [],
		gemini: [],
		kraken: [],
		gdax: parsedMinutely
	};
	chartUtil.mergeLastToPriceBar(
		sourceMinutely,
		{
			bitfinex: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gemini: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			kraken: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gdax: {
				address: '0x0',
				price: 600,
				timestamp: 1527839610000
			}
		},
		false
	);
	expect(sourceMinutely.gdax).toMatchSnapshot();
	chartUtil.mergeLastToPriceBar(
		sourceMinutely,
		{
			bitfinex: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gemini: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			kraken: {
				address: '0x0',
				price: 0,
				timestamp: 0
			},
			gdax: {
				address: '0x0',
				price: 620,
				timestamp: 1527839640000
			}
		},
		false
	);
	expect(sourceMinutely.gdax).toMatchSnapshot();
});

test('merge last price to accepted price correctly', () => {
	const parsedAcceptedPrice = dynamoUtil.convertAcceptedPrices(prices);
	const originalLength = parsedAcceptedPrice.length;
	chartUtil.mergeLastToPrice(parsedAcceptedPrice, { navA: 1.23, navB: 1.45 } as any, {
		address: '0x0',
		price: 620,
		timestamp: 1528349100000
	});
	expect(parsedAcceptedPrice.length).toBe(originalLength);
	chartUtil.mergeLastToPrice(parsedAcceptedPrice, { navA: 1.23, navB: 1.45 } as any, {
		address: '0x0',
		price: 620,
		timestamp: 1528349820000
	});
	expect(parsedAcceptedPrice.length).toBe(originalLength + 1);
	expect(parsedAcceptedPrice[originalLength]).toMatchSnapshot();
});
