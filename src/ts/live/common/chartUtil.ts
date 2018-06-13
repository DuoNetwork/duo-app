import moment from 'moment';
import * as CST from '../common/constants';
import { IAcceptedPrice, ICustodianPrice, ICustodianStates, IPriceBar, ISourceData } from './types';

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
				timestamp: p.timestamp + 717
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
		prices: IAcceptedPrice[],
		states: ICustodianStates,
		last: ICustodianPrice
	) {
		if (!prices.length) return;
		const lastPrice = prices[prices.length - 1];
		if (lastPrice.timestamp < last.timestamp)
			prices.push({
				price: last.price,
				navA: states.navA,
				navB: states.navB,
				timestamp: last.timestamp
			});
	}
}

const chartUtil = new ChartUtil();
export default chartUtil;
