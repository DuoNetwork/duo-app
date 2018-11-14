import { Layout } from 'antd';
import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ethIcon from '../../../images/ethIcon.png';
import * as CST from '../common/constants';
import { ColorStyles } from '../common/styles';
import BeethovenAdmin from '../containers/BeethovenAdminCointainer';
import Beethoven from '../containers/BeethovenContainer';
import Header from '../containers/HeaderContainer';
import Magi from '../containers/MagiContainer';
import Status from '../containers/StatusContainer';
import { SContent, SDivFlexCenter } from './_styled';
import { SCard, SCardTag, SCardTitle } from './Cards/_styled';
export default class Duo extends React.Component {
	public componentDidMount() {
		document.title = 'DUO | Trustless Derivatives';
	}

	public render() {
		return (
			<div>
				<Switch>
					<Route path={'/beethoven/admin'} render={() => <BeethovenAdmin />} />
					<Route path={'/beethoven'} render={() => <Beethoven />} />
					<Route path={'/magi'} render={() => <Magi />} />
					<Route path={'/status'} render={() => <Status />} />
					<Route
						render={() => (
							<Layout>
								<Header />
								<SContent>
									<SCard
										title={
											<SCardTitle>
												{CST.TH_CUSTODIANS.toUpperCase()}
											</SCardTitle>
										}
										width={'960px'}
										margin={'0 0 20px 0'}
									>
										<SDivFlexCenter horizontal padding="0 10px">
											<Link to={'/' + CST.TH_BEETHOVEN.toLowerCase()}>
												<SCardTag>
													<div className="bg-logo">
														<img src={ethIcon} />
													</div>
													<div className="tag-content">
														<div className={'tag-price USD'}>
															{CST.TH_BEETHOVEN.toUpperCase()}
														</div>
													</div>
												</SCardTag>
											</Link>
											<SCardTag disabled>
												<div className="bg-logo">
													<img src={ethIcon} />
												</div>
												<div className="tag-content">
													<div className={'tag-price USD'}>
														{CST.TH_MOZART.toUpperCase()}
													</div>
												</div>
												<div className="tag-subtext">
													<div
														style={{
															color: ColorStyles.TextWhiteAlphaL,
															marginLeft: 20
														}}
													>
														Coming Soon
													</div>
												</div>
											</SCardTag>
											<SCardTag disabled>
												<div className="bg-logo">
													<img src={ethIcon} />
												</div>
												<div className="tag-content">
													<div className={'tag-price USD'}>
														{CST.TH_COVERED_OPTIONS.toUpperCase()}
													</div>
												</div>
												<div className="tag-subtext">
													<div
														style={{
															color: ColorStyles.TextWhiteAlphaL,
															marginLeft: 20
														}}
													>
														Coming Soon
													</div>
												</div>
											</SCardTag>
										</SDivFlexCenter>
									</SCard>
									<SCard
										title={
											<SCardTitle>{CST.TH_ORACLES.toUpperCase()}</SCardTitle>
										}
										width={'960px'}
										margin={'0 0 0 0'}
									>
										<SDivFlexCenter horizontal padding="0 10px">
											<Link to={'/' + CST.TH_MAGI.toLowerCase()}>
												<SCardTag>
													<div className="bg-logo">
														<img src={ethIcon} />
													</div>
													<div className="tag-content">
														<div className={'tag-price USD'}>
															{CST.TH_MAGI.toUpperCase()}
														</div>
													</div>
													<div className="tag-subtext">
													<div
														style={{
															color: ColorStyles.TextWhiteAlphaL,
															marginLeft: 20
														}}
													>
														ETH / USD
													</div>
												</div>
												</SCardTag>
											</Link>
										</SDivFlexCenter>
									</SCard>
								</SContent>
							</Layout>
						)}
					/>
				</Switch>
			</div>
		);
	}
}
