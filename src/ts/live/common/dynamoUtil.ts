import AWS from 'aws-sdk';
import { ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import devConfig from '../../keys/aws.ui.dev.json';
import liveConfig from '../../keys/aws.ui.live.json';
import { IPriceStatus, IStatus } from '../common/types';
import * as CST from './constants';

export class DynamoUtil {
	private ddb: AWS.DynamoDB;
	constructor() {
		// this.role = role;
		AWS.config.update(__DEV__ ? devConfig : liveConfig);
		this.ddb = new AWS.DynamoDB({ apiVersion: CST.AWS_DYNAMO_API_VERSION });
	}

	public scanData(params: ScanInput): Promise<ScanOutput> {
		return new Promise((resolve, reject) => {
			this.ddb.scan(params, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	}

	public async scanStatus() {
		return this.convertStatus(
			await this.scanData({
				TableName: __DEV__ ? CST.DB_AWS_STATUS_DEV : CST.DB_AWS_STATUS_LIVE
			})
		);
	}

	public convertStatus(status: ScanOutput): IStatus[] {
		if (!status.Items || !status.Items.length) return [];

		const output =  status.Items.map(d => {
			const process = d[CST.DB_ST_PROCESS].S || '';
			const timestamp = Number(d[CST.DB_ST_TS].N);
			if (process.startsWith('PRICE'))
				return {
					process: process,
					timestamp: timestamp,
					price: Number(d[CST.DB_TX_PRICE].N),
					volume: Number(d[CST.DB_TX_AMOUNT].N)
				} as IPriceStatus;
			else if (process.startsWith('FEED'))
				return {
					process: process,
					timestamp: timestamp,
					price: Number(d[CST.DB_HISTORY_PRICE].N),
					volume: Number(d[CST.DB_HISTORY_VOLUME].N)
				} as IPriceStatus;
			else
				return {
					process: process,
					timestamp: timestamp
				};
		});
		output.sort((a, b) => b.timestamp - a.timestamp);
		output.sort((a, b) => a.process.localeCompare(b.process));

		return output;
	}
}

const dynamoUtil = new DynamoUtil();
export default dynamoUtil;
