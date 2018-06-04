import dynamoUtil from './dynamoUtil';
const status = require('../samples/status.json');
const hourly = require('../samples/hourly.json');
const minutely = require('../samples/minutely.json')

test('convertStatus', () => expect(dynamoUtil.convertStatus(status)).toMatchSnapshot());

test('convertHourly', () => expect(dynamoUtil.convertHourly(hourly)).toMatchSnapshot());

test('convertMinutely', () => expect(dynamoUtil.convertMinutely(minutely)).toMatchSnapshot());
