import AWS from 'aws-sdk';
import { QueryInput, QueryOutput, ScanInput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import devConfig from '../../keys/aws.ui.dev.json';
import liveConfig from '../../keys/aws.ui.live.json';
import {
	IAcceptedPrice,
	IConversion,
	ICustodianPrice,
	IPriceBar,
	IPriceStatus,
	ISourceData,
	IStatus
} from '../common/types';
import * as CST from './constants';
import contractUtil from './contractUtil';

export class DynamoUtil {
	private ddb: AWS.DynamoDB;
	constructor() {
		// this.role = role;
		AWS.config.update(__KOVAN__ ? devConfig : liveConfig);
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
				TableName: __KOVAN__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
				KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
				ExpressionAttributeValues: {
					[':' + CST.DB_EV_KEY]: { S: CST.EVENT_ACCEPT_PRICE + '|' + date }
				}
			})
		);

		const allData: IAcceptedPrice[] = [];
		(await Promise.all(promiseList)).forEach(r =>
			allData.push(...this.parseAcceptedPrices(r))
		);
		return allData;
	}

	public parseAcceptedPrices(acceptPrice: QueryOutput): IAcceptedPrice[] {
		if (!acceptPrice.Items || !acceptPrice.Items.length) return [];
		return acceptPrice.Items.map(p => ({
			price: contractUtil.fromWei(p[CST.DB_EV_PX].S || ''),
			navA: contractUtil.fromWei(p[CST.DB_EV_NAV_A].S || ''),
			navB: contractUtil.fromWei(p[CST.DB_EV_NAV_B].S || ''),
			timestamp: Number(p[CST.DB_EV_TS].S) * 1000
		}));
	}

	public async queryConversionEvent(address: string, dates: string[]) {
		const eventKeys: string[] = [];
		dates.forEach(date =>
			eventKeys.push(
				...[CST.EVENT_CREATE, CST.EVENT_REDEEM].map(ev => ev + '|' + date + '|' + address)
			)
		);
		const promiseList = eventKeys.map(ek =>
			this.queryData({
				TableName: __KOVAN__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
				KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
				ExpressionAttributeValues: {
					[':' + CST.DB_EV_KEY]: { S: ek }
				}
			})
		);

		const allData: IConversion[] = [];
		(await Promise.all(promiseList)).forEach(r =>
			allData.push(...this.parseConversions(r))
		);
		return allData;
	}

	public parseConversions(conversions: QueryOutput): IConversion[] {
		if (!conversions.Items || !conversions.Items.length) return [];
		return conversions.Items.map(c => {
			const eventKey = c[CST.DB_EV_KEY].S || '';
			const type = eventKey.split('|')[0];

			return {
				type: type,
				timestamp: Number((c[CST.DB_EV_TIMESTAMP_ID].S || '').split('|')[0]),
				eth: contractUtil.fromWei(c[CST.DB_EV_ETH].S || ''),
				tokenA: contractUtil.fromWei(c[CST.DB_EV_TOKEN_A].S || ''),
				tokenB: contractUtil.fromWei(c[CST.DB_EV_TOKEN_B].S || ''),
			};
		});
	}

	public async queryHourlyOHLC(source: string, dates: string[]) {
		const promiseList = dates.map(date =>
			this.queryData({
				TableName: __KOVAN__ ? CST.DB_AWS_HOURLY_DEV : CST.DB_AWS_HOURLY_LIVE,
				KeyConditionExpression: CST.DB_HR_SRC_DATE + ' = :' + CST.DB_HR_SRC_DATE,
				ExpressionAttributeValues: {
					[':' + CST.DB_HR_SRC_DATE]: { S: source + '|' + date }
				}
			})
		);

		const allData: IPriceBar[] = [];
		(await Promise.all(promiseList)).forEach(r => allData.push(...this.parseHourly(r)));
		return allData;
	}

	public async queryMinutelyOHLC(source: string, datetimes: string[]) {
		const promiseList = datetimes.map(datetime =>
			this.queryData({
				TableName: __KOVAN__ ? CST.DB_AWS_MINUTELY_DEV : CST.DB_AWS_MINUTELY_LIVE,
				KeyConditionExpression: CST.DB_MN_SRC_DATE_HOUR + ' = :' + CST.DB_MN_SRC_DATE_HOUR,
				ExpressionAttributeValues: {
					[':' + CST.DB_MN_SRC_DATE_HOUR]: { S: source + '|' + datetime }
				}
			})
		);

		const allData: IPriceBar[] = [];
		(await Promise.all(promiseList)).forEach(r => allData.push(...this.parseMinutely(r)));
		return allData;
	}

	private parseOHLC(
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

	public parseHourly(hourly: QueryOutput): IPriceBar[] {
		if (!hourly.Items || !hourly.Items.length) return [];
		const sourceDate = hourly.Items[0][CST.DB_HR_SRC_DATE].S || '';
		const [source, date] = sourceDate.split('|');
		return hourly.Items.map(h => {
			const hour = h[CST.DB_HR_HOUR].N || '';
			return this.parseOHLC(source, date, hour.length < 2 ? '0' + hour : hour, 0, h);
		});
	}

	public parseMinutely(minutely: QueryOutput): IPriceBar[] {
		if (!minutely.Items || !minutely.Items.length) return [];
		const sourceDatetime = minutely.Items[0][CST.DB_MN_SRC_DATE_HOUR].S || '';
		const [source, datetime] = sourceDatetime.split('|');
		return minutely.Items.map(m =>
			this.parseOHLC(
				source,
				datetime.substring(0, 10),
				datetime.substring(11, 13),
				Number(m[CST.DB_MN_MINUTE].N),
				m
			)
		);
	}

	public async scanStatus() {
		return this.parseStatus(
			await this.scanData({
				TableName: __KOVAN__ ? CST.DB_AWS_STATUS_DEV : CST.DB_AWS_STATUS_LIVE
			})
		);
	}

	public parseStatus(status: ScanOutput): IStatus[] {
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

	public getLastPriceFromStatus(status: IStatus[]): ISourceData<ICustodianPrice> {
		const bitfinex: ICustodianPrice = {
			address: '0x0',
			price: 0,
			timestamp: 0
		};
		const kraken: ICustodianPrice = {
			address: '0x0',
			price: 0,
			timestamp: 0
		};
		const gemini: ICustodianPrice = {
			address: '0x0',
			price: 0,
			timestamp: 0
		};
		const gdax: ICustodianPrice = {
			address: '0x0',
			price: 0,
			timestamp: 0
		};
		status.forEach(s => {
			if (s.process === 'PRICE_AWS_PUBLIC_BITFINEX') {
				bitfinex.price = (s as IPriceStatus).price;
				bitfinex.timestamp = (s as IPriceStatus).timestamp;
			} else if (s.process === 'PRICE_AWS_PUBLIC_GEMINI') {
				gemini.price = (s as IPriceStatus).price;
				gemini.timestamp = (s as IPriceStatus).timestamp;
			} else if (s.process === 'PRICE_AWS_PUBLIC_KRAKEN') {
				kraken.price = (s as IPriceStatus).price;
				kraken.timestamp = (s as IPriceStatus).timestamp;
			} else if (s.process === 'PRICE_AWS_PUBLIC_GDAX') {
				gdax.price = (s as IPriceStatus).price;
				gdax.timestamp = (s as IPriceStatus).timestamp;
			}
		});

		return {
			bitfinex,
			kraken,
			gemini,
			gdax
		};
	}
}

const dynamoUtil = new DynamoUtil();
export default dynamoUtil;
