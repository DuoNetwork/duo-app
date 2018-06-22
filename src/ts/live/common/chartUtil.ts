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

	public mergePriceBars(bars: IPriceBar[]) {
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
			timestamp: last.timestamp
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
