export interface ITimeSeriesData {
	datetime: number;
	value: number;
}

export interface ITimeSeries {
	name: string;
	data: ITimeSeriesData[];
	dotOnly?: boolean;
	highlight: number;
	rightAxis?: boolean;
	color?: string;
	width?: number;
	areaColor?: string;
	flagLegend?: boolean;
}

export interface IPriceData {
	Date: number;
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

export interface IState {
	ui: IUIState;
}

export interface IUIState {
	eth: ITimeSeriesData[];
	classA: ITimeSeriesData[];
	classB: ITimeSeriesData[];
	resetPrice: ITimeSeriesData[];
	beta: ITimeSeriesData[];
	upward: ITimeSeriesData[];
	downward: ITimeSeriesData[];
	periodic: ITimeSeriesData[];
	trades: string[];
	message: {
		type: string;
		content: string;
		visible: boolean;
	};
	setting: {
		couponRate: number;
		upwardResetLimit: number;
		downwardResetLimit: number;
		periodicResetLimit: number;
	};
	form: {
		type: string;
		visible: boolean;
	};
	mv: ITimeSeriesData[];
	assets: IAssets;
	day: number;
	price: IPriceData;
}
