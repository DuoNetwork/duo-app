import { Constants as WrapperConstants, IContractPrice, IDualClassStates } from '@finbook/duo-contract-wrapper';
import { IConversion } from '@finbook/duo-market-data';
import { Layout } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import * as CST from 'ts/common/constants';
import { ISourceData } from 'ts/common/types';
import { getDualClassAddressByTypeTenor } from 'ts/common/wrappers';
import TimeSeriesCard from 'ts/containers/Cards/TimeSeriesCardContainer';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import BalanceCard from '../Cards/BalanceCard';
import ConversionCard from '../Cards/ConversionCard';
import ConversionMCard from '../Cards/ConversionMCard';
import OperationCard from '../Cards/OperationCard';
import PriceCard from '../Cards/PriceCard';
import StateCard from '../Cards/StateCard';

interface IProps {
	type: string;
	tenor: string;
	locale: string;
	states: IDualClassStates;
	account: string;
	eth: number;
	aToken: number;
	bToken: number;
	sourceLast: ISourceData<IContractPrice>;
	conversions: IConversion[];
	gasPrice: number;
	subscribe: (type: string, tenor: string) => any;
	unsubscribe: (type: string, tenor: string) => any;
	refresh: () => any;
}

interface IState {
	type: string;
	tenor: string;
}

export default class DualClassCustodian extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			type: props.type,
			tenor: props.tenor
		};
	}

	public componentDidMount() {
		this.props.subscribe(this.props.type, this.props.tenor);
		document.title = `DUO | ${this.props.type} ${this.props.tenor}`;
	}

	public static getDerivedStateFromProps(props: IProps, state: IState) {
		if (props.type !== state.type || props.tenor !== state.tenor) {
			props.unsubscribe(props.type, props.tenor);
			props.subscribe(props.type, props.tenor);
			document.title = `DUO | ${props.type} ${props.tenor}`;
			return {
				type: props.type,
				tenor: props.tenor
			};
		}

		return null;
	}

	public componentWillUnmount() {
		this.props.unsubscribe(this.props.type, this.props.tenor);
	}

	public render() {
		const {
			locale,
			states,
			account,
			eth,
			aToken,
			bToken,
			sourceLast,
			conversions,
			gasPrice,
			refresh,
			tenor,
			type
		} = this.props;
		const contractAddress = getDualClassAddressByTypeTenor(type, tenor);
		return (
			<div>
				<MediaQuery minDeviceWidth={900}>
					<Layout>
						<Header />
						<SContent>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<TimeSeriesCard
									underlying={CST.TH_ETH}
									tokenA={contractAddress.aToken.code}
									tokenB={contractAddress.bToken.code}
								/>
								<StateCard
									type={type}
									tenor={tenor}
									locale={locale}
									states={states}
								/>
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<PriceCard
									type={type}
									contractAddress={contractAddress}
									locale={locale}
									states={states}
									sourceLast={sourceLast}
								/>
								<BalanceCard
									contractAddress={contractAddress}
									locale={locale}
									account={account}
									eth={eth}
									aToken={aToken}
									bToken={bToken}
									refresh={refresh}
								/>
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<ConversionCard
									contractAddress={contractAddress}
									locale={locale}
									conversions={conversions}
								/>
								<OperationCard
									contractAddress={contractAddress}
									type={type}
									tenor={tenor}
									locale={locale}
									states={states}
									eth={eth}
									aToken={aToken}
									bToken={bToken}
									account={account}
									refresh={refresh}
									gasPrice={gasPrice}
								/>
							</SDivFlexCenter>
						</SContent>
					</Layout>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={899}>
					<StateCard type={type} tenor={tenor} locale={locale} states={states} mobile />
					<PriceCard
						type={type}
						contractAddress={contractAddress}
						locale={locale}
						states={states}
						sourceLast={sourceLast}
						mobile
					/>
					{account !== WrapperConstants.DUMMY_ADDR ? (
						<BalanceCard
							contractAddress={contractAddress}
							locale={locale}
							account={account}
							eth={eth}
							aToken={aToken}
							bToken={bToken}
							refresh={refresh}
							mobile
						/>
					) : null}
					{account !== WrapperConstants.DUMMY_ADDR ? (
						<OperationCard
							contractAddress={contractAddress}
							type={type}
							tenor={tenor}
							locale={locale}
							states={states}
							eth={eth}
							aToken={aToken}
							bToken={bToken}
							account={account}
							refresh={refresh}
							gasPrice={gasPrice}
							mobile
						/>
					) : null}
					{account !== WrapperConstants.DUMMY_ADDR ? (
						<ConversionMCard
							contractAddress={contractAddress}
							locale={locale}
							conversions={conversions}
						/>
					) : null}
				</MediaQuery>
			</div>
		);
	}
}
