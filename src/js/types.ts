export interface ITimeSeriesData {
	datetime: number;
	value: number;
}

export interface ITimeSeries {
	name: string,
	data: ITimeSeriesData[];
	dotOnly?: boolean;
	highlight: number;
	rightAxis?: boolean;
	color?: string,
	width?: number,
	areaColor?: string,
	flagLegend?: boolean
}

export interface IPriceData {
	Date: number,
	ETH: number;
	ClassA: number;
	ClassB: number;
}

export interface IRawData {
	Date: string;
	Price: number;
}

export interface IAssets {
	ETH: number;
	ClassA: number;
	ClassB: number;
}
