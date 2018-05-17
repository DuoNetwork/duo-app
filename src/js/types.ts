export interface ITimeSeriesData {
	datetime: string;
	value: number;
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
