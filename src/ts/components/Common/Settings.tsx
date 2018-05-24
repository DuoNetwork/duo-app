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
	couponRateIn: string;
	upwardResetLimitIn: string;
	downwardResetLimitIn: string;
	periodicResetLimitIn: string;
}

export default class Settings extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			couponRateValue: 1,
			upwardResetLimitValue: 1,
			downwardResetLimitValue: 1,
			periodicResetLimitValue: 1,
			couponRateIn: '',
			upwardResetLimitIn: '',
			downwardResetLimitIn: '',
			periodicResetLimitIn: ''
		};
	}

	public render() {
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
							<Slider
								min={1}
								max={50}
								defaultValue={0}
								tipFormatter={d => (d as number) / 10000 + ''}
							/>
							<Slider min={0} max={4} defaultValue={0} tipFormatter={d => d3.formatPrefix(',.2', 1)(d / 4 + 1.5)}/>
							<Slider min={0} max={4} defaultValue={0} tipFormatter={d => d3.formatPrefix(',.2', 1)(d / 10 + 0.1)}/>
							<Slider min={0} max={8} defaultValue={0} tipFormatter={d => d3.formatPrefix(',.2', 1)(d * 10 + 20)}/>
						</div>
					</div>
					<div className="settings-bottom">
						<button
							className="settings-button"
							onClick={() =>
								this.props.onConfirm(0.0005, 1.5, 0.5, 1.05) &&
								this.props.onCancel()
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
