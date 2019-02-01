import { IMagiStates, Web3Wrapper } from '@finbook/duo-contract-wrapper';
// import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import {} from 'ts/common/types';
import { magiWrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import {
	SCard,
	SCardList,
	SCardTitle,
	// SCardExtraDiv,
	SInput
} from './_styled';

interface IProps {
	states: IMagiStates;
	addresses: string[];
	locale: string;
	account: string;
	isColdAddr: boolean;
	refresh: () => any;
}

interface IState {
	pirceFeedIndex: number;
	priceFeedIndexErr: string;
	roleManager: string;
	roleManagerErr: string;
	setValueIndex: number;
	setValueIndexErr: string;
	setValueNumber: number;
	setValueNumberErr: string;
}

export default class MagiAdminCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			pirceFeedIndex: 0,
			priceFeedIndexErr: '',
			roleManager: '',
			roleManagerErr: '',
			setValueIndex: 0,
			setValueIndexErr: '',
			setValueNumber: 0,
			setValueNumberErr: ''
		};
	}

	private handleUpdatePriceFeed = async () => {
		if (this.state.pirceFeedIndex >= 0 && !this.state.priceFeedIndexErr)
			magiWrapper.updatePriceFeed(this.props.account, this.state.pirceFeedIndex);
	};

	private handleUpdateOperator = async () => {
		magiWrapper.updateOperator(this.props.account);
	};

	private handleUpdateRoleManager = async () => {
		if (this.state.roleManager && !this.state.roleManagerErr)
			magiWrapper.updateRoleManager(this.props.account, this.state.roleManager);
	};

	private handleSetValueIdxChange = (index: string) =>
		this.setState({
			setValueIndex: Number(index),
			setValueIndexErr:
				index.match(CST.RX_NUM_P) && Number(index) >= 0
					? ''
					: CST.TT_INVALID_NUMBER[this.props.locale]
		});

	private handleSetValueChange = (value: string) =>
		this.setState({
			setValueNumber: Number(value),
			setValueNumberErr:
				value.match(CST.RX_NUM_P) && Number(value) >= 0
					? ''
					: CST.TT_INVALID_NUMBER[this.props.locale]
		});

	private handleSetValue = async () => {
		if (
			this.state.setValueIndex >= 0 &&
			!this.state.setValueIndexErr &&
			!this.state.setValueNumberErr
		)
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

	private handlePriceFeedIndexChange = (value: string) =>
		this.setState({
			pirceFeedIndex: Number(value),
			priceFeedIndexErr:
				value.match(CST.RX_NUM_P) &&
				Number(value) >= 0 &&
				Number(value) < this.props.addresses.length
					? ''
					: CST.TT_INVALID_NUMBER[this.props.locale]
		});

	public render() {
		const { addresses, locale, states, isColdAddr } = this.props;
		// const isPriceFeed = addresses.includes(account);
		console.log('is cold address');
		console.log(isColdAddr);
		const { priceFeedIndexErr, roleManagerErr } = this.state;
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
			>
				<SDivFlexCenter>
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li>
									<span className="title">{CST.TH_IS_STARTED}</span>
									<span className="content">
										{states.isStarted ? CST.TH_STARTED : CST.TH_NOT_STARTED}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_NUM_OF_PRICE[locale]}</span>
									<span className="content">{states.numOfPrices}</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_PRICE_FEED_COOL_DOWN[locale]}
									</span>
									<span className="content">
										{states.priceUpdateCoolDown / 1000 / 60 + ' minutes'}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_PRICE_FEED_TIME_TOLERANCE[locale]}
									</span>
									<span className="content">
										{states.priceFeedTimeTolerance / 1000 + ' seconds'}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_PRICE_FEED_TOLERANCE[locale]}
									</span>
									<span className="content">
										{states.priceFeedTolerance * 100 + '%'}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_PRICE_TOLERANCE[locale]}</span>
									<span className="content">
										{states.priceTolerance * 100 + '%'}
									</span>
								</li>
							</ul>
						</div>
					</SCardList>
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								{addresses.map((address, i) => (
									<li className="block-title">
										<span className="title">
											{CST.TH_PRICE_FEED[locale] + i}
										</span>
										<span className="content">{address}</span>
									</li>
								))}
							</ul>
						</div>
					</SCardList>
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li className="no-bg">
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="2px 0 2px 0"
										marginBottom="10px"
									>
										{' '}
										<SInput
											className={priceFeedIndexErr ? 'input-error' : ''}
											placeholder={CST.TT_INPUT_INDEX[locale]}
											width={'700px'}
											onChange={e =>
												this.handlePriceFeedIndexChange(e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											disabled={!isColdAddr}
											onClick={() => this.handleUpdatePriceFeed()}
										>
											{CST.TH_UPDATE_PRICE_FEED[locale]}
										</button>
									</SDivFlexCenter>
								</li>

								<li className="no-bg">
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="2px 0 2px 0"
										marginBottom="10px"
									>
										{' '}
										<SInput
											className={roleManagerErr ? 'input-error' : ''}
											placeholder={CST.TT_INPUT_ADDR[locale]}
											width={'700px'}
											onChange={e =>
												this.handleRoleManagerChange(e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											onClick={() => this.handleUpdateRoleManager()}
										>
											{CST.TH_UPDATE_ESP[locale]}
										</button>
									</SDivFlexCenter>
								</li>

								<li className="no-bg">
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="2px 0 2px 0"
										marginBottom="10px"
									>
										{' '}
										<SInput
											className={roleManagerErr ? 'input-error' : ''}
											placeholder={CST.TT_INPUT_INDEX[locale]}
											width={'200px'}
											onChange={e =>
												this.handleSetValueIdxChange(e.target.value)
											}
											small
										/>
										<SInput
											className={roleManagerErr ? 'input-error' : ''}
											placeholder={CST.TT_INPUT_VALUE[locale]}
											width={'430px'}
											onChange={e =>
												this.handleSetValueChange(e.target.value)
											}
											small
										/>
										<button
											className={'form-button'}
											onClick={() => this.handleSetValue()}
										>
											{CST.TH_SET_MAG_VALUE[locale]}
										</button>
									</SDivFlexCenter>
								</li>

								<li className="no-bg">
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="2px 0 2px 0"
										marginBottom="10px"
									>
										<button
											className={'form-button'}
											disabled={!isColdAddr}
											onClick={() => this.handleUpdateOperator()}
										>
											{CST.TH_UPDATE_OPERATOR[locale]}
										</button>
									</SDivFlexCenter>
								</li>
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
