import conversion from '../samples/conversion.json';
import hourly from '../samples/hourly.json';
import minutely from '../samples/minutely.json';
import prices from '../samples/prices.json';
import status from '../samples/status.json';
import totalSupply from '../samples/totalSupply.json';
import uiCreate from '../samples/uiCreate.json';
import uiRedeem from '../samples/uiRedeem.json';
import dynamoUtil from './dynamoUtil';
import util from './util';

test('scanStatus', async () => {
	dynamoUtil.scanData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.scanStatus();
	expect((dynamoUtil.scanData as jest.Mock<Promise<void>>).mock.calls.length).toBe(1);
	expect((dynamoUtil.scanData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
});

const convertedStatus = dynamoUtil.parseStatus(status);
test('parseStatus', () => expect(convertedStatus).toMatchSnapshot());

test('getLastPriceFromStatus', () =>
	expect(dynamoUtil.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('queryHourlyOHLC', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryHourlyOHLC('src', ['date1', 'date2']);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(2);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('parseHourly', () => expect(dynamoUtil.parseHourly(hourly)).toMatchSnapshot());

test('queryMinutelyOHLC', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryMinutelyOHLC('src', ['date1', 'date2']);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(2);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('parseMinutely', () => expect(dynamoUtil.parseMinutely(minutely)).toMatchSnapshot());

test('queryAcceptPriceEvent', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryAcceptPriceEvent(['date1', 'date2']);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(2);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('parseAcceptedPrices', () => expect(dynamoUtil.parseAcceptedPrice(prices)).toMatchSnapshot());

test('queryConversionEvent', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryConversionEvent('0x0', ['date1', 'date2']);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(4);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[2][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[3][0]).toMatchSnapshot();
});

test('parseConversion', () => expect(dynamoUtil.parseConversion(conversion)).toMatchSnapshot());

test('queryTotalSupplyEvent', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryTotalSupplyEvent(['date1', 'date2']);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(2);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('parseTotalSupply', () => expect(dynamoUtil.parseTotalSupply(totalSupply)).toMatchSnapshot());

test('queryUIConversionEvent', async () => {
	dynamoUtil.queryData = jest.fn(() => Promise.resolve({}));
	await dynamoUtil.queryUIConversionEvent('0x0');
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls.length).toBe(2);
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.queryData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('parseUIConversion', () => {
	expect(dynamoUtil.parseUIConversion(uiCreate)).toMatchSnapshot();
	expect(dynamoUtil.parseUIConversion(uiRedeem)).toMatchSnapshot();
})

test('insertUIConversion', async () => {
	dynamoUtil.insertData = jest.fn(() => Promise.resolve());
	util.getNowTimestamp = jest.fn(() => 1234567890);
	await dynamoUtil.insertUIConversion('0x0', '0x123', true, 123, 456);
	await dynamoUtil.insertUIConversion('0x0', '0x123', false, 123, 456);
	expect((dynamoUtil.insertData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.insertData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});

test('deleteUIConversionEvent', async () => {
	dynamoUtil.deleteData = jest.fn(() => Promise.resolve());
	await dynamoUtil.deleteUIConversionEvent('0x0', {
		type: 'type',
		transactionHash: 'txHash',
		eth: 0,
		tokenA: 0,
		tokenB: 0,
		timestamp: 0,
		blockNumber: 0
	});
	expect((dynamoUtil.deleteData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
});
