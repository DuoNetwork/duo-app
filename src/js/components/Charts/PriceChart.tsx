// import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPriceProps, IPriceState } from '../../types';
import D3PriceChart from './D3PriceChart';
// const moment = require('moment');

const priceChart = new D3PriceChart();

export default class PriceChart extends React.Component<IPriceProps, IPriceState> {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
	}

	public getChartStates() {
		return {
			name: this.props.name,
			data: this.props.data,
			movedata: this.props.movedata,
			pickedPriceDatum: this.props.pickedPriceDatum
		};
	}

	public updateDimensions() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	}

	public componentDidMount() {
		const el = ReactDOM.findDOMNode(this) as Element;
		priceChart.create(
			el,
			{
				windowWidth: this.state.windowWidth,
				windowHeight: 300
			},
			this.getChartStates()
		);
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	public shouldComponentUpdate(nextProps: IPriceProps, nextState: IPriceState) {
		if (
			nextState.windowHeight !== this.state.windowHeight ||
			nextState.windowWidth !== this.state.windowWidth
		) {
			return false;
		}
		if (
			nextProps.movedata &&
			JSON.stringify(nextProps.movedata) !== JSON.stringify(this.props.movedata)
		) {
			// redraw when data is changed
			const el = ReactDOM.findDOMNode(this) as Element;
			priceChart.create(
				el,
				{
					windowWidth: this.state.windowWidth,
					windowHeight: 300
				},
				{
					name: nextProps.name,
					data: nextProps.data,
					movedata: nextProps.movedata,
					pickedPriceDatum: nextProps.pickedPriceDatum
				}
			);
			return false;
		}
		return false;
	}

	public render() {
		const { name } = this.props;
		return <div id={'trade-chart-' + name} />;
	}
}
