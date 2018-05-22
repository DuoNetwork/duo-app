
import * as React from 'react';
//import calculator from '../common/calculator';
import { IAssets, IPriceData, ITimeSeriesData } from '../common/types';
import TransactionCard from '../containers/Cards/TransactionCardContainer';
import Message from '../containers/Common/MessageContainer';
import AssetCard from './Cards/AssetCard';
import PriceCard from './Cards/PriceCard';
import TimeSeriesCard from './Cards/TimeSeriesCard';
import Header from './Header';

interface IProp {
	eth: ITimeSeriesData[];
	classA: ITimeSeriesData[];
	classB: ITimeSeriesData[];
	reset: ITimeSeriesData[];
	mv: ITimeSeriesData[];
	assets: IAssets;
	price: IPriceData;
	dayCount: number;
	upwardResetCount: number;
	downwardResetCount: number;
	periodicResetCount: number;
	refresh: () => void;
	next: () => void;
}

export default class Duo extends React.PureComponent<IProp> {
	public render() {
		const {
			eth,
			classA,
			classB,
			reset,
			mv,
			assets,
			price,
			refresh,
			dayCount,
			upwardResetCount,
			downwardResetCount,
			periodicResetCount,
			next
		} = this.props;
		const timeseries = [
			{
				name: 'ETH',
				data: eth,
				highlight: dayCount,
				color: '255,255,255',
				width: 1.5
			},
			{
				name: 'ClassA',
				data: classA,
				highlight: dayCount + upwardResetCount + downwardResetCount + periodicResetCount,
				rightAxis: true,
				color: '0,186,255'
			},
			{
				name: 'ClassB',
				data: classB,
				highlight: dayCount + upwardResetCount + downwardResetCount,
				rightAxis: true,
				color: '255,129,0'
			},
			{
				name: 'Reset',
				data: reset,
				dotOnly: true,
				highlight: -1,
				rightAxis: true,
				color: 'rgba(214,48,48,0.6)',
				flagLegend: true
			}
		];
		return (
			<div className="App">
				<Message />
				<div style={{ zIndex: 10 }}>
					{/* Next Day, Refresh button */}
					<div className="play-button">
						<button disabled={true} className="day-button settings" />
						<button className="day-button next-day" onClick={next} />
						<button className="day-button refresh" onClick={refresh} />
					</div>
					{/* Navigation Bar */}
					<Header />
					{/* Current Price, Asset Information Bar */}
					<div className="info-bar">
						<div className="info-bar-row">
							<PriceCard
								price={price}
							/>
							<AssetCard
								assets={assets}
								price={price}
							/>
						</div>
					</div>
					{/* D3 Price Chart and Market Value Chart */}
					<div className="d3chart-container">
						<div className="d3chart-row">
							<TimeSeriesCard
								name="pricechart"
								title="Price Chart"
								timeseries={timeseries}
							/>
							<TimeSeriesCard
								name="mvchart"
								title="Market Value Chart"
								timeseries={[
									{
										name: 'MV',
										data: mv,
										highlight: -1,
										color: '255,255,255',
										areaColor: '0, 178, 255',
										width: 1.5
									}
								]}
								showArea
							/>
						</div>
					</div>
					<TransactionCard />
				</div>
			</div>
		);
	}
}
