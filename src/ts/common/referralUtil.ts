import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import dynamoUtil from './dynamoUtil';
import * as StakingCST from './stakingCST';
import { IAddressInfo, IReferral, IStakingChild, IStakingNode } from './types';
class ReferralUtil {
	public getUTCNowTimestamp() {
		return moment().valueOf();
	}

	public async checkExist(account: string) {
		const data = await dynamoUtil.scanData({ TableName: StakingCST.REFERRALTABLE });
		const addressList: string[] = [];
		if (data.Items)
			data.Items.map(item => {
				addressList.push((item as any).address.S);
			});
		if (addressList.includes(account)) {
			const index = addressList.indexOf(account);
			return (data.Items as any)[index].referralCode.S;
		}
		return '';
	}

	public async insertReferralEntry(item: IReferral) {
		const data: AttributeMap = {
			address: { S: item.address },
			referralCode: { S: item.referralCode },
			signHash: { S: item.signHash },
			updatedAt: { S: this.getUTCNowTimestamp() + '' }
		};
		const params = {
			TableName: StakingCST.REFERRALTABLE,
			Item: data
		};

		await dynamoUtil.insertData(params);
	}

	public async getAddressInfo(account: string) {
		const params = {
			TableName: StakingCST.STAKINGTABLE,
			KeyConditionExpression: 'address = :address',
			ExpressionAttributeValues: {
				[':address']: { S: account }
			}
		};
		const data = await dynamoUtil.queryData(params);
		if (data.Count) {
			const rawRA = (data.Items as any)[0].referralAward;
			const rawS0 = (data.Items as any)[0].staking0Award;
			const rawS60 = (data.Items as any)[0].staking60Award;
			const addressInfo: IAddressInfo = {};
			if (rawRA)
				if ((rawRA as any).S !== 'no referee') {
					const rawChildList = rawRA.S.split(';');
					const childList: IStakingChild[] = [];
					rawChildList.forEach((child: string) => {
						const rawData = child.split(',');
						const childData = {
							address: rawData[0],
							daily: Number(rawData[1]),
							accumulated: Number(rawData[2])
						};
						childList.push(childData);
					});
					addressInfo.children = childList;
				}
			if (rawS0) {
				const rawNodeList = rawS0.S.split(';');
				const nodeList: IStakingNode[] = [];
				rawNodeList.forEach((node: string) => {
					const rawData = node.split(',');
					const nodeData = {
						name: rawData[0],
						daily: Number(rawData[1]),
						accumulated: Number(rawData[2])
					};
					nodeList.push(nodeData);
				});
				addressInfo.staking0 = nodeList;
			}
			if (rawS60) {
				const rawNodeList = rawS60.S.split(';');
				const nodeList: IStakingNode[] = [];
				rawNodeList.forEach((node: string) => {
					const rawData = node.split(',');
					const nodeData = {
						name: rawData[0],
						daily: Number(rawData[1]),
						accumulated: Number(rawData[2])
					};
					nodeList.push(nodeData);
				});
				addressInfo.staking60 = nodeList;
			}
			return addressInfo;
		} else return {};
	}
}

const referralUtil = new ReferralUtil();
export default referralUtil;
