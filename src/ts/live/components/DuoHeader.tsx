import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import { ETH_KOVAN_ID, ETH_MAINNET_ID } from '../common/constants';
import { SDivFlexCenter, SHeader } from './_styled';

interface IProps {
	network: number;
}

export default class Header extends React.PureComponent<IProps> {
	public render() {
		const { network } = this.props;
		return (
			<SHeader>
				<SDivFlexCenter horizontal width="1280px">
					<div className="icon-wrapper">
						<img src={duoIcon} />
					</div>
					{network ? (
						(__KOVAN__ && network !== ETH_KOVAN_ID) ||
						(!__KOVAN__ && network !== ETH_MAINNET_ID) ? (
							<span className='error-msg'>
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
							<a href="./status.html">STATUS</a>
						</div>
					</SDivFlexCenter>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
