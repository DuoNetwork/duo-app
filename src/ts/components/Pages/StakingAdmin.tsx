//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeStates } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import { csvParse } from 'd3';
import * as React from 'react';
import { stakeWrappers} from 'ts/common/wrappers';
import Header from 'ts/containers/HeaderContainer';
import { SContent } from '../_styled';

interface IProps {
	account: string;
	duoBalance: number;
	addresses: IStakeAddress[];
	contractStates: IStakeStates[];
	contractDUO: number[];
	gasPrice: number;
	subscribe: (index: number) => any;
}

interface IState {
	addr: string;
	award: string;
	batchArray: { address: string[]; award: number[] };
	x2Check: boolean;
	x3Check: boolean;
	contractIndex: number;
}
export default class StakingAdmin extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addr: '',
			award: '',
			batchArray: { address: [], award: [] },
			x2Check: false,
			x3Check: false,
			contractIndex: 0
		};
	}
	private inputRef = React.createRef<HTMLInputElement>();
	public componentDidMount() {
		this.props.subscribe(0);
		this.props.subscribe(1);
		document.title = 'DUO | Staking Admin';
	}

	private handleStake = async (operator: boolean) => {
		const { account, gasPrice } = this.props;
		const { contractIndex, x2Check, x3Check } = this.state;
		const gasPriceEdit = x2Check ? gasPrice * 2 : x3Check ? gasPrice * 3 : gasPrice;
		const txHash = operator
			? await stakeWrappers[contractIndex].enableStakingAndUnstaking(account, {
					gasLimit: 100000,
					gasPrice: gasPriceEdit
			})
			: await stakeWrappers[contractIndex].disableStakingAndUnstaking(account, {
					gasLimit: 1000000,
					gasPrice: gasPriceEdit
			});
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

	private handleX2 = () => {
		const { x2Check } = this.state;
		if (x2Check) this.setState({ x2Check: false });
		else this.setState({ x2Check: true, x3Check: false });
	};

	private handleX3 = () => {
		const { x3Check } = this.state;
		if (x3Check) this.setState({ x3Check: false });
		else this.setState({ x2Check: false, x3Check: true });
	};

	private contractSwitch = () => {
		this.state.contractIndex === 0 ? this.setState({contractIndex: 1}) : this.setState({contractIndex: 0})
	}

	public render() {
		const { account, contractStates, contractDUO, gasPrice } = this.props;
		const { contractIndex, addr, award, batchArray, x2Check, x3Check } = this.state;
		const gasPriceEdit = x2Check ? gasPrice * 2 : x3Check ? gasPrice * 3 : gasPrice;
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
						<a
							style={{ color: 'rgba(92,164,222,1)' }}
							href={
								'https://etherscan.io/address/' +
								account
							}
							target="_blank"
						>
							<b>{account}</b>
						</a>
						<div>
							Stake: <b>{contractIndex === 0 ? 'Stake-0' : 'Stake-60'}</b>
						</div>
						<button
							onClick={this.contractSwitch}
						>
							Switch Contract
						</button>
						<div>
							Can Stake: <b>{contractStates[contractIndex].canStake.toString()}</b>
						</div>
						<div>
							Can Unstake: <b>{contractStates[contractIndex].canUnstake.toString()}</b>
						</div>
						<div>
							LockMinTimeInSecond: <b>{contractStates[contractIndex].lockMinTimeInSecond}</b>
						</div>
						<div>
							MinStakeAmt: <b>{contractStates[contractIndex].minStakeAmt}</b>
						</div>
						<div>
							MaxStakePerPf: <b>{contractStates[contractIndex].maxStakePerOracle}</b>
						</div>
						<div>
							TotalAwardsToDistribute: <b>{contractStates[contractIndex].totalAwardsToDistribute}</b>
						</div>
						<div>
							Contract DUO Amount: <b>{contractDUO[contractIndex]}</b>
						</div>
						<div>
							Current Gas Price: <b>{gasPrice / 1E9 + 'Gwei'}</b>
						</div>
						<div style={{ marginBottom: 5 }}>
							Gas Price Multiplier:
							<input
								style={{ marginLeft: 10, marginRight: 5 }}
								type="radio"
								checked={x2Check}
								onClick={this.handleX2}
							/>
							X2
							<input
								style={{ marginLeft: 5, marginRight: 5 }}
								type="radio"
								checked={x3Check}
								onClick={this.handleX3}
							/>
							X3
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
								stakeWrappers[contractIndex].batchAddAward(account, [addr], [parseInt(award, 0)], {
									gasLimit: 1000000,
									gasPrice: gasPriceEdit
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
								batchArray.address.length > 30
									? window.alert('CSV file must not exceed 30 rows')
									: stakeWrappers[contractIndex].batchAddAward(
											account,
											batchArray.address,
											batchArray.award,
											{
												gasLimit: 1000000,
												gasPrice: gasPriceEdit
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
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<button
									onClick={() =>
										this.setState({ batchArray: { address: [], award: [] } })
									}
								>
									Clear Table
								</button>
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
							</div>
						) : (
							'CSV Preview'
						)}
					</div>
				</SContent>
			</Layout>
		);
	}
}
