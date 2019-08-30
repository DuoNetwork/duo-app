import { IPrice } from '@finbook/duo-market-data';
import * as React from 'react';
import * as StakingCST from 'ts/common/stakingCST';
//import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChartIW';
// import CardTitleSelect from '../Common/CardTitleSelect';
// import RadioExtra from '../Common/RadioExtra';
import { SCard, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	prices: IPrice[];
	phase: number;
	boundaries: number[];
	obPrice: number;
}

export default class TimeSeriesCard extends React.Component<IProps> {
	public render() {
		const { locale, prices, phase, boundaries, obPrice } = this.props;
		return (
			<SCard
				title={<SCardTitle>{StakingCST.STK_GRAPH[locale]}</SCardTitle>}
				width="700px"
				margin="0 20px 0 0"
			>
				<SDivFlexCenter horizontal>
					<TimeSeriesChart
						prices={prices}
						phase={phase}
						locale={locale}
						boundaries={boundaries}
						obPrice={obPrice}
					/>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
