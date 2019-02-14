import { IMagiStates, Web3Wrapper } from '@finbook/duo-contract-wrapper';
import { Table } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IMagiPriceFeed, ITableRecord } from 'ts/common/types';
import util from 'ts/common/util';
import { magiWrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardExtraDiv, SCardList, SCardTitle, SInput, STableWrapper } from './_styled';

interface IProps {
	states: IMagiStates;
	priceFeeds: IMagiPriceFeed;
	operator: { address: string; balance: number };
	roleManager: { address: string; balance: number };
	locale: string;
	account: string;
	isColdAddr: boolean;
	refresh: () => any;
}

interface IState {
	roleManager: string;
	roleManagerErr: string;
	setValueIndex: number;
	setValueNumber: number;
	setValueNumberErr: string;
}

const { Column } = Table;

export default class MagiAdminCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			roleManager: '',
			roleManagerErr: '',
			setValueIndex: 0,
			setValueNumber: 0,
			setValueNumberErr: ''
		};
	}

	private handleUpdateOperator = async () => {
		magiWrapper.updateOperator(this.props.account);
	};

	private handleUpdateRoleManager = async () => {
		if (this.state.roleManager && !this.state.roleManagerErr)
			magiWrapper.updateRoleManager(this.props.account, this.state.roleManager);
	};

	private handleSetValueNumberChange = (index: number, value: string) =>
		this.setState({
			setValueIndex: index,
			setValueNumber: Number(value),
			setValueNumberErr:
				value.match(CST.RX_NUM_P) && Number(value) >= 0
					? ''
					: CST.TT_INVALID_NUMBER[this.props.locale]
		});

	private handleSetValue = async () => {
		if (this.state.setValueIndex >= 0 && !this.state.setValueNumberErr)
			magiWrapper.setValue(
				this.props.account,
				this.state.setValueIndex,
				this.state.setValueNumber
			);
	};

	private handleRoleManagerChange = (address: string) =>
		this.setState({
			roleManager: address,
			roleManagerErr: Web3Wrapper.checkAddress(address) ? '' : 'Invalid Address'
		});

	public render() {
		const {
			account,
			priceFeeds,
			locale,
			states,
			isColdAddr,
			operator,
			roleManager
		} = this.props;
		const { roleManagerErr, setValueIndex, setValueNumberErr } = this.state;

		const dataSource: ITableRecord[] = [];
		for (const address in priceFeeds) {
			const { balance, index } = priceFeeds[address];
			dataSource.push({
				key: index,
				[CST.TH_ADDRESS.EN]: address,
				[CST.TH_BALANCE.EN]: util.formatBalance(balance),
				[CST.TH_ACTION]: util.formatBalance(balance),
				[CST.TH_LINK]:
					'https://' + (__KOVAN__ ? 'kovan.' : '') + 'etherscan.io/address/' + address
			});
		}
		dataSource.sort((a, b) => a.key - b.key);

		return (
			<SCard
				title={
					<SCardTitle>
						<a
							className="tag-content"
							href={
								'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/address/' +
								magiWrapper.web3Wrapper.contractAddresses.Oracles[0].address
							}
							target="_blank"
							style={{ color: 'white' }}
						>
							{CST.TH_MAGI.toUpperCase()}
						</a>
					</SCardTitle>
				}
				width={'1000px'}
				margin={'0 10px 0 10px'}
				extra={
					<SCardExtraDiv>
						{states.isStarted ? CST.TH_STARTED : CST.TH_NOT_STARTED}
					</SCardExtraDiv>
				}
			>
				<SDivFlexCenter>
					<SCard
						title={<SCardTitle>{CST.TH_CONTRACT_STATES.EN.toUpperCase()}</SCardTitle>}
						width="1000px"
						margin="0 0 0 0"
						inlinetype="table"
					>
						<SCardList>
							<div className="status-list-wrapper">
								<ul>
									<li>
										<span className="title">{CST.TH_NUM_OF_PRICE[locale]}</span>
										<span className="content" style={{ width: '160px' }}>
											{!states.numOfPrices ? '0' : states.numOfPrices}
										</span>
									</li>
									<li>
										<span className="title">{CST.TH_OPT_COOL_DOWN}</span>
										<span className="content" style={{ width: '160px' }}>{states.operationCoolDown}</span>
									</li>
									<li>
										<span className="title">{CST.TH_LAST_OPT_TIME}</span>
										<span className="content" style={{ width: '160px' }}>{states.lastOperationTime}</span>
									</li>
									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_PRICE_FEED_COOL_DOWN[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{states.priceUpdateCoolDown / 1000 / 60 + ' minutes'}
										</span>
										<SInput
											className={
												setValueIndex === 3 && setValueNumberErr
													? 'input-error'
													: ''
											}
											placeholder={CST.TT_INPUT_VALUE[locale]}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											width={'300px'}
											onChange={e =>
												this.handleSetValueNumberChange(3, e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											onClick={() => this.handleSetValue()}
										>
											{CST.TH_UPDATE}
										</button>
									</li>
									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_PRICE_FEED_TIME_TOLERANCE[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{states.priceFeedTimeTolerance / 1000 + ' seconds'}
										</span>
										<SInput
											className={
												setValueIndex === 2 && setValueNumberErr
													? 'input-error'
													: ''
											}
											placeholder={CST.TT_INPUT_VALUE[locale]}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											width={'300px'}
											onChange={e =>
												this.handleSetValueNumberChange(2, e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											onClick={() => this.handleSetValue()}
										>
											{CST.TH_UPDATE}
										</button>
									</li>
									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_PRICE_FEED_TOLERANCE[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{states.priceFeedTolerance * 100 + '%'}
										</span>
										<SInput
											className={
												setValueIndex === 1 && setValueNumberErr
													? 'input-error'
													: ''
											}
											placeholder={CST.TT_INPUT_VALUE[locale]}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											width={'300px'}
											onChange={e =>
												this.handleSetValueNumberChange(1, e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											onClick={() => this.handleSetValue()}
										>
											{CST.TH_UPDATE}
										</button>
									</li>
									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_PRICE_TOLERANCE[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{states.priceTolerance * 100 + '%'}
										</span>
										<SInput
											className={
												setValueIndex === 0 && setValueNumberErr
													? 'input-error'
													: ''
											}
											placeholder={CST.TT_INPUT_VALUE[locale]}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											width={'300px'}
											onChange={e =>
												this.handleSetValueNumberChange(0, e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											disabled={
												account.toLowerCase() !==
												operator.address.toLowerCase()
											}
											onClick={() => this.handleSetValue()}
										>
											{CST.TH_UPDATE}
										</button>
									</li>
									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_ROLE_MANAGER[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{roleManager.address}
										</span>
										<SInput
											className={roleManagerErr ? 'input-error' : ''}
											placeholder={CST.TT_INPUT_ADDR[locale]}
											onChange={e =>
												this.handleRoleManagerChange(e.target.value)
											}
											width={'300px'}
											small
										/>
										<button
											className={'form-button'}
											disabled={!isColdAddr}
											onClick={() => this.handleUpdateRoleManager()}
										>
											{CST.TH_UPDATE_ESP[locale]}
										</button>
									</li>

									<li>
										<span className="title" style={{ width: '160px' }}>
											{CST.TH_OPERATOR[locale]}
										</span>
										<span className="content" style={{ width: '340px' }}>
											{operator.address}
										</span>
										<button
											className={'form-button'}
											disabled={!isColdAddr}
											onClick={() => this.handleUpdateOperator()}
										>
											{CST.TH_UPDATE_OPERATOR[locale]}
										</button>
									</li>
								</ul>
							</div>
						</SCardList>
					</SCard>
					<SCard
						title={<SCardTitle>{CST.AC_MAG_PRICE_FEED.toUpperCase()}</SCardTitle>}
						width="1000px"
						margin="0 0 0 0"
						inlinetype="table"
					>
						<STableWrapper>
							<Table dataSource={dataSource} pagination={false}>
								{[CST.TH_ADDRESS.EN, CST.TH_BALANCE.EN].map(th => (
									<Column
										title={th}
										dataIndex={th}
										key={th}
										onCell={(record: ITableRecord) => ({
											onClick: () => window.open(record[CST.TH_LINK])
										})}
									/>
								))}
								{
									<Column
										title={CST.TH_ACTION}
										dataIndex={CST.TH_ACTION}
										key={CST.TH_ACTION}
										className={'address-table-action-col'}
										render={(text, record, index) => (
											<button
												className="form-button"
												disabled={!isColdAddr}
												onClick={() => {
													console.log(
														`update priceFeed with index ${index}
														with text ${text}
														with record ${JSON.stringify(record)}`
													);
													magiWrapper.updatePriceFeed(
														this.props.account,
														index
													);
												}}
											>
												{CST.TH_UPDATE_PRICE_FEED[locale]}
											</button>
										)}
									/>
								}
							</Table>
						</STableWrapper>
					</SCard>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
