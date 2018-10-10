import * as React from 'react';
import * as CST from '../../common/constants';
import { IWSOrderBookSubscription } from '../../common/types';
import util from '../../common/util';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle } from './_styled';
import { SCardList } from './_styled';

interface IProps {
	orderBookSubscription: IWSOrderBookSubscription;
	locale: string;
}

interface IState {
	orderBookSubscription: IWSOrderBookSubscription;
}

export default class TimeSeriesCard extends React.Component<IProps, IState> {
	public render() {
		const { orderBookSubscription, locale } = this.props;
		const title = CST.TH_ORDERBOOK.toUpperCase();
		const type = orderBookSubscription.type;
		const askArray: number[][] = [];
		const bidArray: number[][] = [];
		if (orderBookSubscription) {
			const asks = orderBookSubscription.asks;
			const bids = orderBookSubscription.bids;
			for (const bid of bids) bidArray.push([bid.amount, bid.price]);
			for (const ask of asks) askArray.push([ask.amount, ask.price]);
		}
		askArray.sort((a, b) => a[1] - b[1]);
		bidArray.sort((a, b) => b[1] - a[1]);
		return (
			<SCard title={<SCardTitle>{title}</SCardTitle>} width="800px" margin="0 10px 0 0">
				<SDivFlexCenter center horizontal>
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li className="right">
									<span className="title">{CST.TH_BID.toUpperCase()}</span>
								</li>
								{type !== '' && bidArray.length ? (
									util.range(0, bidArray.length).map((i: any) => (
										<li key={i}>
											<span className="content">
												{i < bidArray.length
													? bidArray[i][0] !== 0
														? util.formatNumber(bidArray[i][0])
														: '-'
													: '-'}
											</span>
											<span className="title">
												{i < bidArray.length
													? bidArray[i][1] !== 0
														? util.formatNumber(bidArray[i][1])
														: '-'
													: '-'}
											</span>
										</li>
									))
								) : (
									<li className="block-title t-center">
										{CST.TH_LOADING[locale]}
									</li>
								)}
							</ul>
						</div>
					</SCardList>

					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li>
									<span className="title">{CST.TH_ASK.toUpperCase()}</span>
								</li>
								{askArray.length ? (
									util.range(0, askArray.length).map((i: any) => (
										<li key={i}>
											<span className="title">
												{i < askArray.length
													? askArray[i][1] !== 0
														? util.formatNumber(askArray[i][1])
														: '-'
													: '-'}
											</span>
											<span className="content">
												{i < askArray.length
													? askArray[i][0] !== 0
														? util.formatNumber(askArray[i][0])
														: '-'
													: '-'}
											</span>
										</li>
									))
								) : (
									<li className="block-title t-center">
										{CST.TH_LOADING[locale]}
									</li>
								)}
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
