// import moment from 'moment';
//import * as d3 from 'd3';
import * as React from 'react';
//import contractUtil from '../common/contractUtil';
import { IBalances, ICustodianPrices, ICustodianStates, IPriceBars } from '../../common/types';

function drawGraph(el: Element, dataHourly: IPriceBars, dataMinutely: IPriceBars) {
	console.log(el);
	console.log('************* Hourly **************');
	console.log(dataHourly);
	console.log('************* Minutely **************');
	console.log(dataMinutely);
}

interface IProps {
	account: string;
	refresh: number;
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	hourly: IPriceBars;
	minutely: IPriceBars;
}

export default class D3OHLCChart extends React.Component<IProps> {
	private chartRef: any;
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
	}

	public shouldComponentUpdate(nextProps: IProps) {
		const { hourly, minutely } = nextProps;
		if (
			JSON.stringify(this.props.hourly) !== JSON.stringify(hourly) ||
			JSON.stringify(this.props.minutely) !== JSON.stringify(minutely)
		)
			drawGraph(this.chartRef.current as Element, hourly, minutely);
		return false;
	}

	public render() {
		return <svg className="d3-OHLC-chart" ref={this.chartRef} />;
	}
}
