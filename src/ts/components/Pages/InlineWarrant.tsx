//import { IStatus } from '@finbook/duo-market-data';
// import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
// import queryString from 'query-string';
import * as React from 'react';
import IWOperationCard from 'ts/components/Cards/IWOperationCard';
import IWRecordCard from 'ts/components/Cards/IWRecordsCard';
import IWStatusCard from 'ts/components/Cards/IWStatusCard';
// import * as CST from 'ts/common/constants';
// import * as StakingCST from 'ts/common/stakingCST';
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
	subscribe: () => any;
	refresh: () => any;
}

// interface IState {
// 	visible: boolean;
// 	showed: boolean;
// 	approved: boolean;
// }

export default class InlineWarrant extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Inline Warrant';
	}
	public render() {
		const { locale, address, duoBalance, currentRoundInfo, addressInfo, refresh } = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter horizontal width={'1200px'} marginBottom={'20px'}>
						<TimeSeriesCardIW />
						<IWStatusCard locale={locale} />
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
