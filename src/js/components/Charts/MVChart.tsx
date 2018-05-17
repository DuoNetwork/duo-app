// import * as d3 from 'd3';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IMVProps, IMVState } from '../../types';
import D3MVChart from './D3MVChart';
// const moment = require('moment');

const mvChart = new D3MVChart();

export default class MVChart extends React.Component<IMVProps, IMVState> {
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
			pickedMVDatum: this.props.pickedMVDatum
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
		mvChart.create(
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

	public shouldComponentUpdate(nextProps: IMVProps, nextState: IMVState) {
		if (
			nextState.windowHeight !== this.state.windowHeight ||
			nextState.windowWidth !== this.state.windowWidth
		) {
			return false;
		}
		if (nextProps.data) {
			// redraw when data is changed
			const el = ReactDOM.findDOMNode(this) as Element;
			mvChart.create(
				el,
				{
					windowWidth: this.state.windowWidth,
					windowHeight: 300
				},
				{
					name: nextProps.name,
					data: nextProps.data,
					pickedMVDatum: nextProps.pickedMVDatum
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
