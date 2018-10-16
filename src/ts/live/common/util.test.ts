import status from '../../../../../duo-admin/src/samples/dynamo/status.json';
import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
import util from './util';

test('calculateNav', () => {
	expect(util.calculateNav(120, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(40, 10, 100, 0, 1, 1, 5, 0.000001)).toMatchSnapshot();

	expect(util.calculateNav(120, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(40, 10, 100, 0, 2, 1, 5, 0.000001)).toMatchSnapshot();

	expect(util.calculateNav(120, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(80, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
	expect(util.calculateNav(20, 10, 100, 0, 0.5, 1, 5, 0.000001)).toMatchSnapshot();
});

const convertedStatus = dynamoUtil.parseStatus(status);
test('getLastPriceFromStatus', () =>
	expect(util.getLastPriceFromStatus(convertedStatus)).toMatchSnapshot());
