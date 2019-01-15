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
	addressError: string;
	address: string;
	locale: string;
}

export default class EspOperationCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			addressError: '',
			address: '',
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
		esplanadeWrapper.addCustodian( this.state.address);

	private handleAddressChange = (addr: string) =>
		this.setState({
			address: addr,
			addressError: esplanadeWrapper.web3Wrapper.checkAddress(addr) ? '' : 'Invalid Address'
		});

	public render() {
		const { gasPrice, locale, states } = this.props;
		const { addressError } = this.state;

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
									className={addressError ? 'input-error' : ''}
									placeholder={CST.TT_INPUT_ADDR[locale]}
									width={'300px'}
									value={this.state.address}
									onChange={e => this.handleAddressChange(e.target.value)}
									small
								/>
								<button
									className={'form-button'}
									onClick={() => this.handleAddCustodian()}
								>
									{CST.TH_ADD_CUSTODIAN}
								</button>
							</li>
						</ul>
					</div>
				</SCardList>
			</SCard>
		);
	}
}
