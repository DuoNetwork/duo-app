import * as React from 'react';
import util from 'ts/common/util';
import { SCardAssetTag } from './_styled';

interface IProps {
	icon: string;
	name: string;
	value: number;
	mobile?: boolean;
}
export default class BalanceInfo extends React.Component<IProps> {
	public render() {
		const { icon, name, value, mobile } = this.props;
		return (
			<SCardAssetTag mobile={mobile}>
				<div className="bg-logo">
					<img src={icon} />
				</div>
				<div className="tag-title">
					<h3>{name}</h3>
				</div>
				<div className="tag-content">
					<div>
						<div>
							<div className={'tag-price'}>{util.formatBalance(value)}</div>
						</div>
					</div>
				</div>
			</SCardAssetTag>
		);
	}
}
