import { IPrice } from '@finbook/duo-market-data';
import * as React from 'react';
//import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import TimeSeriesChart from '../Charts/TimeSeriesChartIW';
// import CardTitleSelect from '../Common/CardTitleSelect';
// import RadioExtra from '../Common/RadioExtra';
import { SCard, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	prices: IPrice[];
}

export default class TimeSeriesCard extends React.Component<IProps> {
	public render() {
		const {
			//locale,
			prices
		} = this.props;
		return (
			<SCard title={<SCardTitle>Graph</SCardTitle>} width="760px" margin="0 20px 0 0">
				<SDivFlexCenter horizontal>
					<TimeSeriesChart prices={prices} />
				</SDivFlexCenter>
			</SCard>
		);
	}
}
