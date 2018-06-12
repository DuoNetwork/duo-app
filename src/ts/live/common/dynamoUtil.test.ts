import dynamoUtil from './dynamoUtil';
const status = require('../samples/status.json');
const hourly = require('../samples/hourly.json');
const minutely = require('../samples/minutely.json')
const prices = require('../samples/prices.json');

const convertedStatus = dynamoUtil.convertStatus(status);
test('convertStatus', () => expect(convertedStatus).toMatchSnapshot());

test('getLastPriceFromStatus', () => expect(dynamoUtil.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());

test('convertHourly', () => expect(dynamoUtil.convertHourly(hourly)).toMatchSnapshot());

test('convertMinutely', () => expect(dynamoUtil.convertMinutely(minutely)).toMatchSnapshot());

test('convertAcceptedPrices', () => expect(dynamoUtil.convertAcceptedPrices(prices)).toMatchSnapshot());
