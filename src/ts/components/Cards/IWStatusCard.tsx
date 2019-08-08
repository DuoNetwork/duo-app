// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import * as d3 from 'd3';
import moment from 'moment';
import * as React from 'react';
//import { Link } from 'react-router-dom';
import * as StakingCST from 'ts/common/stakingCST';
import { SCard, SCardTag3, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	boundaries: number[];
	phase: number;
	lastPrice: number;
}
interface IState {
	countdown: string;
}

export default class IWStatusCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			countdown: ''
		};
	}
	private timerID: number = 0;

	private updateCountdown = () => {
		const { phase } = this.props;
		const today = moment.utc().format('YYYY-MM-DD');
		const tommorow = moment
			.utc(today, 'YYYY-MM-DD')
			.add(1, 'days')
			.format('YYYY-MM-DD');
		const checkPoints = [
			0,
			moment.utc(`${today} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf(),
			moment.utc(`${tommorow} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf(),
			moment.utc(`${today} 04:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()
		];
		const now = moment.utc();
		if (phase) {
			const diff = now.diff(checkPoints[phase]);
			this.setState({ countdown: moment.utc(Math.abs(diff)).format('HH:mm:ss') });
		}
	};

	public componentDidMount() {
		this.timerID = window.setInterval(() => this.updateCountdown(), 1000);
	}

	public componentWillUnmount() {
		window.clearInterval(this.timerID);
	}

	public render() {
		const { locale, boundaries, phase, lastPrice } = this.props;
		const { countdown } = this.state;
		return (
			<SCard title={<SCardTitle>Inline Warrant</SCardTitle>} width="420px" margin="0 0 0 0">
				<div style={{ display: 'flex' }}>
					<SCardTag3
						style={{
							pointerEvents: 'none',
							width: '100%',
							height: 'auto'
						}}
					>
						<div className="tag-content">
							<div className={'tag-price USD'} style={{ fontSize: 14 }}>
								{StakingCST.STK_CTSTATUS[locale]}
							</div>
						</div>
						<div className="tag-subtext">
							<div
								style={{
									fontSize: 13,
									fontWeight: 500,
									padding: '0 10px 0 10px',
									color: 'rgba(0,0,0,.6)'
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									ETH Price
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{lastPrice ? d3.format('.2f')(lastPrice) : 'Loading'}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Status
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{StakingCST.PHASE[phase][locale]}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Timer
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{countdown ? countdown : 'Loading'}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Upper Bound
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{'+ ' + d3.format(',.2%')(boundaries[0])}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 4
									}}
								>
									Lower Bound
									<span
										style={{
											color: '#5CA4DE'
										}}
									>
										{'- ' + d3.format(',.2%')(boundaries[1])}
									</span>
								</div>
							</div>
						</div>
					</SCardTag3>
				</div>
			</SCard>
		);
	}
}
