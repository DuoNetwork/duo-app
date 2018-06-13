import dynamoUtil from './dynamoUtil';
const status = require('../samples/status.json');
const hourly = require('../samples/hourly.json');
const minutely = require('../samples/minutely.json')
const prices = require('../samples/prices.json');

const convertedStatus = dynamoUtil.parseStatus(status);
test('parseStatus', () => expect(convertedStatus).toMatchSnapshot());

test('getLastPriceFromStatus', () => expect(dynamoUtil.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('parseHourly', () => expect(dynamoUtil.parseHourly(hourly)).toMatchSnapshot());

test('parseMinutely', () => expect(dynamoUtil.parseMinutely(minutely)).toMatchSnapshot());

test('parseAcceptedPrices', () => expect(dynamoUtil.parseAcceptedPrice(prices)).toMatchSnapshot());
