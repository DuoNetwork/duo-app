import {IData} from "./D3Chart";

type ISMAOutData = Array<{
	date: string;
	SMA: number;
}>;

type IEMAOutData = Array<{
	date: string;
	EMA: number;
}>;

const getSubset = (data: IData, range: number, i: number): IData => {
	let subSet: IData;
	let startIndex = 0;
	if (i < range) subSet = data.slice(startIndex, i + 1);
	else {
		startIndex = i - range + 1;
		subSet = data.slice(startIndex, i + 1);
	}
	return subSet;
};

const calSMA = (data: IData, range: number, source: string): ISMAOutData => {
	let outData: ISMAOutData = [];
	let i: number;
	for (i = 0; i < data.length; i++) {
		let subSet = getSubset(data, range, i);
		let average = 0;
		subSet.forEach(d => {
			switch (source) {
				case "open":
					average += d.open;
					break;
				case "high":
					average += d.high;
					break;
				case "low":
					average += d.low;
					break;
				case "close":
					average += d.close;
					break;
				default:
					average += d.close;
					break;
			}
		});
		average /= subSet.length;
		outData.push({date: data[i].date, SMA: average});
	}
	return outData;
};

const calEMA = (data: IData, range: number, source: string): IEMAOutData => {
	let outData: IEMAOutData = [];
	let i: number;
	function EMA(i:number):number {
		let data_value: number;
		let window = i < range ? i : range;
		switch (source) {
			case "open":
				data_value = data[i].open;
				break;
			case "high":
				data_value = data[i].high;
				break;
			case "low":
				data_value = data[i].low;
				break;
			case "close":
				data_value = data[i].close;
				break;
			default:
				data_value = data[i].close;
				break;
		}
		if (i === 0) {
			return data_value;
		} else {
			return (2 * data_value + (window - 1) * EMA(i - 1)) / (window + 1);
		}
	}
	for (i = 0; i < data.length; i++) {
		let e_average = EMA(i);
		outData.push({date: data[i].date, EMA: e_average});
	}
	return outData;
};

export {calSMA, calEMA};
