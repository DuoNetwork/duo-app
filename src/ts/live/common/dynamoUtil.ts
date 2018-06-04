import AWS from 'aws-sdk';
import { QueryInput, QueryOutput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import devConfig from '../../keys/aws.ui.dev.json';
import liveConfig from '../../keys/aws.ui.live.json';
import { IPriceBar, IPriceStatus, IStatus } from '../common/types';
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
			this.ddb.scan(params, (err, data) => (err ? reject(err) : resolve(data)));
		});
	}

	public queryData(params: QueryInput): Promise<QueryOutput> {
		return new Promise((resolve, reject) =>
			this.ddb.query(params, (err, data) => (err ? reject(err) : resolve(data)))
		);
	}

	public async queryHourlyOHLC(source: string, dates: string[]) {
		const promiseList = dates.map(date => this.queryData({
				TableName: __DEV__ ? CST.DB_AWS_HOURLY_DEV : CST.DB_AWS_HOURLY_LIVE,
				KeyConditionExpression: CST.DB_HR_SRC_DATE + ' = :' + CST.DB_HR_SRC_DATE,
				ExpressionAttributeValues: {
					[':' + CST.DB_HR_SRC_DATE]: { S: source + '|' + date }
				}
			}));

		const allData: IPriceBar[] = [];
		(await Promise.all(promiseList)).forEach(r => allData.push(...this.convertHourly(r)));
		allData.sort((a, b) => a.timestamp - b.timestamp);
		return allData;
	}

	public convertHourly(hourly: QueryOutput): IPriceBar[] {
		if (!hourly.Items || !hourly.Items.length) return [];
		const sourceDate = hourly.Items[0][CST.DB_HR_SRC_DATE].S || '';
		const [source, date] = sourceDate.split('|');
		return hourly.Items.map(h => {
			const hour = h[CST.DB_HR_HOUR].N || '';
			return {
				source: source,
				date: date,
				hour: hour.length < 2 ? '0' + hour : hour,
				minute: 0,
				open: Number(h[CST.DB_OHLC_OPEN].N),
				high: Number(h[CST.DB_OHLC_HIGH].N),
				low: Number(h[CST.DB_OHLC_LOW].N),
				close: Number(h[CST.DB_OHLC_CLOSE].N),
				volume: Number(h[CST.DB_OHLC_VOLUME].N),
				timestamp: Number(h[CST.DB_OHLC_TS].N)
			};
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

		const output = status.Items.map(d => {
			const process = d[CST.DB_ST_PROCESS].S || '';
			const timestamp = Number(d[CST.DB_ST_TS].N);
			if (process.startsWith('PRICE'))
				return {
					process: process,
					timestamp: timestamp,
					price: Number(d[CST.DB_TX_PRICE].N),
					volume: Number(d[CST.DB_TX_AMOUNT].N)
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
