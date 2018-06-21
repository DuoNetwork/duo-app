import * as React from 'react';
import * as CST from '../../common/constants';
import { IAcceptedPrice, IPriceBar, ISourceData } from '../../common/types';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChart';
import CardTitleSelect from '../Common/CardTitleSelect';
import RadioExtra from '../Common/RadioExtra';
import { SCard } from './_styled';

interface IProps {
	hourly: ISourceData<IPriceBar[]>;
	minutely: ISourceData<IPriceBar[]>;
	prices: IAcceptedPrice[];
}

interface IState {
	source: string;
	isHourly: boolean;
}

export default class TimeSeriesCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			source: CST.EXCHANGE_BITFINEX.toLowerCase(),
			isHourly: true
		};
	}

	private handleSelect = (source: string) => this.setState({ source: source });

	private handleIntervalToggle = () => this.setState({ isHourly: !this.state.isHourly });

	public render() {
		const { hourly, minutely, prices } = this.props;
		const { source, isHourly } = this.state;
		return (
			<SCard
				title={
					<CardTitleSelect
						name={CST.TH_TIMESERIES.toUpperCase()}
						onSelect={this.handleSelect}
						onlySource
					/>
				}
				width="760px"
				margin="0 10px 0 0"
				extra={
					<RadioExtra
						left={CST.TH_5M}
						right={CST.TH_1H}
						isLeft={!isHourly}
						onChange={this.handleIntervalToggle}
						rightPadding
					/>
				}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<TimeSeriesChart
						sourceData={isHourly ? hourly : minutely}
						prices={prices}
						source={source}
						timeStep={isHourly ? 3600000 : 300000}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
