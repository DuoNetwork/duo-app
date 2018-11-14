import * as React from 'react';
import { Link } from 'react-router-dom';
import duoIcon from '../../../images/DUO_icon.png';
import * as CST from '../common/constants';
import { SDivFlexCenter, SHeader } from './_styled';
import LocaleSelect from './Common/LocaleSelect';
import ProviderRadio from './Common/ProviderRadio';

interface IProps {
	location: object;
	network: number;
	locale: string;
	refresh: (path: string) => any;
	updateLocale: (locale: string) => any;
}

export default class Header extends React.Component<IProps> {
	public render() {
		const { location, network, refresh, updateLocale } = this.props;
		const locale = this.props.locale || CST.LOCALE_EN;
		const path: string = (location as any).pathname;
		const parts = path.split('/');
		const base = parts.slice(0, parts.length - 1).join('/') + '/';
		const page = parts[parts.length - 1];
		const isHome = ['', 'index.html'].includes(page);
		const isBeethovenPage = CST.TH_BEETHOVEN.toLowerCase() === page;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={'1200px'}>
					{isHome ? (
						<div className="icon-wrapper">
							<a
								href={
									'https://duo.network' +
									(locale === CST.LOCALE_CN ? '/cn.html' : '')
								}
							>
								<img src={duoIcon} />
							</a>
						</div>
					) : (
						<div className="nav-button-wrapper">
							<Link to={'/'}>{CST.TH_HOME[locale].toUpperCase()}</Link>
						</div>
					)}

					{network ? (
						(__KOVAN__ && network !== CST.ETH_KOVAN_ID) ||
						(!__KOVAN__ && network !== CST.ETH_MAINNET_ID) ? (
							<span className="error-msg">{CST.TT_NETWORK_CHECK[locale]}</span>
						) : (
							''
						)
					) : null}
					<SDivFlexCenter horizontal>
						{isBeethovenPage ? (
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
						) : null}
						{isBeethovenPage || isHome ? (
							<div className="nav-button-wrapper">
								<Link to={`${base}status`}>
									{CST.TH_STATUS[locale].toUpperCase()}
								</Link>
							</div>
						) : (
							<div className="nav-button-wrapper">
								<Link to={base + CST.TH_BEETHOVEN.toLowerCase()}>
									{CST.TH_BEETHOVEN.toUpperCase()}
								</Link>
							</div>
						)}
						<ProviderRadio refresh={() => refresh(page)} />
						<LocaleSelect locale={locale} onSelect={updateLocale} />
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
