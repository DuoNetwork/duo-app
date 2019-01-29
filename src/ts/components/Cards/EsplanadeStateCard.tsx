// import { Tooltip } from 'antd';
// import * as d3 from 'd3';
// import successIcon from 'images/stauts/success.svg';
// import warningIcon from 'images/stauts/warning.svg';
import moment from 'moment';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { IEsplanadeStates } from 'ts/common/types';
import { esplanadeWrapper } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle } from './_styled';

interface IProps {
	locale: string;
	states: IEsplanadeStates;
}

export default class EsplanadeStateCard extends React.Component<IProps> {
	public render() {
		const { states, locale } = this.props;
		return (
			<SCard
				title={
					<SCardTitle>
						<a
							className="tag-content"
							href={
								'https://' +
								(__KOVAN__ ? 'kovan.' : '') +
								'etherscan.io/address/' +
								esplanadeWrapper.web3Wrapper.contractAddresses.MultiSigManagers[0]
									.address
							}
							target="_blank"
							style={{ color: 'white' }}
						>
							{CST.ESPLANADE.toUpperCase()}
						</a>
					</SCardTitle>
				}
				width={'420px'}
				margin={'0 10px 0 10px'}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList noMargin>
						<div className="status-list-wrapper">
							<ul style={{ paddingTop: '10px' }}>
								<li>
									<span className="title">{CST.TH_ESP_IS_STARTED[locale]}</span>
									<span className="content">
										{states.isStarted ? 'STARTED' : 'Not Started'}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_LAST_OPT_TIME[locale]}
									</span>
									<span className="content">
										{moment
											.utc(states.lastOperationTime)
											.format('YYYY-MM-DD HH:mm:SS')}
									</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_OPT_COOL_DOWN[locale]}
									</span>
									<span className="content">
										{states.operationCoolDown / (60 * 60 * 1000) + ' hours'}
									</span>
								</li>
								<li>
									<span className="title">{CST.TH_ESP_VOTING_STAGE[locale]}</span>
									<span className="content">{states.votingStage}</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_COLD_POOL_SIZE[locale]}
									</span>
									<span className="content">{states.poolSizes.cold}</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_HOT_POOL_SIZE[locale]}
									</span>
									<span className="content">{states.poolSizes.hot}</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_CUSTODIAN_POOL_SIZE[locale]}
									</span>
									<span className="content">{states.poolSizes.custodian}</span>
								</li>
								<li>
									<span className="title">
										{CST.TH_ESP_OTHER_CONTRACT_POOL_SIZE[locale]}
									</span>
									<span className="content">
										{states.poolSizes.otherContract}
									</span>
								</li>
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
