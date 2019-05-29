//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeLot, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import StakingNodeCard from 'ts/components/Cards/StakingNodesCard';
import StakingPersonalCard from 'ts/components/Cards/StakingPersonalCard';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	contractStates: IStakeStates;
	account: string;
	duoBalance: number;
	addresses: IStakeAddress;
	userStakes: { [key: string]: IStakeLot[] };
	oracleStakes: { [key: string]: number };
	userAward: number;
	subscribe: () => any;
}

export default class Staking extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Staking';
	}

	public render() {
		const {
			contractStates,
			account,
			duoBalance,
			addresses,
			userStakes,
			oracleStakes,
			userAward
		} = this.props;
		return (
			<Layout>
				<Header />
				<SContent>
					<StakingPersonalCard
						enabled={contractStates.canStake}
						address={account}
						duoBalance={duoBalance}
						award={userAward}
					/>
					{addresses.priceFeedList.length ? (
						addresses.priceFeedList.map((addr, i) => (
							<StakingNodeCard
								enabled={contractStates.canStake}
								title={'Priceing Node (' + CST.AC_STK_NODES[i] + ')'}
								key={i}
								myDUO={duoBalance}
								myStake={userStakes}
								myAddr={account}
								oracleAddr={addr}
								oracleStakes={oracleStakes}
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
