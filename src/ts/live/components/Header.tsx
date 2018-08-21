import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import * as CST from '../common/constants';
import { SDivFlexCenter, SHeader } from './_styled';
import LocaleSelect from './Common/LocaleSelect';
import ProviderRadio from './Common/ProviderRadio';

interface IProps {
	network: number;
	to: string;
	toText?: string;
	width?: string;
	locale?: string;
	refresh?: () => any;
	updateLocale?: (locale: string) => any;
}

export default class Header extends React.PureComponent<IProps> {
	public render() {
		const { network, toText, to, width, refresh, updateLocale } = this.props;
		const locale = this.props.locale || CST.LOCALE_EN;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={width ? width : '1200px'}>
					<div className="icon-wrapper">
						<a
							href={
								'https://duo.network' + (locale === CST.LOCALE_CN ? '/cn.html' : '')
							}
						>
							<img src={duoIcon} />
						</a>
					</div>
					{network ? (
						(__KOVAN__ && network !== CST.ETH_KOVAN_ID) ||
						(!__KOVAN__ && network !== CST.ETH_MAINNET_ID) ? (
							<span className="error-msg">{CST.TT_NETWORK_CHECK[locale]}</span>
						) : (
							''
						)
					) : null}
					<SDivFlexCenter horizontal>
						<div className="nav-button-wrapper">
							<a
								href={
									'./GettingStarted' +
									(locale === CST.LOCALE_CN
										? '_CN'
										: locale === CST.LOCALE_JP
											? '_JP'
											: '') +
									'.pdf'
								}
								target="_blank"
							>
								{CST.TH_GUIDE[locale].toUpperCase()}
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
								{(toText || to).toUpperCase()}
							</a>
						</div>
						{refresh ? <ProviderRadio refresh={refresh} /> : null}
						{updateLocale ? (
							<LocaleSelect locale={locale} onSelect={updateLocale} />
						) : null}
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
