import AWS from 'aws-sdk';
import {
	DeleteItemInput,
	PutItemInput,
	QueryInput,
	QueryOutput,
	ScanInput,
	ScanOutput
} from 'aws-sdk/clients/dynamodb';
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
	IStatus,
	ITotalSupply
} from '../common/types';
import * as CST from './constants';
import contractUtil from './contractUtil';
import util from './util';

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

	public insertData(params: PutItemInput): Promise<void> {
		return new Promise((resolve, reject) =>
			this.ddb.putItem(params, err => (err ? reject(err) : resolve()))
		);
	}

	public deleteData(params: DeleteItemInput): Promise<void> {
		return new Promise((resolve, reject) =>
			this.ddb.deleteItem(params, err => (err ? reject(err) : resolve()))
		);
	}

	public async queryAcceptPriceEvent(dates: string[]) {
		const allData: IAcceptedPrice[] = [];
		for (const date of dates)
			allData.push(
				...this.parseAcceptedPrice(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
						KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
						ExpressionAttributeValues: {
							[':' + CST.DB_EV_KEY]: { S: CST.EVENT_ACCEPT_PRICE + '|' + date }
						}
					})
				)
			);
		return allData;
	}

	public parseAcceptedPrice(acceptPrice: QueryOutput): IAcceptedPrice[] {
		if (!acceptPrice.Items || !acceptPrice.Items.length) return [];
		return acceptPrice.Items.map(p => ({
			transactionHash: p[CST.DB_EV_TX_HASH].S || '',
			blockNumber: Number(p[CST.DB_EV_BLOCK_NO].N),
			price: contractUtil.fromWei(p[CST.DB_EV_PX].S || ''),
			navA: contractUtil.fromWei(p[CST.DB_EV_NAV_A].S || ''),
			navB: contractUtil.fromWei(p[CST.DB_EV_NAV_B].S || ''),
			timestamp: Math.round(Number(p[CST.DB_EV_TS].S) / 3600) * 3600000
		}));
	}

	public async queryTotalSupplyEvent(dates: string[]) {
		const allData: ITotalSupply[] = [];
		for (const date of dates)
			allData.push(
				...this.parseTotalSupply(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
						KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
						ExpressionAttributeValues: {
							[':' + CST.DB_EV_KEY]: { S: CST.EVENT_TOTAL_SUPPLY + '|' + date }
						}
					})
				)
			);

		return allData;
	}

	public parseTotalSupply(totalSupply: QueryOutput): ITotalSupply[] {
		if (!totalSupply.Items || !totalSupply.Items.length) return [];
		return totalSupply.Items.map(t => ({
			transactionHash: t[CST.DB_EV_TX_HASH].S || '',
			blockNumber: Number(t[CST.DB_EV_BLOCK_NO].N),
			tokenA: contractUtil.fromWei(t[CST.DB_EV_TOTAL_SUPPLY_A].S || ''),
			tokenB: contractUtil.fromWei(t[CST.DB_EV_TOTAL_SUPPLY_B].S || ''),
			timestamp: Number((t[CST.DB_EV_TIMESTAMP_ID].S || '').split('|')[0])
		}));
	}

	public async queryConversionEvent(address: string, dates: string[]) {
		const eventKeys: string[] = [];
		dates.forEach(date =>
			eventKeys.push(
				...[CST.EVENT_CREATE, CST.EVENT_REDEEM].map(ev => ev + '|' + date + '|' + address)
			)
		);
		const allData: IConversion[] = [];
		for (const ek of eventKeys)
			allData.push(
				...this.parseConversion(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_EVENTS_DEV : CST.DB_AWS_EVENTS_LIVE,
						KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
						ExpressionAttributeValues: {
							[':' + CST.DB_EV_KEY]: { S: ek }
						}
					})
				)
			);
		return allData;
	}

	public parseConversion(conversion: QueryOutput): IConversion[] {
		if (!conversion.Items || !conversion.Items.length) return [];
		return conversion.Items.map(c => ({
			transactionHash: c[CST.DB_EV_TX_HASH].S || '',
			blockNumber: Number(c[CST.DB_EV_BLOCK_NO].N),
			type: (c[CST.DB_EV_KEY].S || '').split('|')[0],
			timestamp: Number((c[CST.DB_EV_TIMESTAMP_ID].S || '').split('|')[0]),
			eth: contractUtil.fromWei(c[CST.DB_EV_ETH].S || ''),
			tokenA: contractUtil.fromWei(c[CST.DB_EV_TOKEN_A].S || ''),
			tokenB: contractUtil.fromWei(c[CST.DB_EV_TOKEN_B].S || ''),
			ethFee: contractUtil.fromWei(c[CST.DB_EV_ETH_FEE].S || ''),
			duoFee: contractUtil.fromWei(c[CST.DB_EV_DUO_FEE].S || '')
		}));
	}

	public async queryHourlyOHLC(source: string, dates: string[]) {
		const allData: IPriceBar[] = [];
		for (const date of dates)
			allData.push(
				...this.parseHourly(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_HOURLY_DEV : CST.DB_AWS_HOURLY_LIVE,
						KeyConditionExpression: CST.DB_HR_SRC_DATE + ' = :' + CST.DB_HR_SRC_DATE,
						ExpressionAttributeValues: {
							[':' + CST.DB_HR_SRC_DATE]: { S: source + '|' + date }
						}
					})
				)
			);
		return allData;
	}

	public async queryMinutelyOHLC(source: string, datetimes: string[]) {
		const allData: IPriceBar[] = [];
		for (const datetime of datetimes)
			allData.push(
				...this.parseMinutely(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_MINUTELY_DEV : CST.DB_AWS_MINUTELY_LIVE,
						KeyConditionExpression:
							CST.DB_MN_SRC_DATE_HOUR + ' = :' + CST.DB_MN_SRC_DATE_HOUR,
						ExpressionAttributeValues: {
							[':' + CST.DB_MN_SRC_DATE_HOUR]: { S: source + '|' + datetime }
						}
					})
				)
			);
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
			timestamp: moment.utc(date + ' ' + hour + ':' + minute, 'YYYY-MM-DD HH:m').valueOf()
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
			else if (process.startsWith('CHAIN'))
				return {
					process: process,
					timestamp: timestamp,
					block: Number(d[CST.DB_ST_BLOCK].N)
				}
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

	public async insertUIConversion(
		account: string,
		txHash: string,
		isCreate: boolean,
		eth: number,
		tokenA: number,
		tokenB: number,
		ethFee: number,
		duoFee: number
	) {
		const params = {
			TableName: __KOVAN__ ? CST.DB_AWS_UI_EVENTS_DEV : CST.DB_AWS_UI_EVENTS_LIVE,
			Item: {
				[CST.DB_EV_KEY]: {
					S: (isCreate ? CST.EVENT_CREATE : CST.EVENT_REDEEM) + '|' + account
				},
				[CST.DB_EV_SYSTIME]: { N: util.getNowTimestamp() + '' },
				[CST.DB_EV_TX_HASH]: { S: txHash },
				[CST.DB_EV_UI_ETH]: { N: eth + '' },
				[CST.DB_EV_UI_TOKEN_A]: { N: tokenA + '' },
				[CST.DB_EV_UI_TOKEN_B]: { N: tokenB + '' },
				[CST.DB_EV_UI_ETH_FEE]: { N: ethFee + '' },
				[CST.DB_EV_UI_DUO_FEE]: { N: duoFee + '' }
			}
		};

		await this.insertData(params);
	}

	public async queryUIConversionEvent(account: string) {
		const eventKeys: string[] = [CST.EVENT_CREATE, CST.EVENT_REDEEM].map(
			ev => ev + '|' + account
		);
		const allData: IConversion[] = [];
		for (const ek of eventKeys)
			allData.push(
				...this.parseUIConversion(
					await this.queryData({
						TableName: __KOVAN__ ? CST.DB_AWS_UI_EVENTS_DEV : CST.DB_AWS_UI_EVENTS_LIVE,
						KeyConditionExpression: CST.DB_EV_KEY + ' = :' + CST.DB_EV_KEY,
						ExpressionAttributeValues: {
							[':' + CST.DB_EV_KEY]: { S: ek }
						}
					})
				)
			);
		return allData;
	}

	public parseUIConversion(conversion: QueryOutput): IConversion[] {
		if (!conversion.Items || !conversion.Items.length) return [];
		return conversion.Items.map(c => ({
			transactionHash: c[CST.DB_EV_TX_HASH].S || '',
			blockNumber: 0,
			type: (c[CST.DB_EV_KEY].S || '').split('|')[0],
			timestamp: Number(c[CST.DB_EV_SYSTIME].N || ''),
			eth: Number(c[CST.DB_EV_UI_ETH].N),
			tokenA: Number(c[CST.DB_EV_UI_TOKEN_A].N),
			tokenB: Number(c[CST.DB_EV_UI_TOKEN_B].N),
			ethFee: Number(c[CST.DB_EV_UI_ETH_FEE].N),
			duoFee: Number(c[CST.DB_EV_UI_DUO_FEE].N)
		}));
	}

	public deleteUIConversionEvent(account: string, conversion: IConversion): Promise<void> {
		return this.deleteData({
			TableName: __KOVAN__ ? CST.DB_AWS_UI_EVENTS_DEV : CST.DB_AWS_UI_EVENTS_LIVE,
			Key: {
				[CST.DB_EV_KEY]: {
					S: conversion.type + '|' + account
				},
				[CST.DB_EV_TX_HASH]: {
					S: conversion.transactionHash
				}
			}
		});
	}
}

const dynamoUtil = new DynamoUtil();
export default dynamoUtil;
