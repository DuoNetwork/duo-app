import AWS from 'aws-sdk';
import devConfig from '../..//keys/aws.ui.dev.json';
import liveConfig from '../../keys/aws.ui.live.json';
import * as CST from './constants';

export class DynamoUtil {
	private ddb: AWS.DynamoDB;
	constructor() {
		// this.role = role;
		AWS.config.update(__DEV__ ? devConfig : liveConfig);
		this.ddb = new AWS.DynamoDB({ apiVersion: CST.AWS_DYNAMO_API_VERSION });
	}

	public scanStatus() {
		const params = {
			TableName: __DEV__ ? CST.DB_AWS_STATUS_DEV : CST.DB_AWS_STATUS_LIVE
		};

		return new Promise((resolve, reject) => {
			this.ddb.scan(params, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	}
}

const dynamoUtil = new DynamoUtil();
export default dynamoUtil;
