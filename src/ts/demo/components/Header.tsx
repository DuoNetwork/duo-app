import * as React from 'react';
import duoIcon from '../../../images/DUO_icon.png';

export default class Header extends React.Component {
	public render() {
		return (
			<div className="header-wrapper">
				<div className="header">
					<div className="icon-wrapper">
						<img src={duoIcon} />
					</div>
					<div className="nav-button-wrapper">
						<a href="https://duo.network">HOME</a>
					</div>
				</div>
			</div>
		);
	}
}
