import dynamoUtil from './dynamoUtil';
const status = require('../samples/status.json');

test('convertStatus', () => expect(dynamoUtil.convertStatus(status)).toMatchSnapshot());
