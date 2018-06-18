import conversion from '../samples/conversion.json';
import hourly from '../samples/hourly.json';
import minutely from '../samples/minutely.json';
import prices from '../samples/prices.json';
import status from '../samples/status.json';
import totalSupply from '../samples/totalSupply.json';
import dynamoUtil from './dynamoUtil';
import util from './util';

const convertedStatus = dynamoUtil.parseStatus(status);
test('parseStatus', () => expect(convertedStatus).toMatchSnapshot());

test('getLastPriceFromStatus', () =>
	expect(dynamoUtil.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('parseHourly', () => expect(dynamoUtil.parseHourly(hourly)).toMatchSnapshot());

test('parseMinutely', () => expect(dynamoUtil.parseMinutely(minutely)).toMatchSnapshot());

test('parseAcceptedPrices', () => expect(dynamoUtil.parseAcceptedPrice(prices)).toMatchSnapshot());

test('parseConversion', () => expect(dynamoUtil.parseConversion(conversion)).toMatchSnapshot());

test('parseTotalSupply', () => expect(dynamoUtil.parseTotalSupply(totalSupply)).toMatchSnapshot());

test('parseUIConversionToDynamo', async () => {
	dynamoUtil.insertData = jest.fn(() => Promise.resolve());
	util.getNowTimestamp = jest.fn(() => 1234567890);
	await dynamoUtil.insertUIConversion('0x0', '0x123', true, 123, 456);
	await dynamoUtil.insertUIConversion('0x0', '0x123', false, 123, 456);
	expect((dynamoUtil.insertData as jest.Mock<Promise<void>>).mock.calls[0][0]).toMatchSnapshot();
	expect((dynamoUtil.insertData as jest.Mock<Promise<void>>).mock.calls[1][0]).toMatchSnapshot();
});
