//import { IStatus } from '@finbook/duo-market-data';
import { IStakeAddress, IStakeV2States } from '@finbook/duo-contract-wrapper';
import { Button, Layout, Table } from 'antd';
import { csvParse } from 'd3';
import * as React from 'react';
import { stakeV2Wrapper, web3Wrapper } from 'ts/common/wrappers';
import { STableWrapper } from 'ts/components/Cards/_styled';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
const { Column } = Table;
interface IProps {
	account: string;
	duoBalance: number;
	addresses: IStakeAddress;
	contractStates: IStakeV2States;
	contractDUO: number;
	gasPrice: number;
	stagingAdd: object;
	subscribe: () => any;
	refresh: () => any;
	getStagingAdd: (start: number, end: number) => any;
}

interface IState {
	addr: string;
	award: string;
	oracle: string;
	batchArray: { address: string[]; award: number[] };
	x2Check: boolean;
	x3Check: boolean;
	stagingStart: number;
	stagingEnd: number;
}
export default class StakingAdmin extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addr: '',
			award: '',
			oracle: '',
			batchArray: { address: [], award: [] },
			x2Check: false,
			x3Check: false,
			stagingStart: 0,
			stagingEnd: 0
		};
	}
	private inputRef = React.createRef<HTMLInputElement>();
	public componentDidMount() {
		this.props.subscribe();
		this.getStagingIndex();
		document.title = 'DUO | StakingV2 Admin';
	}

	// public componentDidUpdate(prevProps: IProps) {
	// 	if (JSON.stringify(this.props.stagingAdd) !== JSON.stringify(prevProps.stagingAdd)) this.props.refresh()
	// }

	private handleStake = async (operator: boolean) => {
		const { account, gasPrice } = this.props;
		const { x2Check, x3Check } = this.state;
		const gasPriceEdit = x2Check ? gasPrice * 2 : x3Check ? gasPrice * 3 : gasPrice;
		const txHash = operator
			? await stakeV2Wrapper.enableStaking(account, {
					gasLimit: 1000000,
					gasPrice: gasPriceEdit
			})
			: await stakeV2Wrapper.disableStaking(account, {
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
	private handleOracle = (oracle: string) => {
		this.setState({
			oracle: oracle
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

	private getStagingIndex = async () => {
		const index = await stakeV2Wrapper.getStagingIndex();
		this.setState({
			stagingStart: index.add.first,
			stagingEnd: index.add.last
		});
	};

	private fetchStagingData = async () => {
		const { stagingStart, stagingEnd } = this.state;
		if (!!stagingStart && !!stagingEnd) {
			this.props.getStagingAdd(stagingStart, stagingEnd);
		} else {
			window.alert('invalid index, please get index first');
		}
	};

	private handleApprove = async () => {
		const { account } = this.props;
		const txHash = await web3Wrapper.erc20Approve(
			web3Wrapper.contractAddresses.DUO.address,
			account,
			web3Wrapper.contractAddresses.StakesV2[0].address,
			0,
			true
		);
		console.log('Transaction submit: ' + txHash);
	};

	public render() {
		const {
			account,
			addresses,
			contractStates,
			contractDUO,
			gasPrice,
			refresh,
			stagingAdd
		} = this.props;
		const { addr, award, batchArray, x2Check, x3Check, stagingStart, stagingEnd, oracle } = this.state;
		const gasPriceEdit = x2Check ? gasPrice * 2 : x3Check ? gasPrice * 3 : gasPrice;
		let stagingAddArray = [];
		if (!!stagingStart && !!stagingEnd) {
			for (let i = stagingStart; i <= stagingEnd; i++) {
				stagingAddArray.push({ user: 'Loading...', amount: '-' });
			}
			for (const key in stagingAdd) {
				stagingAddArray[Number(key) - 1] = {
					user: (stagingAdd as any)[key].user,
					amount: (stagingAdd as any)[key].amount
				};
			}
		} else {
			stagingAddArray = [];
		}
		console.log(addresses);
		return (
			<Layout>
				<Header />
				<SContent>
					<SDivFlexCenter horizontal marginBottom="20px">
						<div
							style={{
								width: 400,
								padding: 20,
								border: '1px dashed rgba(0,0,0,.3)',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								borderRadius: 4,
								marginRight: 20
							}}
						>
							<b
								style={{
									fontSize: 18,
									marginBottom: 5
								}}
							>
								Contract States
							</b>
							<Button
								onClick={refresh}
								style={{
									marginBottom: 10
								}}
							>
								Refresh
							</Button>
							<Button
								onClick={() => this.handleApprove()}
								style={{
									marginBottom: 10
								}}
							>
								Approve
							</Button>
							<a
								style={{ color: 'rgba(92,164,222,1)' }}
								href={'https://etherscan.io/address/' + account}
								target="_blank"
							>
								<b>{account}</b>
							</a>
							<div>
								Stake: <b>Inline Warrant</b>
							</div>
							<div>
								Stake Enabled:{' '}
								<b
									style={{
										color: contractStates.stakingEnabled
											? 'rgba(92,164,222,1)'
											: 'red'
									}}
								>
									{contractStates.stakingEnabled.toString().toUpperCase()}
								</b>
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
								TotalAwardsToDistribute:{' '}
								<b>{contractStates.totalAwardsToDistribute}</b>
							</div>
							<div>
								Contract DUO Amount: <b>{contractDUO}</b>
							</div>
							<div>
								Current Gas Price: <b>{gasPrice / 1e9 + 'Gwei'}</b>
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
								padding: 20,
								border: '1px dashed rgba(0,0,0,.3)',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								borderRadius: 4
							}}
						>
							<b
								style={{
									fontSize: 18,
									marginBottom: 15
								}}
							>
								Enanble/Disable Contract
							</b>
							<div
								style={{
									width: 360,
									display: 'flex',
									justifyContent: 'space-around',
									alignItems: 'center'
								}}
							>
								<Button onClick={() => this.handleStake(true)}>
									Enable Stake/Unstake
								</Button>
								<Button onClick={() => this.handleStake(false)}>
									Disable Stake/Unstake
								</Button>
							</div>
							<div
								style={{
									width: 360,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: 30
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
								<Button
									onClick={() =>
										stakeV2Wrapper.stageAddRewards(
											account,
											[addr],
											[parseInt(award, 0)],
											{
												gasLimit: 1000000,
												gasPrice: gasPriceEdit
											}
										)
									}
								>
									Update Award
								</Button>
							</div>
						</div>
					</SDivFlexCenter>
					<SDivFlexCenter horizontal marginBottom="20px">
						<div
							style={{
								width: 240,
								height: 250,
								padding: 10,
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								marginRight: 20,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<b
								style={{
									fontSize: 18,
									marginBottom: 15,
									marginTop: 20
								}}
							>
								Batch Add Award
							</b>
							<input
								placeholder="input csv"
								style={{
									width: '80%',
									marginBottom: 10
								}}
								type="file"
								ref={this.inputRef}
								onChange={e => this.handleFile((e.target.files as any)[0])}
							/>
							<Button
								onClick={() =>
									batchArray.address.length > 30
										? window.alert('CSV file must not exceed 30 rows')
										: stakeV2Wrapper.stageAddRewards(
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
							</Button>
						</div>
						<div
							style={{
								width: 560,
								height: 250,
								padding: 10,
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
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
									<Button
										onClick={() => {
											(this.inputRef.current as any).value = '';
											this.setState({
												batchArray: { address: [], award: [] }
											});
										}}
									>
										Clear Table
									</Button>
									<div
										style={{
											maxHeight: 180,
											overflowY: 'scroll',
											marginTop: 10,
											width: '100%'
										}}
									>
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
														<td>{item}</td>
														<td style={{ textAlign: 'right' }}>
															{batchArray.award[i]}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							) : (
								'CSV Preview'
							)}
						</div>
					</SDivFlexCenter>
					<SDivFlexCenter horizontal marginBottom="20px">
						<div
							style={{
								width: 240,
								padding: 10,
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								marginRight: 20,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<b
								style={{
									fontSize: 18,
									marginBottom: 15,
									marginTop: 20
								}}
							>
								Check Staging Queue
							</b>
							<Button
								style={{
									width: 200
								}}
								onClick={() => this.getStagingIndex()}
							>
								Get Staging Index
							</Button>
							<div
								style={{
									marginBottom: 10
								}}
							>
								{`Start Index: ${stagingStart ? stagingStart : '-'}, End Index: ${
									stagingEnd ? stagingEnd : '-'
								}`}
							</div>
							<Button
								style={{
									width: 200,
									marginBottom: 30
								}}
								onClick={() => this.fetchStagingData()}
							>
								Fetch Staging Data
							</Button>
							<Button
								style={{
									marginBottom: 10,
									width: 200
								}}
								onClick={() =>
									stakeV2Wrapper.commitAddRewards(account, 0, {
										gasLimit: 1000000,
										gasPrice: gasPriceEdit
									})
								}
								disabled={contractStates.stakingEnabled}
							>
								Commit Staging Queue
							</Button>
							<Button
								style={{
									marginBottom: 10,
									width: 200
								}}
								onClick={() =>
									stakeV2Wrapper.resetStagingAwards(account, {
										gasLimit: 1000000,
										gasPrice: gasPriceEdit
									})
								}
								disabled={contractStates.stakingEnabled}
							>
								Reset Staging Queue
							</Button>
						</div>
						<div
							style={{
								width: 560,
								padding: 10,
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<STableWrapper style={{ width: '100%' }}>
								<Table
									dataSource={stagingAddArray.map((item, index) => ({
										key: index,
										Id: index + 1,
										Address: item.user,
										Reward: item.amount
									}))}
									pagination={{
										showSizeChanger: true,
										showQuickJumper: true,
										showTotal: (total: number) => 'total: ' + total,
										pageSize: 20,
										pageSizeOptions: ['20', '50'],
										size: 'small'
									}}
									rowClassName={() => 'lastRoundRow'}
								>
									<Column title="ID" dataIndex="Id" width={50} />
									<Column title="Address" dataIndex="Address" width={150} />
									<Column title="Reward" dataIndex="Reward" width={60} />
								</Table>
							</STableWrapper>
						</div>
					</SDivFlexCenter>
					<SDivFlexCenter horizontal marginBottom="20px">
						<div
							style={{
								width: 400,
								padding: 10,
								border: '1px dashed rgba(0,0,0,.3)',
								borderRadius: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<div
								style={{
									width: 360,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: 30
								}}
							>
								<b
									style={{
										fontSize: 18,
										marginBottom: 15
									}}
								>
									Add Oracle
								</b>
								<input
									placeholder="oracle address"
									style={{
										width: '100%',
										marginBottom: 10,
										paddingLeft: 5
									}}
									value={oracle}
									onChange={e => this.handleOracle(e.target.value)}
								/>
								<Button
									onClick={() =>
										stakeV2Wrapper.addOracle(
											account,
											oracle,
											{
												gasLimit: 1000000,
												gasPrice: gasPriceEdit
											}
										)
									}
								>
									Add Oracle
								</Button>
							</div>
						</div>
					</SDivFlexCenter>
				</SContent>
			</Layout>
		);
	}
}
