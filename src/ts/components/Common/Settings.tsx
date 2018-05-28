import { Slider } from 'antd';
import * as d3 from 'd3';
import * as React from 'react';

interface IProps {
	couponRate: number;
	upwardResetLimit: number;
	downwardResetLimit: number;
	periodicResetLimit: number;
	visible: boolean;
	onConfirm: (c: number, u: number, d: number, p: number) => void;
	onCancel: () => void;
}

interface IState {
	couponRateValue: number;
	upwardResetLimitValue: number;
	downwardResetLimitValue: number;
	periodicResetLimitValue: number;
}

export default class Settings extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			couponRateValue: this.props.couponRate,
			upwardResetLimitValue: this.props.upwardResetLimit,
			downwardResetLimitValue: this.props.downwardResetLimit,
			periodicResetLimitValue: (this.props.periodicResetLimit - 1) / this.props.couponRate
		};
	}

	public render() {
		const { couponRate, upwardResetLimit, downwardResetLimit, periodicResetLimit } = this.props;
		const {
			couponRateValue,
			upwardResetLimitValue,
			downwardResetLimitValue,
			periodicResetLimitValue
		} = this.state;
		const prlDayCount = (periodicResetLimit - 1) / couponRate;
		const prlInput = periodicResetLimitValue * couponRateValue + 1;
		let zIndex: number, event: string;
		zIndex = this.props.visible ? 7 : -7;
		event = this.props.visible ? 'auto' : 'none';
		return (
			<div
				className="settings"
				style={{
					opacity: this.props.visible ? 1 : 0,
					zIndex: zIndex,
					pointerEvents: event as any
				}}
			>
				<div
					className="settings-bg"
					style={{
						zIndex: zIndex
					}}
				/>
				<div
					className="settings-card"
					style={{
						zIndex: zIndex + 1
					}}
				>
					<div className="settings-header">
						<div className="settings-title">SETTINGS</div>
					</div>
					<div className="settings-body">
						<div className="settings-content">
							<div className="settings-slider-wrapper">
								<span>
									{'Daily Coupon (' +
										d3.formatPrefix(',.4', 1)(couponRateValue) +
										')'}
								</span>
								<div style={{ width: '150px' }}>
									<Slider
										min={1}
										max={25}
										defaultValue={couponRate * 10000}
										value={couponRateValue * 10000}
										tipFormatter={d => (d as number) / 10000 + ''}
										onChange={d =>
											this.setState({
												couponRateValue: (d as number) / 10000
											})
										}
									/>
								</div>
							</div>
							<div className="settings-slider-wrapper">
								<span>
									{'Upward Reset Limit (' +
										d3.formatPrefix(',.2', 1)(upwardResetLimitValue) +
										')'}
								</span>
								<div style={{ width: '150px' }}>
									<Slider
										min={0}
										max={4}
										defaultValue={(upwardResetLimit - 1.5) * 4}
										value={(upwardResetLimitValue - 1.5) * 4}
										tipFormatter={d => d3.formatPrefix(',.2', 1)(d / 4 + 1.5)}
										onChange={d =>
											this.setState({
												upwardResetLimitValue: (d as number) / 4 + 1.5
											})
										}
									/>
								</div>
							</div>
							<div className="settings-slider-wrapper">
								<span>
									{'Downward Reset Limit (' +
										d3.formatPrefix(',.2', 1)(downwardResetLimitValue) +
										')'}
								</span>
								<div style={{ width: '150px' }}>
									<Slider
										min={0}
										max={8}
										defaultValue={(downwardResetLimit - 0.1) * 20}
										value={(downwardResetLimitValue - 0.1) * 20}
										tipFormatter={d => d3.formatPrefix(',.2', 1)(d / 20 + 0.1)}
										onChange={d =>
											this.setState({
												downwardResetLimitValue: (d as number) / 20 + 0.1
											})
										}
									/>
								</div>
							</div>
							<div className="settings-slider-wrapper">
								<span>
									{'Periodic Reset Days (' +
										d3.formatPrefix(',.0', 1)(periodicResetLimitValue) +
										')'}
								</span>
								<div style={{ width: '150px' }}>
									<Slider
										min={0}
										max={8}
										defaultValue={(prlDayCount - 20) / 10}
										value={(periodicResetLimitValue - 20) / 10}
										tipFormatter={d => d3.formatPrefix(',.0', 1)(d * 10 + 20)}
										onChange={d =>
											this.setState({
												periodicResetLimitValue: (d as number) * 10 + 20
											})
										}
									/>
								</div>
							</div>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<button
									className="default-button"
									onClick={() =>
										this.setState({
											couponRateValue: 0.0002,
											upwardResetLimitValue: 2,
											downwardResetLimitValue: 0.25,
											periodicResetLimitValue: 100
										})
									}
								>
									Default Settings
								</button>
							</div>
						</div>
					</div>
					<div className="settings-bottom">
						<button
							className="settings-button"
							onClick={() =>
								this.props.onConfirm(
									couponRateValue,
									upwardResetLimit,
									downwardResetLimit,
									prlInput
								) && this.props.onCancel()
							}
						>
							COMFIRM
						</button>
						<button className="settings-button" onClick={this.props.onCancel}>
							CANCEL
						</button>
					</div>
				</div>
			</div>
		);
	}
}
