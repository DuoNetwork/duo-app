import AWS from 'aws-sdk';
import { QueryInput, QueryOutput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import devConfig from '../../keys/aws.ui.dev.json';
import liveConfig from '../../keys/aws.ui.live.json';
import { IAcceptedPrice, IPriceBar, IPriceStatus, IStatus } from '../common/types';
import * as CST from './constants';
import contractUtil from './contractUtil';

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

	public async queryAcceptPriceEvent(dates: string[]) {
		const promiseList = dates.map(date =>
			this.queryData({
				TableName: __DEV__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
				KeyConditionExpression: CST.DB_EVENT_KEY + ' = :' + CST.DB_EVENT_KEY,
				ExpressionAttributeValues: {
					[':' + CST.DB_EVENT_KEY]: { S: CST.EVENT_ACCEPT_PRICE + '|' + date }
				}
			})
		);

		const allData: IAcceptedPrice[] = [];
		(await Promise.all(promiseList)).forEach(r =>
			allData.push(...this.convertAcceptedPrices(r))
		);
		return allData;
	}

	public convertAcceptedPrices(acceptPrice: QueryOutput): IAcceptedPrice[] {
		if (!acceptPrice.Items || !acceptPrice.Items.length) return [];
		return acceptPrice.Items.map(p => ({
			price: contractUtil.fromWei(p['priceInWei'].S || ''),
			navA: contractUtil.fromWei(p['navAInWei'].S || ''),
			navB: contractUtil.fromWei(p['navBInWei'].S || ''),
			timestamp: Number(p['timeInSecond'].S) * 1000
		}));
	}

	public async queryHourlyOHLC(source: string, dates: string[]) {
		const promiseList = dates.map(date =>
			this.queryData({
				TableName: __DEV__ ? CST.DB_AWS_HOURLY_DEV : CST.DB_AWS_HOURLY_LIVE,
				KeyConditionExpression: CST.DB_HR_SRC_DATE + ' = :' + CST.DB_HR_SRC_DATE,
				ExpressionAttributeValues: {
					[':' + CST.DB_HR_SRC_DATE]: { S: source + '|' + date }
				}
			})
		);

		const allData: IPriceBar[] = [];
		(await Promise.all(promiseList)).forEach(r => allData.push(...this.convertHourly(r)));
		return allData;
	}

	public async queryMinutelyOHLC(source: string, datetimes: string[]) {
		const promiseList = datetimes.map(datetime =>
			this.queryData({
				TableName: __DEV__ ? CST.DB_AWS_MINUTELY_DEV : CST.DB_AWS_MINUTELY_LIVE,
				KeyConditionExpression: CST.DB_MN_SRC_DATE_HOUR + ' = :' + CST.DB_MN_SRC_DATE_HOUR,
				ExpressionAttributeValues: {
					[':' + CST.DB_MN_SRC_DATE_HOUR]: { S: source + '|' + datetime }
				}
			})
		);

		const allData: IPriceBar[] = [];
		(await Promise.all(promiseList)).forEach(r => allData.push(...this.convertMinutely(r)));
		return allData;
	}

	private convertOHLC(
		source: string,
		date: string,
		hour: string,
		minute: number,
		ohlc: object
	): IPriceBar {
		return {
			source: source,
			date: date,
			hour: hour,
			minute: minute,
			open: Number(ohlc[CST.DB_OHLC_OPEN].N),
			high: Number(ohlc[CST.DB_OHLC_HIGH].N),
			low: Number(ohlc[CST.DB_OHLC_LOW].N),
			close: Number(ohlc[CST.DB_OHLC_CLOSE].N),
			volume: Number(ohlc[CST.DB_OHLC_VOLUME].N),
			timestamp: moment(date + ' ' + hour + ':' + minute, 'YYYY-MM-DD HH:m').valueOf()
		};
	}

	public convertHourly(hourly: QueryOutput): IPriceBar[] {
		if (!hourly.Items || !hourly.Items.length) return [];
		const sourceDate = hourly.Items[0][CST.DB_HR_SRC_DATE].S || '';
		const [source, date] = sourceDate.split('|');
		return hourly.Items.map(h => {
			const hour = h[CST.DB_HR_HOUR].N || '';
			return this.convertOHLC(source, date, hour.length < 2 ? '0' + hour : hour, 0, h);
		});
	}

	public convertMinutely(minutely: QueryOutput): IPriceBar[] {
		if (!minutely.Items || !minutely.Items.length) return [];
		const sourceDatetime = minutely.Items[0][CST.DB_MN_SRC_DATE_HOUR].S || '';
		const [source, datetime] = sourceDatetime.split('|');
		return minutely.Items.map(m =>
			this.convertOHLC(
				source,
				datetime.substring(0, 10),
				datetime.substring(11, 13),
				Number(m[CST.DB_MN_MINUTE].N),
				m
			)
		);
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
