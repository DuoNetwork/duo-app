import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { Layout } from 'antd';
import ethIcon from 'images/ethIconB.png';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as CST from 'ts/common/constants';
import { ColorStyles } from 'ts/common/styles';
import { dualClassWrappers } from 'ts/common/wrappers';
import Header from 'ts/containers/HeaderContainer';
import { SContent, SDivFlexCenter } from '../_styled';
import { SCard, SCardTag, SCardTitle } from '../Cards/_styled';

export default class Duo extends React.Component {
	public componentDidMount() {
		document.title = 'DUO | Trustless Derivatives';
	}

	public render() {
		const beethovenTenors = Object.keys(dualClassWrappers[WrapperConstants.BEETHOVEN]);
		//const mozartTenors = Object.keys(dualClassWrappers[WrapperConstants.MOZART]);
		return (
			<Layout>
				<Header />
				<SContent>
					{__KOVAN__ ? (
						<SCard
							title={<SCardTitle>{CST.TH_CUSTODIANS.toUpperCase()}</SCardTitle>}
							width={'960px'}
							margin={'0 0 20px 0'}
						>
							<SDivFlexCenter
								horizontal
								padding="0 10px"
								style={{ display: 'inline-flex' }}
							>
								{beethovenTenors.map(tenor => (
									<Link
										key={tenor}
										to={`/${WrapperConstants.BEETHOVEN.toLowerCase()}/${tenor.toLowerCase()}`}
									>
										<SCardTag style={{ marginRight: '20px' }}>
											<div className="bg-logo">
												<img src={ethIcon} />
											</div>
											<div className="tag-content">
												<div className={'tag-price USD'}>
													{WrapperConstants.BEETHOVEN.toUpperCase()}
												</div>
											</div>
											<div className="tag-subtext">
												<div
													style={{
														color: ColorStyles.ThemeTextAlpha,
														marginLeft: 20
													}}
												>
													{tenor.toUpperCase()}
												</div>
											</div>
										</SCardTag>
									</Link>
								))}
							</SDivFlexCenter>
							{/* <SDivFlexCenter
							horizontal
							padding="0 10px"
							style={{ display: 'inline-flex' }}
						>
							{mozartTenors.map(tenor => (
								<Link
									key={tenor}
									to={`/${WrapperConstants.MOZART.toLowerCase()}/${tenor.toLowerCase()}`}
								>
									<SCardTag style={{ marginRight: '20px' }}>
										<div className="bg-logo">
											<img src={ethIcon} />
										</div>
										<div className="tag-content">
											<div className={'tag-price USD'}>
												{WrapperConstants.MOZART.toUpperCase()}
											</div>
										</div>
										<div className="tag-subtext">
											<div
												style={{
													color: ColorStyles.ThemeTextAlpha,
													marginLeft: 20
												}}
											>
												{tenor.toUpperCase()}
											</div>
										</div>
									</SCardTag>
								</Link>
							))}
						</SDivFlexCenter> */}
						</SCard>
					) : null}
					<SCard
						title={<SCardTitle>{CST.TH_ORACLES.toUpperCase()}</SCardTitle>}
						width={'960px'}
						margin={'0 0 20px 0'}
					>
						<SDivFlexCenter
							horizontal
							padding="0 10px"
							style={{ display: 'inline-flex' }}
						>
							<Link to={'/' + CST.TH_MAGI.toLowerCase()}>
								<SCardTag style={{ marginRight: '40px' }}>
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
												color: ColorStyles.ThemeTextAlpha,
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
					<SCard
						title={<SCardTitle>{CST.TH_CONTRACTS.toUpperCase()}</SCardTitle>}
						width={'960px'}
						margin={'0 0 0 0'}
					>
						<SDivFlexCenter
							horizontal
							padding="0 10px"
							style={{ display: 'inline-flex' }}
						>
							<Link to={'/' + 'staking'}>
								<SCardTag style={{ marginRight: '40px' }}>
									<div className="bg-logo">
										<img src={ethIcon} />
									</div>
									<div className="tag-content">
										<div className={'tag-price USD'}>STAKING FLEX</div>
									</div>
									<div className="tag-subtext">
										<div
											style={{
												color: ColorStyles.ThemeTextAlpha,
												marginLeft: 20
											}}
										>
											DUO
										</div>
									</div>
								</SCardTag>
							</Link>
							<Link to={'/' + 'stakingterm'}>
								<SCardTag style={{ marginRight: '40px' }}>
									<div className="bg-logo">
										<img src={ethIcon} />
									</div>
									<div className="tag-content">
										<div className={'tag-price USD'}>STAKING TERM</div>
									</div>
									<div className="tag-subtext">
										<div
											style={{
												color: ColorStyles.ThemeTextAlpha,
												marginLeft: 20
											}}
										>
											DUO
										</div>
									</div>
								</SCardTag>
							</Link>
							<Link to={'/' + 'inlinewarrant'}>
								<SCardTag>
									<div className="bg-logo">
										<img src={ethIcon} />
									</div>
									<div className="tag-content">
										<div className={'tag-price USD'}>INLINE WARRANTS</div>
									</div>
									<div className="tag-subtext">
										<div
											style={{
												color: ColorStyles.ThemeTextAlpha,
												marginLeft: 20
											}}
										>
											DUO
										</div>
									</div>
								</SCardTag>
							</Link>
						</SDivFlexCenter>
					</SCard>
				</SContent>
			</Layout>
		);
	}
}
