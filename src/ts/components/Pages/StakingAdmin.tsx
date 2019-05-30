//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import { csvParse } from 'd3';
import * as React from 'react';
import { stakeWrapper } from 'ts/common/wrappers';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	account: string;
	duoBalance: number;
	addresses: IStakeAddress;
	contractStates: IStakeStates;
	contractDUO: number;
	subscribe: () => any;
}

interface IState {
	addr: string;
	award: string;
	batchArray: { address: string[]; award: number[] };
}
export default class StakingAdmin extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addr: '',
			award: '',
			batchArray: { address: [], award: [] }
		};
	}
	private inputRef = React.createRef<HTMLInputElement>();
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

	private handleFile = (file: any) => {
		const reader = new FileReader();
		console.log(file.name);
		reader.onload = e => {
			const rawData = (e.target as any).result;
			const csvData = csvParse(rawData);
			console.log(csvData);
			const addrList: string[] = [];
			const awardList: number[] = [];
			csvData.forEach(item => {
				addrList.push((item as any).Address);
				awardList.push((item as any).Award);
			});
			this.setState({
				batchArray: { address: addrList, award: awardList }
			});
		};
		reader.readAsText(file, '');
	};

	public render() {
		const { account, contractStates, contractDUO } = this.props;
		const { addr, award, batchArray } = this.state;
		console.log(batchArray);
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
						<div>
							Contract DUO Amount: <b>{contractDUO}</b>
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
							marginBottom: 20,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<b
							style={{
								fontSize: 18,
								marginBottom: 15
							}}
						>
							Single Add Award
						</b>
						<input
							placeholder="address"
							style={{
								width: '100%',
								marginBottom: 10,
								paddingLeft: 5
							}}
							value={addr}
							onChange={e => this.handleAddr(e.target.value)}
						/>
						<input
							placeholder="award amount"
							style={{
								width: '100%',
								marginBottom: 10,
								paddingLeft: 5
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
					<div
						style={{
							width: 400,
							padding: 10,
							border: '1px dashed rgba(0,0,0,.3)',
							borderRadius: 4,
							marginBottom: 20,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<b
							style={{
								fontSize: 18,
								marginBottom: 15
							}}
						>
							Batch Add Award
						</b>
						<input
							placeholder="imput csv"
							style={{
								width: '100%',
								marginBottom: 10
							}}
							type="file"
							ref={this.inputRef}
							onChange={e => this.handleFile((e.target.files as any)[0])}
						/>
						<button
							onClick={() =>
								batchArray.address.length > 20
									? window.alert('CSV file must not exceed 20 rows')
									: stakeWrapper.batchAddAward(
											account,
											batchArray.address,
											batchArray.award,
											{
												gasLimit: 1000000
											}
									)
							}
						>
							Batch Add Award
						</button>
					</div>
					<div
						style={{
							width: 400,
							padding: 10,
							border: '1px dashed rgba(0,0,0,.3)',
							borderRadius: 4,
							marginBottom: 20,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						{batchArray.address.length ? (
							<table style={{ width: '100%' }}>
								<thead>
									<tr>
										<th style={{ width: 30 }}>Id</th>
										<th>Address</th>
										<th style={{ textAlign: 'right' }}>Award</th>
									</tr>
								</thead>
								<tbody>
									{batchArray.address.map((item, i) => (
										<tr key={i}>
											<td style={{ width: 30 }}>{i + 1}</td>
											<td style={{ fontSize: 11 }}>{item}</td>
											<td style={{ textAlign: 'right' }}>
												{batchArray.award[i]}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							'CSV Preview'
						)}
					</div>
				</SContent>
			</Layout>
		);
	}
}
