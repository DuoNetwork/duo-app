import * as React from 'react';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChart';
import CardTitleDropdown from '../Common/CardTitleDropdown';
import { SCard } from './_styled';

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
}

interface IState {
	keys: string[];
	timeStep: number;
}

export default class PriceChartCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			keys: [],
			timeStep: 60000 * 60
		};
	}

	private handlePickSource = (key: string) => {
		this.setState({ keys: [key] });
	};

	public render() {
		const { hourly, minutely, prices } = this.props;
		const { keys, timeStep } = this.state;
		return (
			<SCard
				title={
					<CardTitleDropdown
						name="TIME SERIES"
						keys={keys}
						handlePickSource={this.handlePickSource}
					/>
				}
				width="760px"
				margin="0 10px 0 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<TimeSeriesChart
						hourly={hourly}
						minutely={minutely}
						prices={prices}
						keys={keys}
						handlePickSource={this.handlePickSource}
						timeStep={timeStep}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
