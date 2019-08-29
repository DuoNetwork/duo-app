//import { IStatus } from '@finbook/duo-market-data';
// import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
import { IStakeV2States } from '@finbook/duo-contract-wrapper';
import { IAcceptedPrice, IPrice } from '@finbook/duo-market-data';
import { Button, Layout, Modal } from 'antd';
import moment from 'moment';
// import queryString from 'query-string';
import * as React from 'react';
// import * as CST from 'ts/common/constants';
import * as StakingCST from 'ts/common/stakingCST';
import { web3Wrapper } from 'ts/common/wrappers';
import IWOperationCardM from 'ts/components/Cards/IWOperationCardM';
import IWRecordCardM from 'ts/components/Cards/IWRecordsCardM';
import IWStatusCardM from 'ts/components/Cards/IWStatusCardM';
import { SContent } from '../_styled';
interface IProps {
	locale: string;
	contractStates: IStakeV2States;
	duoBalance: number;
	allowance: number;
	userAward: number;
	prices: IPrice[];
	acceptedPrices: IAcceptedPrice[];
	address: string;
	currentRoundInfo: any;
	addressInfo: any;
	boundaries: number[];
	lastPrice: number;
	subscribe: () => any;
	unsubscribe: () => any;
	subscribeMagi: () => any;
	unsubscribeMagi: () => any;
	refresh: () => any;
}

interface IState {
	phase: number;
	visible: boolean;
	showed: boolean;
	approved: boolean;
	timecheck: boolean;
}

export default class InlineWarrant extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			phase: 0,
			visible: false,
			showed: false,
			approved: false,
			timecheck: true
		};
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		const { allowance } = nextProps;
		if (allowance === 0 && !prevState.showed)
			return {
				visible: true,
				approved: false,
				showed: true
			};
		else if (allowance > 0)
			return {
				approved: true,
				visible: false
			};
		else
			return {
				approved: false
			};
	}

	public componentDidMount() {
		this.props.subscribe();
		this.props.subscribeMagi();
		this.checkPhase();
		this.intervalID = window.setInterval(() => this.checkPhase(), 10000);
		document.title = 'DUO | Inline Warrant';
	}

	public componentWillUnmount() {
		window.clearInterval(this.intervalID);
		this.props.unsubscribe();
		this.props.unsubscribeMagi();
	}

	private handleCancel = () => {
		this.setState({ visible: false });
	};

	private handleApprove = async () => {
		const { address } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			address,
			web3Wrapper.contractAddresses.StakesV2[0].address,
			0,
			true
		);
		this.setState({ visible: false });
		console.log('Transaction submit: ' + txHash);
	};

	private intervalID: number = 0;

	private checkPhase = () => {
		const nowUTC = moment.utc();
		const timeSpot = [
			moment.utc('00:00:00', 'HH:mm:ss'),
			moment.utc('04:00:00', 'HH:mm:ss'),
			moment.utc('12:00:00', 'HH:mm:ss')
		];
		let newPhase = 0;
		if (nowUTC.isBetween(timeSpot[0], timeSpot[1])) {
			newPhase = 3;
		} else if (nowUTC.isBetween(timeSpot[1], timeSpot[2])) {
			newPhase = 1;
		} else {
			newPhase = 2;
		}
		if (this.state.phase !== newPhase) this.setState({ phase: newPhase });
	};

	public render() {
		const {
			locale,
			contractStates,
			address,
			duoBalance,
			userAward,
			currentRoundInfo,
			addressInfo,
			refresh,
			boundaries,
			lastPrice,
			acceptedPrices
		} = this.props;
		const { phase, visible, approved, timecheck } = this.state;
		const today = moment.utc().format('YYYY-MM-DD');
		const yesterday = moment
			.utc(today, 'YYYY-MM-DD')
			.subtract(1, 'days')
			.format('YYYY-MM-DD');
		const settleTime = moment.utc('00:00:00', 'HH:mm:ss').valueOf();
		const obTime = phase === 2 ? moment.utc('12:00:00', 'HH:mm:ss').valueOf() : moment.utc(`${yesterday} 12:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf();
		const settltPrice = acceptedPrices.filter(px => px.timestamp <= settleTime);
		const obPrice = acceptedPrices.filter(px => px.timestamp <= obTime);
		if (timecheck && boundaries[0] === -102 && boundaries[1] === -103) this.setState({timecheck: false})
		return (
			<Layout>
				<Modal
					visible={visible}
					title={StakingCST.STK_REMIUNDER[locale]}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
					footer={[
						<Button key="ok" type="primary" onClick={this.handleApprove}>
							{StakingCST.STK_OK[locale]}
						</Button>
					]}
				>
					<p>{StakingCST.STK_REMIUNDERTEST[locale]}</p>
				</Modal>
				<Modal
					visible={!timecheck}
					title={StakingCST.STK_REMIUNDER[locale]}
					footer={[]}
				>
					<p>{StakingCST.STK_SYSTIMEERROR[locale]}</p>
				</Modal>
				<SContent>
					<IWStatusCardM
						locale={locale}
						boundaries={boundaries}
						phase={phase}
						lastPrice={lastPrice}
						settlePrice={settltPrice.length ? settltPrice[0].price : 0}
						obPrice={obPrice.length ? obPrice[0].price : 0}
					/>
					<IWOperationCardM
						address={address}
						locale={locale}
						duoBalance={duoBalance}
						award={userAward}
						enableApprove={!approved}
						enabled={contractStates.stakingEnabled}
						refresh={refresh}
						phase={phase}
					/>
					<IWRecordCardM
						address={address}
						locale={locale}
						currentRoundInfo={currentRoundInfo}
						addressInfo={addressInfo}
						refresh={refresh}
					/>
				</SContent>
			</Layout>
		);
	}
}
