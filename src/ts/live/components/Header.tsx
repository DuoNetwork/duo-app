import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import conversion from '../../../static/conversion-2018-07-05.json';
import * as CST from '../common/constants';
import { ColorStyles } from '../common/styles';
import util from '../common/util';
import { SDivFlexCenter, SHeader } from './_styled';
import ProviderRadio from './Common/ProviderRadio';

interface IProps {
	network: number;
	to: string;
	width?: string;
	account?: string;
	refresh?: () => any;
}

const RankDiv = (props: { rank: number; volume: string }) => {
	const { rank, volume } = props;
	return (
		<div style={{ color: ColorStyles.TextWhiteAlphaL, fontWeight: 200 }}>
			Rank:<span style={{ color: ColorStyles.TextRedAlpha, fontWeight: 500 }}>
				{' ' + rank}
			</span>, Total Volume:{' '}
			<span style={{ color: ColorStyles.TextRedAlpha, fontWeight: 500 }}>{volume}</span> ETH
			(updated daily)
		</div>
	);
};

export default class Header extends React.PureComponent<IProps> {
	public render() {
		const { network, to, width, refresh, account } = this.props;
		const accountConversion =
			account && conversion.conversion[account] ? conversion.conversion[account] : null;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={width ? width : '1200px'}>
					<div className="icon-wrapper">
						<img src={duoIcon} />
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
							/>
						) : (
							''
						)
					) : null}
					<SDivFlexCenter horizontal>
						<div className="nav-button-wrapper">
							<a href="https://duo.network" target="_blank">
								HOME
							</a>
						</div>
						<div className="nav-button-wrapper">
							<a href="./GettingStarted.pdf" target="_blank">
								GUIDE
							</a>
						</div>
						<div className="nav-button-wrapper">
							<a
								href={
									'./' +
									(to === CST.TH_APP ? 'index' : to.toLowerCase()) +
									'.html'
								}
								target="_blank"
							>
								{to.toUpperCase()}
							</a>
						</div>
						{refresh ? <ProviderRadio refresh={refresh} /> : null}
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
