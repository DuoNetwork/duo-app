import conversion from '../samples/conversion.json';
import hourly from '../samples/hourly.json';
import minutely from '../samples/minutely.json'
import prices from '../samples/prices.json';
import status from '../samples/status.json';
import totalSupply from '../samples/totalSupply.json';
import dynamoUtil from './dynamoUtil';

const convertedStatus = dynamoUtil.parseStatus(status);
test('parseStatus', () => expect(convertedStatus).toMatchSnapshot());

test('getLastPriceFromStatus', () => expect(dynamoUtil.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('parseHourly', () => expect(dynamoUtil.parseHourly(hourly)).toMatchSnapshot());

test('parseMinutely', () => expect(dynamoUtil.parseMinutely(minutely)).toMatchSnapshot());

test('parseAcceptedPrices', () => expect(dynamoUtil.parseAcceptedPrice(prices)).toMatchSnapshot());

test('parseConversion', () => expect(dynamoUtil.parseConversion(conversion)).toMatchSnapshot());

test('parseTotalSupply', () => expect(dynamoUtil.parseTotalSupply(totalSupply)).toMatchSnapshot());
