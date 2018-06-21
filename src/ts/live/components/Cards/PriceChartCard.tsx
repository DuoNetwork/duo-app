import * as React from 'react';
import * as CST from '../../common/constants';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChart';
import CardTitleSelect from '../Common/CardTitleSelect';
import { SCard } from './_styled';

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
}

interface IState {
	source: string;
	timeStep: number;
}

export default class PriceChartCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			source: CST.EXCHANGE_BITFINEX,
			timeStep: 60000 * 5
		};
	}

	private handleSelect = (source: string) => {
		this.setState({ source: source });
	};

	public render() {
		const { hourly, minutely, prices } = this.props;
		const { source, timeStep } = this.state;
		return (
			<SCard
				title={
					<CardTitleSelect name="TIME SERIES" onSelect={this.handleSelect} onlySource />
				}
				width="760px"
				margin="0 10px 0 0"
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<TimeSeriesChart
						hourly={hourly}
						minutely={minutely}
						prices={prices}
						source={source}
						timeStep={timeStep}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
