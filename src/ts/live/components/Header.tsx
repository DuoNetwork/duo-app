import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import conversion from '../../../static/conversion.json';
import * as CST from '../common/constants';
import { ColorStyles } from '../common/styles';
import util from '../common/util';
import { SDivFlexCenter, SHeader } from './_styled';
import LocaleSelect from './Common/LocaleSelect';
import ProviderRadio from './Common/ProviderRadio';

interface IProps {
	network: number;
	to: string;
	width?: string;
	account?: string;
	locale?: string;
	refresh?: () => any;
	updateLocale?: (locale: string) => any;
}

const RankDiv = (props: { rank: number; volume: string; locale: string }) => {
	const { rank, volume, locale} = props;
	return (
		<div style={{ color: ColorStyles.TextWhiteAlphaL, fontWeight: 200 }}>
			{CST.TH_RANK[locale] + ':'}<span style={{ color: ColorStyles.TextRedAlpha, fontWeight: 500 }}>
				{' ' + rank}
			</span>, {CST.TH_TOTAL_VOL[locale]}:{' '}
			<span style={{ color: ColorStyles.TextRedAlpha, fontWeight: 500 }}>{volume}</span> ETH
			({CST.TH_UPDATE_DAILY[locale]})
		</div>
	);
};

export default class Header extends React.PureComponent<IProps> {
	public render() {
		const { network, to, width, refresh, account, locale, updateLocale } = this.props;
		const accountConversion =
			account && conversion.conversion[account] ? conversion.conversion[account] : null;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={width ? width : '1200px'}>
					<div className="icon-wrapper">
						<a href="https://duo.network">
							<img src={duoIcon} />
						</a>
					</div>
					{network ? (
						(__KOVAN__ && network !== CST.ETH_KOVAN_ID) ||
						(!__KOVAN__ && network !== CST.ETH_MAINNET_ID) ? (
							<span className="error-msg">
								{' '}
								This page is built for {__KOVAN__ ? 'KOVAN' : 'MainNet'}, pleas
								choose the corret network in Metamask
							</span>
						) : accountConversion ? (
							<RankDiv
								rank={accountConversion.rank}
								volume={util.formatBalance(accountConversion.volume)}
								locale={locale || CST.LOCALE_EN}
							/>
						) : (
							''
						)
					) : null}
					<SDivFlexCenter horizontal>
						<div className="nav-button-wrapper">
							<a href="./GettingStarted.pdf" target="_blank">
								{CST.TH_GUIDE[locale || CST.LOCALE_EN].toUpperCase()}
							</a>
						</div>
						<div className="nav-button-wrapper">
							<a
								href={
									'./' +
									(to === CST.TH_APP ? 'index' : to.toLowerCase()) +
									'.html'
								}
							>
								{to.toUpperCase()}
							</a>
						</div>
						{refresh ? <ProviderRadio refresh={refresh} /> : null}
						{locale && updateLocale ? (
							<LocaleSelect locale={locale} onSelect={updateLocale} />
						) : null}
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
