//import { IStatus } from '@finbook/duo-market-data';
import { Layout } from 'antd';
import * as React from 'react';
import StakingNodeCard from 'ts/components/Cards/StakingNodesCard';
import StakingPersonalCard from 'ts/components/Cards/StakingPersonalCard';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

// interface IProps {}

export default class Staking extends React.Component<{}> {
	public componentDidMount() {
		document.title = 'DUO | Staking';
	}

	public render() {
		return (
			<Layout>
				<Header />
				<SContent>
					<StakingPersonalCard address={'0x5731D623518090e0f02429286D4210fD9378bEcc'} duoBalance={45768}/>
					<StakingNodeCard title={'Staking Node 1'} poolSize={142189} estReturn={0.494} myStake={6150} />
					<StakingNodeCard title={'Staking Node 2'} poolSize={132120} estReturn={0.518} myStake={0} />
					<StakingNodeCard title={'Staking Node 3'} poolSize={168270} estReturn={0.453} myStake={2000} />
				</SContent>
			</Layout>
		);
	}
}
