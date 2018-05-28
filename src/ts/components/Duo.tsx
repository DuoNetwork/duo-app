import * as React from 'react';
//import calculator from '../common/calculator';
import { IAssets, IPriceData, ITimeSeriesData } from '../common/types';
import TransactionCard from '../containers/Cards/TransactionCardContainer';
import Message from '../containers/Common/MessageContainer';
import AssetCard from './Cards/AssetCard';
import PriceCard from './Cards/PriceCard';
import TimeSeriesCard from './Cards/TimeSeriesCard';
import Settings from './Common/Settings';
import Header from './Header';

interface IProps {
	eth: ITimeSeriesData[];
	classA: ITimeSeriesData[];
	classB: ITimeSeriesData[];
	upward: ITimeSeriesData[];
	downward: ITimeSeriesData[];
	periodic: ITimeSeriesData[];
	resetPrice: ITimeSeriesData[];
	mv: ITimeSeriesData[];
	assets: IAssets;
	price: IPriceData;
	dayCount: number;
	couponRate: number;
	upwardResetLimit: number;
	downwardResetLimit: number;
	periodicResetLimit: number;
	refresh: () => void;
	next: () => void;
	forward: () => void;
	setting: (c: number, u: number, d: number, p: number) => void;
}

interface IState {
	visible: boolean;
}

export default class Duo extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visible: false
		};
	}

	public toggleSetting = () => this.setState({ visible: !this.state.visible });

	public render() {
		const {
			eth,
			classA,
			classB,
			upward,
			downward,
			periodic,
			resetPrice,
			mv,
			assets,
			price,
			refresh,
			dayCount,
			next,
			forward,
			setting,
			couponRate,
			upwardResetLimit,
			downwardResetLimit,
			periodicResetLimit
		} = this.props;
		const datetime = eth[dayCount].datetime;
		const upwardCount = upward.filter(d => d.datetime <= datetime).length;
		const downwardCount = downward.filter(d => d.datetime <= datetime).length;
		const periodicCount = periodic.filter(d => d.datetime <= datetime).length;
		const allResets = [...upward, ...downward, ...periodic];
		allResets.sort((a, b) => a.datetime - b.datetime);
		const nextReset = allResets.find(d => d.datetime > datetime);
		const start = resetPrice[dayCount].datetime;
		const end = nextReset ? nextReset.datetime : eth[eth.length - 1].datetime;
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
				highlight: dayCount + upwardCount + downwardCount + periodicCount,
				rightAxis: true,
				color: '0,186,255'
			},
			{
				name: 'ClassB',
				data: classB,
				highlight: dayCount + upwardCount + downwardCount,
				rightAxis: true,
				color: '255,129,0'
			},
			{
				name: 'Reset',
				data: allResets,
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
				<Settings
					visible={this.state.visible}
					onCancel={this.toggleSetting}
					onConfirm={setting}
					couponRate={couponRate}
					upwardResetLimit={upwardResetLimit}
					downwardResetLimit={downwardResetLimit}
					periodicResetLimit={periodicResetLimit}
				/>
				<div style={{ zIndex: 10 }}>
					{/* Next Day, Refresh button */}
					<div className="play-button">
						<button className="day-button settings" onClick={this.toggleSetting} />
						<button className="day-button next-day" onClick={next} />
						<button className="day-button forward" onClick={forward} />
						<button className="day-button refresh" onClick={refresh} />
					</div>
					{/* Navigation Bar */}
					<Header />
					{/* Current Price, Asset Information Bar */}
					<div className="info-bar">
						<div className="info-bar-row">
							<PriceCard price={price} />
							<AssetCard assets={assets} price={price} />
						</div>
					</div>
					{/* D3 Price Chart and Market Value Chart */}
					<div className="d3chart-container">
						<div className="d3chart-row">
							<TimeSeriesCard
								name="pricechart"
								title="Price Chart"
								timeseries={timeseries}
								start={start}
								end={end}
								datetime={datetime}
								zoomable
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
								datetime={datetime}
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
