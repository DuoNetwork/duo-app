export interface IPriceDatum {
	date: string;
	ETH: number;
	ClassA: number;
	ClassB: number;
	ClassAbeforeReset?: number;
	ClassBbeforeReset?: number;
	ResetType?: string;
	InterestCount: number;
}

export type IPriceData = IPriceDatum[];

export interface IMVDatum {
	date: string;
	MV: number;
}

export type IMVData = IMVDatum[];

export interface IPriceProps {
	name: string;
	data: IPriceData;
	movedata: IPriceData;
	pickedPriceDatum: (d: IPriceDatum) => void;
}

export interface IPriceState {
	windowWidth: number;
	windowHeight: number;
}

export interface IMVProps {
	name: string;
	data: IMVData;
	pickedMVDatum: (d: IMVDatum) => void;
}

export interface IMVState {
	windowWidth: number;
	windowHeight: number;
}

export interface IAssets {
	ETH: number;
	ClassA: number;
	ClassB: number;
}
