//import { IStatus } from '@finbook/duo-market-data';
// import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
import { IAcceptedPrice } from '@finbook/duo-market-data';
import { Layout } from 'antd';
import moment from 'moment';
// import queryString from 'query-string';
import * as React from 'react';
// import * as CST from 'ts/common/constants';
//import * as StakingCST from 'ts/common/stakingCST';
import IWOperationCard from 'ts/components/Cards/IWOperationCard';
import IWRecordCard from 'ts/components/Cards/IWRecordsCard';
import IWStatusCard from 'ts/components/Cards/IWStatusCard';
// import { web3Wrapper } from 'ts/common/wrappers';
// import StakingBannerCard from 'ts/components/Cards/StakingBannerCard';
// import StakingInfoCard from 'ts/components/Cards/StakingInfoCard';
// import StakingNodeCard from 'ts/components/Cards/StakingNodesCard';
// import StakingPersonalCard from 'ts/components/Cards/StakingPersonalCard';
import TimeSeriesCardIW from 'ts/containers/Cards/TimeSeriesCardContainerIW';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
interface IProps {
	locale: string;
	address: string;
	duoBalance: number;
	currentRoundInfo: any;
	addressInfo: any;
	boundaries: number[];
	acceptedPrices: IAcceptedPrice;
	lastPrice: number;
	subscribe: () => any;
	refresh: () => any;
}

interface IState {
	phase: number;
}

export default class InlineWarrant extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			phase: 0
		};
	}
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

	public componentDidMount() {
		this.props.subscribe();
		this.checkPhase();
		this.intervalID = window.setInterval(() => this.checkPhase(), 10000);
		document.title = 'DUO | Inline Warrant';
	}

	public componentWillUnmount() {
		window.clearInterval(this.intervalID);
	}

	public render() {
		const {
			locale,
			address,
			duoBalance,
			currentRoundInfo,
			addressInfo,
			refresh,
			boundaries,
			lastPrice
		} = this.props;
		const { phase } = this.state;
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter horizontal width={'1200px'} marginBottom={'20px'}>
						<TimeSeriesCardIW phase={phase} boundaries={boundaries} />
						<IWStatusCard
							locale={locale}
							boundaries={boundaries}
							phase={phase}
							lastPrice={lastPrice}
						/>
					</SDivFlexCenter>
					<SDivFlexCenter horizontal width={'1200px'} marginBottom={'20px'}>
						<IWRecordCard
							address={address}
							locale={locale}
							currentRoundInfo={currentRoundInfo}
							addressInfo={addressInfo}
							refresh={refresh}
						/>
						<IWOperationCard
							address={address}
							locale={locale}
							duoBalance={duoBalance}
							refresh={refresh}
						/>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
