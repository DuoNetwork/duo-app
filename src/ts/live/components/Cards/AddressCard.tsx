// import { Table } from 'antd';
// import * as React from 'react';
// import * as CST from '../../common/constants';
// import contract from '../../common/contract';
// import { IAddress, IBeethovenAddresses, ITableRecord } from '../../common/types';
// import util from '../../common/util';
// import { SCard, SCardTitle, STableWrapper } from './_styled';

// const { Column } = Table;

// interface IProps {
// 	addresses: IBeethovenAddresses;
// 	addressPool: IAddress[];
// 	account: string;
// }

// export default class AddressCard extends React.Component<IProps> {
// 	public render() {
// 		const { addresses, addressPool, account } = this.props;
// 		const data: object[] = [];
// 		const isInPool = addressPool.findIndex(a => a.address === account) >= 0;
// 		const isPoolManager = account === addresses.poolManager.address;
// 		for (const role in addresses) {
// 			const addr: IAddress = addresses[role];
// 			data.push({
// 				key: role,
// 				[CST.TH_ROLE]: role,
// 				[CST.TH_ADDRESS.EN]: addr.address,
// 				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
// 				[CST.TH_LINK]:
// 					'https://' +
// 					(__KOVAN__ ? 'kovan.' : '') +
// 					'etherscan.io/address/' +
// 					addr.address,
// 				[CST.TH_ACTION]:
// 					role === 'poolManager' ? (
// 						''
// 					) : (
// 						<button
// 							className="form-button"
// 							disabled={!isInPool}
// 							onClick={() => contract.updateAddress(account, addr.address)}
// 						>
// 							{CST.TH_UPDATE_ROLE}
// 						</button>
// 					)
// 			});
// 		}
// 		addressPool.forEach((addr, i) =>
// 			data.push({
// 				key: CST.TH_POOL + i,
// 				[CST.TH_ROLE]: CST.TH_POOL + i,
// 				[CST.TH_ADDRESS.EN]: addr.address,
// 				[CST.TH_BALANCE.EN]: util.formatBalance(addr.balance),
// 				[CST.TH_LINK]:
// 					'https://' +
// 					(__KOVAN__ ? 'kovan.' : '') +
// 					'etherscan.io/address/' +
// 					addr.address,
// 				[CST.TH_ACTION]: (
// 					<button
// 						className="form-button"
// 						disabled={!isPoolManager}
// 						onClick={() => contract.removeAddress(account, addr.address)}
// 					>
// 						{CST.TH_RM_ADDR}
// 					</button>
// 				)
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
// 						<Column
// 							title={CST.TH_ACTION}
// 							dataIndex={CST.TH_ACTION}
// 							key={CST.TH_ACTION}
// 							className={'address-table-action-col'}
// 						/>
// 					</Table>
// 				</STableWrapper>
// 			</SCard>
// 		);
// 	}
// }
