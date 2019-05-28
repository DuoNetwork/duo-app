//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import * as React from 'react';
import { stakeWrapper } from 'ts/common/wrappers';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	account: string;
	duoBalance: number;
	addresses: IStakeAddress;
	contractStates: IStakeStates;
	subscribe: () => any;
}

interface IState {
	addr: string;
	award: string;
}
export default class Staking extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addr: '',
			award: ''
		};
	}
	public componentDidMount() {
		this.props.subscribe();
		document.title = 'DUO | Staking Admin';
	}

	private handleStake = async (operator: boolean) => {
		const { account } = this.props;
		const txHash = operator
			? await stakeWrapper.enableStakingAndUnstaking(account, { gasLimit: 100000 })
			: await stakeWrapper.disableStakingAndUnstaking(account, { gasLimit: 1000000 });
		console.log(txHash);
	};

	private handleAddr = (addr: string) => {
		this.setState({
			addr: addr
		});
	};
	private handleAward = (award: string) => {
		this.setState({
			award: award
		});
	};

	public render() {
		const { account, contractStates } = this.props;
		const { addr, award } = this.state;
		return (
			<Layout>
				<Header />
				<SContent>
					<div
						style={{
							width: 400,
							padding: 20,
							border: '1px dashed rgba(0,0,0,.3)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							borderRadius: 4,
							marginBottom: 20
						}}
					>
						<b
							style={{
								fontSize: 18,
								marginBottom: 15
							}}
						>
							Contract States
						</b>
						<div>
							Can Stake: <b>{contractStates.canStake.toString()}</b>
						</div>
						<div>
							Can Unstake: <b>{contractStates.canUnstake.toString()}</b>
						</div>
						<div>
							LockMinTimeInSecond: <b>{contractStates.lockMinTimeInSecond}</b>
						</div>
						<div>
							MinStakeAmt: <b>{contractStates.minStakeAmt}</b>
						</div>
						<div>
							MaxStakePerPf: <b>{contractStates.maxStakePerOracle}</b>
						</div>
						<div>
							TotalAwardsToDistribute: <b>{contractStates.totalAwardsToDistribute}</b>
						</div>
					</div>
					<div
						style={{
							width: 400,
							padding: 10,
							border: '1px dashed rgba(0,0,0,.3)',
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							borderRadius: 4,
							marginBottom: 20
						}}
					>
						<button onClick={() => this.handleStake(true)}>Enable Stake/Unstake</button>
						<button onClick={() => this.handleStake(false)}>
							Disable Stake/Unstake
						</button>
					</div>
					<div
						style={{
							width: 400,
							padding: 10,
							border: '1px dashed rgba(0,0,0,.3)',
							borderRadius: 4,
							marginBottom: 20
						}}
					>
						<input
							placeholder="address"
							style={{
								width: '100%',
								marginBottom: 10
							}}
							value={addr}
							onChange={e => this.handleAddr(e.target.value)}
						/>
						<input
							placeholder="award amount"
							style={{
								width: '100%',
								marginBottom: 10
							}}
							value={award}
							onChange={e => this.handleAward(e.target.value)}
						/>
						<button
							onClick={() =>
								stakeWrapper.batchAddAward(account, [addr], [parseInt(award, 0)], {
									gasLimit: 1000000
								})
							}
						>
							Update Award
						</button>
					</div>
				</SContent>
			</Layout>
		);
	}
}
