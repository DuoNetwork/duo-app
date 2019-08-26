// import {
// 	Constants as WrapperConstants,
// 	ICustodianAddresses,
// 	IDualClassStates
// } from '@finbook/duo-contract-wrapper';
//import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Divider } from 'antd';
import * as d3 from 'd3';
import duo3d from 'images/duo-3d.png';
import ethIcon from 'images/ethIconBg.png';
import moment from 'moment';
import * as React from 'react';
//import { Link } from 'react-router-dom';
import * as StakingCST from 'ts/common/stakingCST';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	boundaries: number[];
	phase: number;
	lastPrice: number;
	settlePrice: number;
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
		const { locale, boundaries, phase, lastPrice, settlePrice } = this.props;
		const { countdown } = this.state;
		return (
			<SCard title={<SCardTitle>Inline Warrant</SCardTitle>} width="420px" margin="0 0 0 0">
				<img
					src={ethIcon}
					style={{
						position: 'absolute',
						width: 124,
						height: 62,
						top: 52,
						right: 126,
						opacity: 0.07
					}}
				/>
				<img
					src={duo3d}
					style={{
						position: 'absolute',
						width: 180,
						height: 77,
						bottom: 30,
						right: 110,
						opacity: 1
					}}
				/>
				<div
					style={{
						width: '100%',
						textAlign: 'center',
						marginTop: 20,
						fontSize: 22,
						fontWeight: 500,
						color: 'rgba(64,79,84,.8)'
					}}
				>
					ETH/USD
				</div>
				<Divider dashed />
				<SDivFlexCenter
					horizontal
					padding={'0 30px'}
					marginTop="-12px"
					marginBottom="-12px"
					style={{
						alignItems: 'center'
					}}
				>
					<div
						style={{
							padding: '5px 10px',
							fontSize: 40,
							fontWeight: 500,
							color: '#5CA4DE',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						{lastPrice ? d3.format('.2f')(lastPrice) : '-'}
					</div>
					<div
						style={{
							padding: '5px 10px'
						}}
					>
						<div
							style={{
								fontSize: 12,
								color: 'rgba(64,79,84,.8)'
							}}
						>
							{phase === 1 || phase === 2 ? `${StakingCST.STK_VOLATILITY[locale]} ≤` : StakingCST.STK_SETTLE[locale]}
						</div>
						<div
							style={{
								fontSize: 20,
								fontWeight: 500,
								color: '#5CA4DE'
							}}
						>
							{phase === 1 || phase === 2 ? `± ${d3.format(',.2%')(boundaries[0])}` : settlePrice === 0 ? 'Loading' : d3.format('.2f')(settlePrice)}
						</div>
					</div>
				</SDivFlexCenter>
				<Divider dashed />
				<SDivFlexCenter
					horizontal
					padding={'0 30px'}
					marginTop="-12px"
					marginBottom="-12px"
				>
					<div
						style={{
							padding: '5px 10px',
							fontSize: 16,
							fontWeight: 500,
							color: '#5CA4DE',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						{StakingCST.PHASE[phase][locale]}
					</div>
					<div
						style={{
							padding: '5px 5px',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<span style={{ fontSize: 10, color: 'rgba(64,79,84,.8)' }}>
							{StakingCST.STK_TIMELEFT[locale]}
						</span>
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								marginLeft: 10,
								fontWeight: 500,
								fontSize: 16,
								color: '#5CA4DE'
							}}
						>
							{countdown ? countdown : 'Loading'}
						</span>
					</div>
				</SDivFlexCenter>
				<Divider dashed />
			</SCard>
		);
	}
}
