import moment from 'moment';
//import * as d3 from 'd3';
import * as React from 'react';
//import contractUtil from '../common/contractUtil';
import { IPriceBar } from '../../../../../../duo-admin/src/types';
import { IBalances, ICustodianPrices, ICustodianStates, IPriceBars } from '../../common/types';

function drawGraph(el: Element, dataHourly: IPriceBars, dataMinutely: IPriceBars) {
	console.log(el);
	console.log('************* Hourly **************');
	console.log(dataHourly);
	console.log('************* Minutely **************');
	console.log(dataMinutely);
	const newDataHourly = dataCompensation(dataHourly, true);
	const newDataMinutely = dataCompensation(dataMinutely, false);
	console.log('************* Hourly **************');
	console.log(newDataHourly);
	console.log('************* Minutely **************');
	console.log(newDataMinutely);
}

function dataCompensation(dataSet: IPriceBars, isHourly: boolean) {
	const newBitfinex = sourceDataComp(sortDataSet(dataSet.bitfinex), isHourly),
		newGemini = sourceDataComp(sortDataSet(dataSet.gemini), isHourly),
		newKraken = sourceDataComp(sortDataSet(dataSet.kraken), isHourly),
		newGdax = sourceDataComp(sortDataSet(dataSet.gdax), isHourly);
	const newDataSet = { newBitfinex, newGemini, newKraken, newGdax };
	return newDataSet;
}

function sortDataSet(sourceData: IPriceBar[]) {
	const sortedDataSet = sourceData.sort(
		(a, b) =>
			moment(a.date + ' ' + a.hour + ':' + a.minute).valueOf() -
			moment(b.date + ' ' + b.hour + ':' + b.minute).valueOf()
	);
	return sortedDataSet;
}

function sourceDataComp(sourceData: IPriceBar[], isHourly: boolean) {
	const newSourceData: IPriceBar[] = [];
	for (let i = 0; i < sourceData.length; i++) {
		newSourceData.push(sourceData[i]);
		if (i < sourceData.length - 1) {
			const timeStep = isHourly ? 3.6e6 : 60000;
			const timeIndex = moment(
				sourceData[i].date + ' ' + sourceData[i].hour + ':' + sourceData[i].minute
			).valueOf();
			const nextTimeIndex = moment(
				sourceData[i + 1].date +
					' ' +
					sourceData[i + 1].hour +
					':' +
					sourceData[i + 1].minute
			).valueOf();
			let fillCount = timeStep;
			while (timeIndex + fillCount !== nextTimeIndex) {
				const newTimeStamp = timeIndex + fillCount;
				if (isHourly) newSourceData.push(
					{
						source: sourceData[i].source,
						date: moment(newTimeStamp).format('YYYY-MM-DD'),
						hour: moment(newTimeStamp).format('HH'),
						minute: 0,
						open: sourceData[i].close,
						high: sourceData[i].close,
						low: sourceData[i].close,
						close: sourceData[i].close,
						volume: 0,
						timestamp: 0
					}
				);
				else newSourceData.push(
					{
						source: sourceData[i].source,
						date: moment(newTimeStamp).format('YYYY-MM-DD'),
						hour: moment(newTimeStamp).format('HH'),
						minute: Number(moment(newTimeStamp).format('mm')),
						open: sourceData[i].close,
						high: sourceData[i].close,
						low: sourceData[i].close,
						close: sourceData[i].close,
						volume: 0,
						timestamp: 0
					}
				);
				fillCount += timeStep;
			}
		}
	}

	return newSourceData;
}

interface IProps {
	account: string;
	refresh: number;
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	hourly: IPriceBars;
	minutely: IPriceBars;
}

export default class D3OHLCChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
	}

	public shouldComponentUpdate(nextProps: IProps) {
		const { hourly, minutely } = nextProps;
		if (
			JSON.stringify(this.props.hourly) !== JSON.stringify(hourly) ||
			JSON.stringify(this.props.minutely) !== JSON.stringify(minutely)
		)
			drawGraph(this.chartRef.current as Element, hourly, minutely);
		return false;
	}

	public render() {
		return <svg className="d3-OHLC-chart" ref={this.chartRef} />;
	}
}
