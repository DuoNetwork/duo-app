import { DynamoUtil } from '@finbook/duo-market-data';

let config = {};
try {
	config = require(`../keys/aws.ui.${__KOVAN__ ? 'dev' : 'live'}.json`);
} catch (error) {
	console.log(error);
}

const dynamoUtil = new DynamoUtil(config, !__KOVAN__, '');

export default dynamoUtil;
