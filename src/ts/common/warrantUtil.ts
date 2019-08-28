import { DynamoDB } from 'aws-sdk/clients/all';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import * as d3 from 'd3';
import moment from 'moment';
import * as CST from 'ts/common/constants';
import { web3Wrapper } from 'ts/common/wrappers';
import dynamoUtil from './dynamoUtil';
import * as StakingCST from './stakingCST';
//import { IAddressInfo, IStakingChild, IStakingNode } from './types';

class WarrantUtil {
	public getUTCNowTimestamp() {
		return moment().valueOf();
	}

	// public async insertReferralEntry(item: IReferral) {
	// 	const data: AttributeMap = {
	// 		address: { S: item.address.toLowerCase() },
	// 		referralCode: { S: item.referralCode.toLowerCase() },
	// 		signHash: { S: item.signHash },
	// 		updatedAt: { S: this.getUTCNowTimestamp() + '' }
	// 	};
	// 	const params = {
	// 		TableName: StakingCST.REFERRALTABLE,
	// 		Item: data
	// 	};

	// 	await dynamoUtil.insertData(params);
	// }

	public async getAddressInfo(account: string) {
		const params = {
			TableName: __KOVAN__ ? StakingCST.WARRENTTABLEKOVAN : StakingCST.WARRENTTABLE,
			KeyConditionExpression: 'address = :address',
			ExpressionAttributeValues: {
				[':address']: { S: account.toLowerCase() }
			}
		};
		let data: DynamoDB.QueryOutput = {};
		try {
			data = await dynamoUtil.queryData(params);
		} catch (error) {
			if (error.message.includes('Signature not yet current')) {
				console.log(error)
			}
		}
		if (data.Count) {
			const roundStakingAmount = (data.Items as any)[0].roundStakingAmount.S.split(',').map(
				(d: any) => Number(d)
			);
			const roundReturn = (data.Items as any)[0].roundReturn.S.split(',').map((d: any) =>
				Number(d)
			);
			const boundETH = (data.Items as any)[0].boundETH.S.split(',');
			const rangeETH = [
				d3.format(',.2f')(Number(boundETH[0]) * (1 + Number(boundETH[1]))),
				d3.format(',.2f')(Number(boundETH[0]) * (1 - Number(boundETH[2])))
			];
			const addressInfo = {
				roundStakingAmount: roundStakingAmount,
				roundReturn: roundReturn,
				boundETH: rangeETH,
				settleETH: Number((data.Items as any)[0].settleETH.S),
				date: moment(Number((data.Items as any)[0].updatedAt.S)).format('YYYY-MM-DD')
			};
			return addressInfo;
		} else return {};
	}

	public async getCurrentRoundInfo(account: string) {
		const params = {
			TableName: __KOVAN__ ? StakingCST.UIEVENTTABLEKOVAN : StakingCST.UIEVENTTABLE,
			KeyConditionExpression: 'eventKey = :eventKey',
			ExpressionAttributeValues: {
				[':eventKey']: { S: account.toLowerCase() }
			}
		};
		let data: DynamoDB.QueryOutput = {};
		try {
			data = await dynamoUtil.queryData(params);
		} catch (error) {
			console.log(error)
		}
		if (data.Count) {
			const records = [];
			for (const item of data.Items as any) {
				const receipt = await web3Wrapper.getTransactionReceipt(item.transactionHash.S);
				const timeout =
					moment().valueOf() - Number(item.updateAt.S) > CST.PENDING_TX_TIMEOUT;
				const entry = {
					date: Number(item.updateAt.S),
					amount: Number(item.amount.S),
					txHash: item.transactionHash.S,
					status: receipt
						? receipt.status
							? 'mined'
							: 'error'
						: timeout
						? 'timeout'
						: 'pending'
				};
				if (
					moment.utc(Number(item.updateAt.S)).format('YYYY-MM-DD') ===
					moment.utc().format('YYYY-MM-DD')
				)
					records.push(entry);
			}
			records.sort((a, b) => a.date - b.date);
			return records;
		} else return [];
	}

	public async insetStakingEntry(item: any) {
		const data: AttributeMap = {
			eventKey: { S: item.address.toLowerCase() },
			amount: { S: item.amount },
			transactionHash: { S: item.txHash },
			updateAt: { S: this.getUTCNowTimestamp() + '' }
		};
		const params = {
			TableName: __KOVAN__ ? StakingCST.UIEVENTTABLEKOVAN : StakingCST.UIEVENTTABLE,
			Item: data
		};

		await dynamoUtil.insertData(params);
	}

	public async getBoundaries() {
		const params = {
			TableName: __KOVAN__ ? StakingCST.BOUNDARIESTABLEKOVAN : StakingCST.BOUNDARIESTABLE,
			KeyConditionExpression: 'quoteBase = :quoteBase',
			ExpressionAttributeValues: {
				[':quoteBase']: { S: 'ETH|USD' }
			}
		};
		let data: DynamoDB.QueryOutput = {};
		try {
			data = await dynamoUtil.queryData(params);
		} catch (error) {
			if (error.message.includes('Signature not yet current')) {
				return [-102, -103]
			}
		}
		let boundaries = [0, 0];
		if (data.Count) {
			(data.Items as any).forEach((item: any) => {
				if (item.date.S === moment().format('YYYY-MM-DD'))
					boundaries = [Number(item.ub.S), Number(item.lb.S)];
			});
		}
		return boundaries;
	}
	//public async getStakings(account: string) {}
}

const warrantUtil = new WarrantUtil();
export default warrantUtil;
