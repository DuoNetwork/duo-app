import * as React from 'react';
import * as CST from '../../common/constants';
import contract from '../../common/contract';
import util from '../../common/util';
import { SCardAssetTag, SRefreshButton } from './_styled';

interface IProps {
	icon: string;
	name: string;
	value: number;
	allowance?: number;
	locale?: string;
	account?: string;
	mobile?: boolean;
}
export default class BalanceInfo extends React.Component<IProps> {
	public render() {
		const { icon, name, value, allowance, locale, account, mobile } = this.props;
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
							{allowance !== undefined ? (
								<div className="tag-subtext">
									{util.formatBalance(Math.min(value, allowance)) +
										' ' +
										CST.TH_ALLOWANCE[locale || CST.LOCALE_EN]}
									<SRefreshButton
										icon="plus-square-o"
										disabled={!account || account === CST.DUMMY_ADDR}
										onClick={() =>
											account &&
											contract.duoApprove(
												account,
												__KOVAN__
													? CST.CUSTODIAN_ADDR_KOVAN
													: CST.CUSTODIAN_ADDR_MAIN,
												1e8
											)
										}
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</SCardAssetTag>
		);
	}
}
