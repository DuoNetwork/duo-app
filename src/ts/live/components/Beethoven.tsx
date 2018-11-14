import { Layout } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import * as CST from '../common/constants';
import { IBeethovenStates, IContractPrice, IConversion, ISourceData } from '../common/types';
import { web3Wrapper } from '../common/wrappers';
import TimeSeriesCard from '../containers/Cards/TimeSeriesCardContainer';
import Header from '../containers/HeaderContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import ConversionMCard from './Cards/ConversionMCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';

interface IProps {
	locale: string;
	states: IBeethovenStates;
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
}

export default class Beethoven extends React.Component<IProps> {
	public componentDidMount() {
		this.props.subscribe(web3Wrapper.contractAddresses.Beethoven.custodian);
		document.title = 'DUO | Custodian';
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
		} = this.props;
		const custodian = web3Wrapper.contractAddresses.Beethoven.custodian;
		return (
			<div>
				<MediaQuery minDeviceWidth={900}>
					<Layout>
						<Header />
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
									refresh={() => refresh(custodian)}
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
									refresh={() => refresh(custodian)}
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
							refresh={() => refresh(custodian)}
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
							refresh={() => refresh(custodian)}
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
