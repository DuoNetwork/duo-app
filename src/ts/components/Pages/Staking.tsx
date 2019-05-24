//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeLot } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import StakingNodeCard from 'ts/components/Cards/StakingNodesCard';
import StakingPersonalCard from 'ts/components/Cards/StakingPersonalCard';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	account: string;
	duoBalance: number;
	addresses: IStakeAddress;
	userStakes: { [key: string]: IStakeLot[] };
	oracleStakes: { [key: string]: number };
	subscribe: () => any;
}

export default class Staking extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Staking';
	}

	public render() {
		const { account, duoBalance, addresses, userStakes } = this.props;
		console.log(addresses);
		console.log(addresses.priceFeedList);
		console.log("********userStakes");
		console.log(userStakes);
		return (
			<Layout>
				<Header />
				<SContent>
					<StakingPersonalCard address={account} duoBalance={duoBalance} />
					{addresses.priceFeedList.length ? (
						addresses.priceFeedList.map((addr, i) => (
							<StakingNodeCard
								title={'Staking Node ' + (i + 1)}
								key={i}
								poolSize={0}
								estReturn={0}
								myDUO={duoBalance}
								myStake={userStakes}
								myAddr={account}
								oracleAddr={addr}
							/>
						))
					) : (
						<div
							style={{
								width: 960,
								height: 150,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								fontSize: 16,
								color: 'rgba(0,0,0,.6)'
							}}
						>
							Loading Nodes...
						</div>
					)}
				</SContent>
			</Layout>
		);
	}
}
