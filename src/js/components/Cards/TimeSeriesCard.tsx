//import * as d3 from 'd3';
import { findLast } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { ITimeSeries, ITimeSeriesData } from '../../types';
import TimeSeriesChart from '../Charts/TimeSeriesChart';

interface IProp {
	name: string;
	title: string;
	timeseries: ITimeSeries[];
	showArea?: boolean;
}

interface IState {
	datetime: number;
}

export default class TimeSeriesCard extends React.PureComponent<IProp, IState> {
	constructor(props) {
		super(props);
		this.state = {
			datetime: 0
		};
	}

	private handleMouseMove = (datetime: number) => {
		this.setState({
			datetime: datetime
		});
	};

	public render() {
		const { datetime } = this.state;
		const { name, title, timeseries, showArea } = this.props;
		const values = timeseries.map(ts => {
			if (!datetime || !ts.data.length) return null;
			const foundItem = findLast(
				ts.data,
				item => (item as ITimeSeriesData).datetime === datetime
			);
			return foundItem ? foundItem.value : null;
		});
		return (
			<div className="d3chart-wrapper">
				<h3>{title}</h3>
				<div style={{ color: 'white' }}>
					<span>{'Date: ' + (datetime ? moment(datetime).format('YYYY-MM-DD') : '')}</span>
					{values.map(
						(v, i) =>
							v ? (
								<span key={timeseries[i].name}>{timeseries[i].name + ': ' + v}</span>
							) : null
					)}
				</div>
				<TimeSeriesChart
					name={name}
					timeseries={timeseries}
					onMouseMove={this.handleMouseMove}
					showArea={showArea}
				/>
			</div>
		);
	}
}
