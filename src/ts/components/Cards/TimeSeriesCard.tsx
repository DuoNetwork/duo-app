import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IAcceptedPrice, IPrice } from 'ts/common/types';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChart';
import CardTitleSelect from '../Common/CardTitleSelect';
import RadioExtra from '../Common/RadioExtra';
import { SCard } from './_styled';

interface IProps {
	locale: string;
	prices: IPrice[];
	source: string;
	period: number;
	acceptedPrices: IAcceptedPrice[];
	handleSourceUpdate: (src: string) => any;
	handlePeriodUpdate: (period: number) => any;
}

export default class TimeSeriesCard extends React.Component<IProps> {
		public render() {
		const { locale, acceptedPrices, prices, period, source, handleSourceUpdate, handlePeriodUpdate } = this.props;
		return (
			<SCard
				title={
					<CardTitleSelect
						name={CST.TH_CHART[locale].toUpperCase()}
						source={source}
						onSelect={handleSourceUpdate}
						onlySource
					/>
				}
				width="760px"
				margin="0 10px 0 0"
				extra={
					<RadioExtra
						left={CST.TH_5M}
						right={CST.TH_1H}
						isLeft={period !== 60}
						onChange={() => handlePeriodUpdate(period === 60 ? 5 : 60)}
						rightPadding
					/>
				}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<TimeSeriesChart
						acceptedPrices={acceptedPrices}
						prices={prices}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}