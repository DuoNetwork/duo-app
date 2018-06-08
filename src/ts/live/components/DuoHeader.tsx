import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';
import { SDivFlexCenter, SHeader } from './_styled';

export default class Header extends React.PureComponent {
	public render() {
		return (
			<SHeader>
				<SDivFlexCenter horizontal width='1280px'>
					<div className="icon-wrapper">
						<img src={duoIcon} />
					</div>
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
