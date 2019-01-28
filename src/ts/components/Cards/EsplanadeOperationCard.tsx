//import moment from 'moment';
// import { Tooltip } from 'antd';
// import * as d3 from 'd3';
// import demoCreate from 'images/createDemo.png';
// import infoIcon from 'images/info.svg';
// import demoRedeem from 'images/redeemDemo.png';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IEsplanadeStates } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';
// import util from 'ts/common/util';
// import { getDualClassAddressByTypeTenor, getDualClassWrapperByTypeTenor } from 'ts/common/wrappers';
// import dynamoUtil from '../../../../../duo-admin/src/utils/dynamoUtil';
// import Erc20Form from '../Forms/Erc20Form';
import { SCard, SCardExtraDiv, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	states: IEsplanadeStates;
	locale: string;
	account: string;
	gasPrice: number;
	refresh: () => any;
}

interface IState {
	custodianAddressErr: string;
	otherContractAddressErr: string;
	custodianAddress: string;
	otherContractAddress: string;
	firstAddressToAdd: string;
	secondAddressToAdd: string;
	locale: string;
}

export default class EspOperationCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			custodianAddressErr: '',
			otherContractAddressErr: '',
			custodianAddress: '',
			otherContractAddress: '',
			firstAddressToAdd: '',
			secondAddressToAdd: '',
			locale: props.locale
		};
	}

	public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		if (nextProps.locale !== prevState.locale)
			return {
				amount: '',
				amountError: '',
				description: '',
				locale: nextProps.locale
			};

		return null;
	}

	public handleAddCustodian = () =>
		esplanadeWrapper.addCustodian(this.props.account, this.state.custodianAddress);

	public handleAddOtherContract = () =>
		esplanadeWrapper.addOtherContracts(this.props.account, this.state.otherContractAddress);

	private handleCustodianAddressChange = (addr: string) =>
		this.setState({
			custodianAddress: addr,
			custodianAddressErr: esplanadeWrapper.web3Wrapper.checkAddress(addr) ? '' : 'Invalid Address'
		});
	private handleOtherContractAddressChange = (addr: string) =>
		this.setState({
			otherContractAddress: addr,
			otherContractAddressErr: esplanadeWrapper.web3Wrapper.checkAddress(addr) ? '' : 'Invalid Address'
		});

	// private handleAddAddressChange = (index: number, addr: string) =>
	// 	this.setState({
	// 		(index === 0? firstAddressToAdd: secondAddressToAdd): addr,
	// 		otherContractAddressErr: esplanadeWrapper.web3Wrapper.checkAddress(addr) ? '' : 'Invalid Address'
	// 	});

	public render() {
		const { gasPrice, locale, states } = this.props;
		const { custodianAddressErr, otherContractAddressErr } = this.state;

		return (
			<SCard
				title={<SCardTitle>{CST.TH_OPERATION[locale].toUpperCase()}</SCardTitle>}
				width={'440px'}
				margin={'0 0 0 10px'}
				className={!states.isStarted ? 'card-disable' : ''}
				extra={
					<SCardExtraDiv>
						{CST.TH_NETWORK_GAS_PRICE[locale] +
							': ' +
							(gasPrice
								? +Math.round(gasPrice / 1e9) + ' Gwei'
								: CST.TH_LOADING[locale])}
					</SCardExtraDiv>
				}
			>
				<SCardList>
					<div className="status-list-wrapper">
						<ul>
							<li className="no-bg">
								<SInput
									className={custodianAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={this.state.custodianAddress}
									onChange={e => this.handleCustodianAddressChange(e.target.value)}
									small
								/>
								<button
									className={'form-button'}
									onClick={() => this.handleAddCustodian()}
								>
									{CST.TH_ADD_CUSTODIAN}
								</button>
							</li>

							<li className="no-bg">
								<SInput
									className={otherContractAddressErr ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'400px'}
									value={this.state.otherContractAddress}
									onChange={e => this.handleOtherContractAddressChange(e.target.value)}
									small
								/>
								<button
									className={'form-button'}
									onClick={() => this.handleAddOtherContract()}
								>
									{CST.TH_ADD_OTHER_CONTRACT}
								</button>
							</li>
						</ul>
					</div>
				</SCardList>
			</SCard>
		);
	}
}
