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
	areaColor?: string
}

export interface IPriceData {
	date: string;
	ETH: number;
	ClassA: number;
	ClassB: number;
	ClassAbeforeReset?: number;
	ClassBbeforeReset?: number;
	ResetType?: string;
	InterestCount: number;
}

export interface IAssets {
	ETH: number;
	ClassA: number;
	ClassB: number;
}
