import moment from 'moment';
import * as CST from '../common/constants';
import {
	IAcceptedPrice,
	ICustodianPrice,
	ICustodianStates,
	IPriceBar,
	ISourceData,
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
					date: moment(newTimeStamp).format('YYYY-MM-DD'),
					hour: moment(newTimeStamp).format('HH'),
					minute: isHourly ? 0 : Number(moment(newTimeStamp).format('mm')),
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

	public mergeLastToPriceBar(
		pricebars: ISourceData<IPriceBar[]>,
		last: ISourceData<ICustodianPrice>,
		isHourly: boolean
	) {
		CST.EXCHANGES.forEach(src => {
			const pricebar: IPriceBar[] = pricebars[src.toLowerCase()];
			if (!pricebar || !pricebar.length) return;
			const sourceLast: ICustodianPrice = last[src.toLowerCase()];
			const lastBar = pricebar[pricebar.length - 1];
			const dateObj = moment.utc(sourceLast.timestamp);
			if (isHourly && lastBar.date + ' ' + lastBar.hour !== dateObj.format('YYYY-MM-DD HH'))
				pricebar.push({
					source: lastBar.source,
					date: dateObj.format('YYYY-MM-DD'),
					hour: dateObj.format('HH'),
					minute: 0,
					open: lastBar.close,
					high: Math.max(lastBar.close, sourceLast.price),
					low: Math.min(lastBar.close, sourceLast.price),
					close: sourceLast.price,
					volume: 0,
					timestamp: sourceLast.timestamp
				});
			else if (
				!isHourly &&
				lastBar.date + ' ' + lastBar.hour + ' ' + lastBar.minute !==
					dateObj.format('YYYY-MM-DD HH m')
			)
				pricebar.push({
					source: lastBar.source,
					date: dateObj.format('YYYY-MM-DD'),
					hour: dateObj.format('HH'),
					minute: Number(dateObj.format('mm')),
					open: lastBar.close,
					high: Math.max(lastBar.close, sourceLast.price),
					low: Math.min(lastBar.close, sourceLast.price),
					close: sourceLast.price,
					volume: 0,
					timestamp: sourceLast.timestamp
				});
			else {
				lastBar.high = Math.max(lastBar.high, sourceLast.price);
				lastBar.low = Math.min(lastBar.low, sourceLast.price);
				lastBar.close = sourceLast.price;
				lastBar.timestamp = sourceLast.timestamp;
			}
		});
	}

	public mergeLastToPrice(
		price: IAcceptedPrice[],
		states: ICustodianStates,
		last: ICustodianPrice
	) {
		if (!price.length) return;
		const lastPrice = price[price.length - 1];
		if (lastPrice.timestamp < last.timestamp)
			price.push({
				price: last.price,
				navA: states.navA,
				navB: states.navB,
				timestamp: last.timestamp,
				blockNumber: 0,
				transactionHash: ''
			});
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
