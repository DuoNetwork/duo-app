import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import duoIcon from 'images/DUO_icon.png';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as CST from 'ts/common/constants';
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
		const path = (location as any).pathname.toLowerCase();
		const isStatusPage = path.includes(CST.TH_STATUS.EN.toLowerCase());
		const isBeethovenPage = path.includes(WrapperConstants.BEETHOVEN.toLowerCase());
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={'1200px'}>
					<Link to={'/'}>
						<div className="icon-wrapper">
							<img src={duoIcon} />
						</div>
					</Link>
					{network ? (
						(__KOVAN__ && network !== WrapperConstants.ETH_KOVAN_ID) ||
						(!__KOVAN__ && network !== WrapperConstants.ETH_MAINNET_ID) ? (
							<span className="error-msg">{CST.TT_NETWORK_CHECK[locale]}</span>
						) : (
							''
						)
					) : null}
					<SDivFlexCenter horizontal>
						<a
							style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}
							href="https://duonetwork.zendesk.com/hc/en-us"
							target="_blank"
						>
							Help
						</a>
						{isBeethovenPage && __KOVAN__ ? (
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
						{!isStatusPage && __KOVAN__ ? (
							<div className="nav-button-wrapper">
								<Link to={'/status'}>{CST.TH_STATUS[locale].toUpperCase()}</Link>
							</div>
						) : null}
						<ProviderRadio refresh={() => refresh(path)} />
						<LocaleSelect locale={locale} onSelect={updateLocale} />
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
