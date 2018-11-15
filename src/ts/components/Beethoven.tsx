import { Layout } from 'antd';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import * as CST from 'ts/common/constants';
import { IBeethovenStates, IContractPrice, IConversion, ISourceData } from 'ts/common/types';
import TimeSeriesCard from 'ts/containers/Cards/TimeSeriesCardContainer';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from './_styled';
import BalanceCard from './Cards/BalanceCard';
import ConversionCard from './Cards/ConversionCard';
import ConversionMCard from './Cards/ConversionMCard';
import OperationCard from './Cards/OperationCard';
import PriceCard from './Cards/PriceCard';
import StateCard from './Cards/StateCard';

interface IProps {
	tenor: string;
	locale: string;
	states: IBeethovenStates;
	account: string;
	eth: number;
	aToken: number;
	bToken: number;
	sourceLast: ISourceData<IContractPrice>;
	conversions: IConversion[];
	gasPrice: number;
	subscribe: (tenor: string) => any;
	unsubscribe: (tenor: string) => any;
	refresh: () => any;
}

interface IState {
	tenor: string;
}

export default class Beethoven extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			tenor: props.tenor
		};
	}

	public componentDidMount() {
		this.props.subscribe(this.props.tenor);
		document.title = 'DUO | Custodian';
	}

	public static getDerivedStateFromProps(props: IProps, state: IState) {
		if (props.tenor !== state.tenor) {
			props.unsubscribe(props.tenor);
			props.subscribe(props.tenor);
			return {
				tenor: props.tenor
			};
		}

		return null;
	}

	public componentWillUnmount() {
		this.props.unsubscribe(this.props.tenor);
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
			tenor
		} = this.props;
		return (
			<div>
				<MediaQuery minDeviceWidth={900}>
					<Layout>
						<Header />
						<SContent>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<TimeSeriesCard />
								<StateCard tenor={tenor} locale={locale} states={states} />
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<PriceCard
									tenor={tenor}
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
									refresh={refresh}
								/>
							</SDivFlexCenter>
							<SDivFlexCenter center horizontal marginBottom="20px;">
								<ConversionCard locale={locale} conversions={conversions} />
								<OperationCard
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
					<StateCard tenor={tenor} locale={locale} states={states} mobile />
					<PriceCard
						tenor={tenor}
						locale={locale}
						states={states}
						sourceLast={sourceLast}
						mobile
					/>
					{account !== CST.DUMMY_ADDR ? (
						<BalanceCard
							locale={locale}
							account={account}
							eth={eth}
							aToken={aToken}
							bToken={bToken}
							refresh={refresh}
							mobile
						/>
					) : null}
					{account !== CST.DUMMY_ADDR ? (
						<OperationCard
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
					{account !== CST.DUMMY_ADDR ? (
						<ConversionMCard locale={locale} conversions={conversions} />
					) : null}
				</MediaQuery>
			</div>
		);
	}
}
