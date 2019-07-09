import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import dynamoUtil from './dynamoUtil';
import * as StakingCST from './stakingCST';
import { IReferral } from './types';
class ReferralUtil {
	public getUTCNowTimestamp() {
		return moment().valueOf();
	}

	public async checkExist(account: string) {
		const data = await dynamoUtil.scanData({ TableName: StakingCST.REFERRALTABLE });
		const addressList: string[] = [];
		if (data.Items) data.Items.map(item => {
			addressList.push((item as any).address.S)
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
		}
		const data = await dynamoUtil.queryData(params);
		console.log('*******');
		console.log(data);
	}
}

const referralUtil = new ReferralUtil();
export default referralUtil;
