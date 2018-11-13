import { Layout } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import * as CST from '../common/constants';
import { IBeethovanStates, IContractPrice, IConversion, ISourceData } from '../common/types';
import { web3Wrapper } from '../common/wrappers';
import TimeSeriesCard from '../containers/Cards/TimeSeriesCardContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import ConversionMCard from './Cards/ConversionMCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';
import Header from './Header';

interface IProps {
	location: object;
	locale: string;
	states: IBeethovanStates;
	network: number;
	account: string;
	eth: number;
	aToken: number;
	bToken: number;
	sourceLast: ISourceData<IContractPrice>;
	conversions: IConversion[];
	gasPrice: number;
	subscribe: (custodian: string) => any;
	unsubscribe: () => any;
	refresh: (custodian: string) => any;
	refreshBalance: (custodian: string) => any;
	updateLocale: (locale: string) => any;
}

export default class Beethovan extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe(web3Wrapper.contractAddresses.Beethovan.custodian);
	}

	public componentWillUnmount() {
		this.props.unsubscribe();
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
			refreshBalance,
			network,
			updateLocale,
			location
		} = this.props;
		const custodian = web3Wrapper.contractAddresses.Beethovan.custodian;
		return (
			<div>
				<MediaQuery minDeviceWidth={900}>
					<Layout>
						<Header
							location={location}
							locale={locale}
							network={network}
							to={CST.TH_STATUS.EN}
							toText={CST.TH_STATUS[locale]}
							refresh={() => refresh(custodian)}
							updateLocale={updateLocale}
						/>
						<SContent>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<TimeSeriesCard />
								<StateCard locale={locale} states={states} />
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<PriceCard
									locale={locale}
									states={states}
									sourceLast={sourceLast}
								/>
								<BalanceCard
									locale={locale}
									account={account}
									eth={eth}
									aToken={aToken}
									bToken={bToken}
									refresh={() => refreshBalance(custodian)}
								/>
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<ConversionCard locale={locale} conversions={conversions} />
								<OperationCard
									locale={locale}
									states={states}
									eth={eth}
									aToken={aToken}
									bToken={bToken}
									account={account}
									refresh={() => refreshBalance(custodian)}
									gasPrice={gasPrice}
								/>
							</SDivFlexCenter>
						</SContent>
					</Layout>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={899}>
					<StateCard locale={locale} states={states} mobile />
					<PriceCard locale={locale} states={states} sourceLast={sourceLast} mobile />
					{account !== CST.DUMMY_ADDR ? (
						<BalanceCard
							locale={locale}
							account={account}
							eth={eth}
							aToken={aToken}
							bToken={bToken}
							refresh={() => refreshBalance(custodian)}
							mobile
						/>
					) : null}
					{account !== CST.DUMMY_ADDR ? (
						<OperationCard
							locale={locale}
							states={states}
							eth={eth}
							aToken={aToken}
							bToken={bToken}
							account={account}
							refresh={() => refreshBalance(custodian)}
							gasPrice={gasPrice}
							mobile
						/>
					) : null}
					{account !== CST.DUMMY_ADDR ? (
						<ConversionMCard locale={locale} conversions={conversions} />
					) : null}
				</MediaQuery>
			</div>
		);
	}
}
