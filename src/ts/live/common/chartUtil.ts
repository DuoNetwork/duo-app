import moment from 'moment';
import {
	IAcceptedPrice,
	ICustodianPrice,
	ICustodianStates,
	IPriceBar,
	ITotalSupply
} from './types';
import util from './util';

class ChartUtil {
	public interpolate(sourceData: IPriceBar[], isHourly: boolean): IPriceBar[] {
		if (!sourceData.length) return [];
		sourceData.sort((a, b) => a.timestamp - b.timestamp);
		const newSourceData: IPriceBar[] = [];
		const timeStep = isHourly ? 3.6e6 : 60000;
		const source = sourceData[0].source;
		for (let i = 0; i < sourceData.length - 1; i++) {
			newSourceData.push(sourceData[i]);
			const timeIndex = sourceData[i].timestamp;
			const nextTimeIndex = sourceData[i + 1].timestamp;
			const close = sourceData[i].close;
			let newTimeStamp = timeIndex + timeStep;
			while (newTimeStamp < nextTimeIndex) {
				newSourceData.push({
					source: source,
					date: moment.utc(newTimeStamp).format('YYYY-MM-DD'),
					hour: moment.utc(newTimeStamp).format('HH'),
					minute: isHourly ? 0 : Number(moment.utc(newTimeStamp).format('mm')),
					open: close,
					high: close,
					low: close,
					close: close,
					volume: 0,
					timestamp: newTimeStamp
				});
				newTimeStamp += timeStep;
			}
		}
		newSourceData.push(sourceData[sourceData.length - 1]);

		return newSourceData;
	}

	public mergePriceBars(bars: IPriceBar[], timestep: number) {
		if (!bars.length)
			return {
				source: '',
				date: '',
				hour: '',
				minute: 0,
				open: 0,
				high: 0,
				low: 0,
				close: 0,
				volume: 0,
				timestamp: 0
			};
		const last = bars[bars.length - 1];
		let high = bars[0].high;
		let low = bars[0].low;
		let volume = 0;
		for (const bar of bars) {
			high = Math.max(high, bar.high);
			low = Math.min(low, bar.low);
			volume += bar.volume;
		}
		return {
			source: bars[0].source,
			date: last.date,
			hour: last.hour,
			minute: last.minute,
			open: bars[0].open,
			high: high,
			low: low,
			close: last.close,
			volume: volume,
			timestamp: bars[0].timestamp + timestep
		};
	}

	public reset(
		price: IAcceptedPrice[],
		limitUp: number,
		limitDown: number,
		limitPeriod: number
	): IAcceptedPrice[] {
		return price
			.filter(p => p.navB >= limitUp || p.navB <= limitDown || p.navA >= limitPeriod)
			.map(p => ({
				price: p.price,
				navA: 1,
				navB: 1,
				timestamp: p.timestamp + 717,
				blockNumber: p.blockNumber,
				transactionHash: p.transactionHash
			}));
	}

	public mergeReset(prices: IAcceptedPrice[], resets: IAcceptedPrice[]): IAcceptedPrice[] {
		const all = [...prices, ...resets];
		all.sort((a, b) => a.timestamp - b.timestamp);
		return all;
	}

	public mergeLastToPriceBar(
		pricebars: IPriceBar[],
		last: ICustodianPrice,
		isHourly: boolean
	): IPriceBar[] {
		if (!pricebars || !pricebars.length) return pricebars;
		const lastBar = pricebars[pricebars.length - 1];
		const dateObj = moment.utc(last.timestamp);
		if (lastBar.timestamp >= last.timestamp) return pricebars;

		if (isHourly && lastBar.date + ' ' + lastBar.hour <= dateObj.format('YYYY-MM-DD HH'))
			return [
				...pricebars,
				{
					source: lastBar.source,
					date: dateObj.format('YYYY-MM-DD'),
					hour: dateObj.format('HH'),
					minute: 0,
					open: lastBar.close,
					high: Math.max(lastBar.close, last.price),
					low: Math.min(lastBar.close, last.price),
					close: last.price,
					volume: 0,
					timestamp: last.timestamp
				}
			];
		else if (
			!isHourly &&
			lastBar.date + ' ' + lastBar.hour + ' ' + lastBar.minute <=
				dateObj.format('YYYY-MM-DD HH m')
		)
			return [
				...pricebars,
				{
					source: lastBar.source,
					date: dateObj.format('YYYY-MM-DD'),
					hour: dateObj.format('HH'),
					minute: Number(dateObj.format('mm')),
					open: lastBar.close,
					high: Math.max(lastBar.close, last.price),
					low: Math.min(lastBar.close, last.price),
					close: last.price,
					volume: 0,
					timestamp: last.timestamp
				}
			];
		else
			return [
				...pricebars.slice(0, pricebars.length - 1),
				{
					source: lastBar.source,
					date: lastBar.date,
					hour: lastBar.hour,
					minute: lastBar.minute,
					open: lastBar.open,
					high: Math.max(lastBar.high, last.price),
					low: Math.min(lastBar.low, last.price),
					close: last.price,
					volume: 0,
					timestamp: last.timestamp
				}
			];
	}

	public mergeLastToPrice(
		price: IAcceptedPrice[],
		states: ICustodianStates,
		last: ICustodianPrice
	): IAcceptedPrice[] {
		if (!price.length) return price;
		const lastPrice = price[price.length - 1];
		const lastTimestamp = Math.round(last.timestamp / 3600000) * 3600000;
		if (lastPrice.timestamp < lastTimestamp)
			return [
				...price,
				{
					price: last.price,
					navA: states.navA,
					navB: states.navB,
					timestamp: lastTimestamp,
					blockNumber: 0,
					transactionHash: ''
				}
			];

		return price;
	}

	public mergeTotalSupply(totalSupply: ITotalSupply[], states: ICustodianStates): ITotalSupply[] {
		const all = [
			...totalSupply,
			{
				tokenA: states.totalSupplyA,
				tokenB: states.totalSupplyB,
				timestamp: util.getNowTimestamp(),
				blockNumber: 0,
				transactionHash: ''
			}
		];
		all.sort((a, b) => a.timestamp - b.timestamp);
		return all;
	}
}

const chartUtil = new ChartUtil();
export default chartUtil;
