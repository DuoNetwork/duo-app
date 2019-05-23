//import { IStatus } from '@finbook/duo-market-data';
import { Layout } from 'antd';
import * as React from 'react';
import StakingNodeCard from 'ts/components/Cards/StakingNodesCard';
import StakingPersonalCard from 'ts/components/Cards/StakingPersonalCard';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	account: string;
	duoBalance: number
}

export default class Staking extends React.Component<IProps> {
	public componentDidMount() {
		document.title = 'DUO | Staking';
	}

	public render() {
		const {account, duoBalance} = this.props
		return (
			<Layout>
				<Header />
				<SContent>
					<StakingPersonalCard address={account} duoBalance={duoBalance}/>
					<StakingNodeCard title={'Staking Node 1'} poolSize={142189} estReturn={0.494} myStake={6150} />
					<StakingNodeCard title={'Staking Node 2'} poolSize={132120} estReturn={0.518} myStake={0} />
					<StakingNodeCard title={'Staking Node 3'} poolSize={168270} estReturn={0.453} myStake={2000} />
				</SContent>
			</Layout>
		);
	}
}
