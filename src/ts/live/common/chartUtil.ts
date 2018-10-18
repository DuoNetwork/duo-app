import { IAcceptedPrice, ICustodianPrice, ICustodianStates, IPrice } from './types';

class ChartUtil {
	public mergePrices(prices: IPrice[], period: number): IPrice[] {
		const merged: IPrice[] = [];
		let currentBatch: IPrice[] = [];
		for (let i = 0; i < prices.length; i++) {
			const price = prices[i];
			if (!currentBatch.length) currentBatch.push(price);
			else if (
				Math.floor(price.timestamp / period / 60000) !==
				Math.floor(prices[i - 1].timestamp / period / 60000)
			) {
				merged.push(this.mergePricesToPrice(currentBatch, period));
				currentBatch = [];
			} else currentBatch.push(price);
		}

		if (currentBatch.length) merged.push(this.mergePricesToPrice(currentBatch, period));
		return merged;
	}

	public mergePricesToPrice(prices: IPrice[], period: number): IPrice {
		if (!prices.length)
			return {
				source: '',
				base: '',
				quote: '',
				period: period,
				open: 0,
				high: 0,
				low: 0,
				close: 0,
				volume: 0,
				timestamp: 0
			};
		const last = prices[0];
		const first = prices[prices.length - 1];
		let high = prices[0].high;
		let low = prices[0].low;
		let volume = 0;
		for (const price of prices) {
			high = Math.max(high, price.high);
			low = Math.min(low, price.low);
			volume += price.volume;
		}
		return {
			source: last.source,
			base: last.base,
			quote: last.quote,
			period: period,
			open: first.open,
			high: high,
			low: low,
			close: last.close,
			volume: volume,
			timestamp: Math.floor(first.timestamp / period / 60000) * period * 60000
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

	public mergeLastestToPrices(prices: IPrice[], latest: ICustodianPrice): IPrice[] {
		if (!prices || !prices.length) return prices;
		const lastPrice = prices[0];
		if (lastPrice.timestamp >= latest.timestamp) return prices;

		if (
			Math.floor(lastPrice.timestamp / lastPrice.period / 60000) !==
			Math.floor(latest.timestamp / lastPrice.period / 60000)
		)
			return [
				{
					source: lastPrice.source,
					base: lastPrice.base,
					quote: lastPrice.quote,
					period: lastPrice.period,
					open: lastPrice.close,
					high: Math.max(lastPrice.close, latest.price),
					low: Math.min(lastPrice.close, latest.price),
					close: latest.price,
					volume: 0,
					timestamp:
						Math.floor(latest.timestamp / lastPrice.period / 60000) *
						lastPrice.period *
						60000
				},
				...prices
			];
		else
			return [
				{
					source: lastPrice.source,
					base: lastPrice.base,
					quote: lastPrice.quote,
					period: lastPrice.period,
					open: lastPrice.open,
					high: Math.max(lastPrice.high, latest.price),
					low: Math.min(lastPrice.low, latest.price),
					close: latest.price,
					volume: 0,
					timestamp: lastPrice.timestamp
				},
				...prices.slice(1, prices.length)
			];
	}

	public mergeLastestToAcceptedPrices(
		acceptedPrices: IAcceptedPrice[],
		states: ICustodianStates,
		last: ICustodianPrice
	): IAcceptedPrice[] {
		if (!acceptedPrices.length) return acceptedPrices;
		const lastPrice = acceptedPrices[acceptedPrices.length - 1];
		const lastTimestamp = Math.round(last.timestamp / 3600000) * 3600000;
		if (lastPrice.timestamp < lastTimestamp)
			return [
				...acceptedPrices,
				{
					price: last.price,
					navA: states.navA,
					navB: states.navB,
					timestamp: lastTimestamp,
					blockNumber: 0,
					transactionHash: ''
				}
			];

		return acceptedPrices;
	}

	// public mergeTotalSupply(totalSupply: ITotalSupply[], states: ICustodianStates): ITotalSupply[] {
	// 	const all = [
	// 		...totalSupply,
	// 		{
	// 			tokenA: states.totalSupplyA,
	// 			tokenB: states.totalSupplyB,
	// 			timestamp: util.getUTCNowTimestamp(),
	// 			blockNumber: 0,
	// 			transactionHash: ''
	// 		}
	// 	];
	// 	all.sort((a, b) => a.timestamp - b.timestamp);
	// 	return all;
	// }
}

const chartUtil = new ChartUtil();
export default chartUtil;
