import * as React from 'react';
import * as CST from '../../common/constants';
import { IAddress, IAddresses } from '../../common/types';
import { SCard, SCardTitle } from './_styled';

interface IProps {
	addresses: IAddresses;
}

export default class AdminCard extends React.PureComponent<IProps> {
	public render() {
		const { addresses } = this.props;
		const data: object[] = [];
		for (const role in addresses) {
			const addr: IAddress = addresses[role];
			data.push({
				key: role,
				[CST.TH_ROLE]: role,
				[CST.TH_ADDRESS]: addr.address,
				[CST.TH_BALANCE]: addr.balance
			});
		}

		return (
			<SCard
				title={<SCardTitle>{CST.TH_ADMIN.toUpperCase()}</SCardTitle>}
				width="560px"
				margin="0 10px 0 0"
			>
				<button>
					{CST.TH_COLLLECT_FEE}
				</button>
				<button>
					{CST.TH_ADD_ADDR}
				</button>
				<button>
					{CST.TH_RM_ADDR}
				</button>
				<button>
					{CST.TH_UPDATE_ROLE}
				</button>
				<button>
					{CST.TH_SET_VALUE}
				</button>
			</SCard>
		);
	}
}
