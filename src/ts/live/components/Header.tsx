import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import * as CST from '../common/constants';
import { SDivFlexCenter, SHeader } from './_styled';

interface IProps {
	network: number;
	to: string;
	width?: string
}

export default class Header extends React.PureComponent<IProps> {
	public render() {
		const { network, to, width } = this.props;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={width ?  width : "1200px"}>
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
						) : null
					) : null}
					<SDivFlexCenter horizontal>
						<div className="nav-button-wrapper">
							<a href="https://duo.network">HOME</a>
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
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
