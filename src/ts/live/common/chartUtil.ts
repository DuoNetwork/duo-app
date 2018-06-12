import moment from 'moment';
import { IAcceptedPrice, IPriceBar } from './types';

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
		prices: IAcceptedPrice[],
		limitUp: number,
		limitDown: number,
		limitPeriod: number
	): IAcceptedPrice[] {
		return prices
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
}

const chartUtil = new ChartUtil();
export default chartUtil;
