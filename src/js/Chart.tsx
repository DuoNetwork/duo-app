import * as React from "react";
import * as ReactDOM from "react-dom";
import * as d3 from "d3";
import {d3PriceChart} from "./D3Chart";
let moment = require("moment");

const priceChart = new d3PriceChart;

export type IPriceData = Array<IPriceDatum>;

export type IPriceDatum = {
	date: string;
	ETH: number;
	ClassA: number;
	ClassB: number;
	ClassAbeforeReset? : number;
	ClassBbeforeReset? : number;
	ResetType? : string;
	InterestCount: number;
};

export type IMVData = Array<IMVDatum>;

export type IMVDatum = {
	date: string;
	MV: number;
}

type ILine = {
	x: number;
	y: number;
};

interface IPriceProps {
	name: string;
	data: IPriceData;
	pickedPriceDatum: (d: IPriceDatum) => void;
}

interface IPriceState {
	windowWidth: number;
	windowHeight: number;
}

export class PriceChart extends React.Component<IPriceProps, IPriceState> {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		};
	}

    getChartStates() {
        return {
            name: this.props.name,
            data: this.props.data,
            pickedPriceDatum: this.props.pickedPriceDatum
        }
    }
    
	updateDimensions() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	}

	componentDidMount() {
        const el = ReactDOM.findDOMNode(this) as Element; 
		priceChart.create(el, {
            windowWidth: this.state.windowWidth,
            windowHeight: 400
        }, this.getChartStates());
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}

	shouldComponentUpdate(nextProps: IPriceProps, nextState: IPriceState) {
		if (nextState.windowHeight !== this.state.windowHeight || nextState.windowWidth !== this.state.windowWidth) {
			return false;
		}
		if (nextProps.data && JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
			//redraw when data is changed
			const el = ReactDOM.findDOMNode(this) as Element; 
			priceChart.create(el, {
				windowWidth: this.state.windowWidth,
				windowHeight: 400
			}, {
				name: nextProps.name,
				data: nextProps.data,
				pickedPriceDatum: nextProps.pickedPriceDatum
			});
			return false;
		}
		return false;
	}

	render() {
		const {name} = this.props;
		return <div id={"trade-chart-" + name} />;
	}
}
