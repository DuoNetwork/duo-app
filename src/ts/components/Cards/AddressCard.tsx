// import { Table } from 'antd';
// import * as React from 'react';
// import * as CST from '../../common/constants';
// // import contract from '../../common/contract';
// import {IEsplanadeAddresses, IEsplanadeStates, ITableRecord } from '../../common/types';
// import util from '../../common/util';
// import { SCard, SCardTitle, STableWrapper } from './_styled';

// const { Column } = Table;

// interface IProps {
// 	addresses: IEsplanadeAddresses;
// 	states: IEsplanadeStates;
// 	account: string;
// }

// export default class AddressCard extends React.Component<IProps> {
// 	public render() {
// 		const { addresses, states, account } = this.props;
// 		const data: object[] = [];
// 		const isInHotPool = states.poolAddrsHot.findIndex(a => a.address === account) >= 0;
// 		const isInColdPool = states.poolAddrsCold.findIndex(a => a.address === account) >= 0;
// 		const isModerator = account === addresses.moderator.address;
// 		for (const role in addresses) {
// 			const addr = addresses[role];
// 			data.push({
// 				key: role,
// 				[CST.TH_ROLE]: role,
// 				[CST.TH_ADDRESS.EN]: addr.address,
// 				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
// 				[CST.TH_LINK]:
// 					'https://' +
// 					(__KOVAN__ ? 'kovan.' : '') +
// 					'etherscan.io/address/' +
// 					addr.address
// 			});
// 		}
// 		states.poolAddrsHot.forEach((addr, i) =>
// 			data.push({
// 				key: CST.TH_POOL + i,
// 				[CST.TH_ROLE]: CST.TH_HOT_ADDRESS + i,
// 				[CST.TH_ADDRESS.EN]: addr.address,
// 				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
// 				[CST.TH_LINK]:
// 					'https://' +
// 					(__KOVAN__ ? 'kovan.' : '') +
// 					'etherscan.io/address/' +
// 					addr.address
// 				// [CST.TH_ACTION]: (
// 				// 	<button
// 				// 		className="form-button"
// 				// 		disabled={!isModerator}
// 				// 		onClick={() => contract.removeAddress(account, addr.address)}
// 				// 	>
// 				// 		{CST.TH_RM_ADDR}
// 				// 	</button>
// 				// )
// 			})
// 		);

// 		states.poolAddrsCold.forEach((addr, i) =>
// 			data.push({
// 				key: CST.TH_POOL + i,
// 				[CST.TH_ROLE]: CST.TH_COLD_ADDRESS + i,
// 				[CST.TH_ADDRESS.EN]: addr.address,
// 				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
// 				[CST.TH_LINK]:
// 					'https://' +
// 					(__KOVAN__ ? 'kovan.' : '') +
// 					'etherscan.io/address/' +
// 					addr.address
// 				// [CST.TH_ACTION]: (
// 				// 	<button
// 				// 		className="form-button"
// 				// 		disabled={!isModerator}
// 				// 		onClick={() => contract.removeAddress(account, addr.address)}
// 				// 	>
// 				// 		{CST.TH_RM_ADDR}
// 				// 	</button>
// 				// )
// 			})
// 		);

// 		return (
// 			<SCard
// 				title={<SCardTitle>{CST.TH_ADDRESS.EN.toUpperCase()}</SCardTitle>}
// 				width="1000px"
// 				margin="0 0 0 0"
// 				inlinetype="table"
// 			>
// 				<STableWrapper>
// 					<Table dataSource={data} pagination={false}>
// 						{[
// 							CST.TH_ROLE,
// 							CST.TH_ADDRESS.EN,
// 							CST.TH_BALANCE.EN
// 						].map(th => (
// 							<Column
// 								title={th}
// 								dataIndex={th}
// 								key={th}
// 								onCell={(record: ITableRecord) => ({
// 									onClick: () => window.open(record[CST.TH_LINK])
// 								})}
// 							/>
// 						))}
// 						{/* <Column
// 							title={CST.TH_ACTION}
// 							dataIndex={CST.TH_ACTION}
// 							key={CST.TH_ACTION}
// 							className={'address-table-action-col'}
// 						/> */}
// 					</Table>
// 				</STableWrapper>
// 			</SCard>
// 		);
// 	}
// }
