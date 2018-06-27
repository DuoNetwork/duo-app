import Web3 from 'web3';
import { Contract } from 'web3/types';
import infura from '../../../../../duo-admin/src/keys/infura.json';
import custodianAbi from '../../../../../duo-admin/src/static/Custodian.json';
import duoAbi from '../../../../../duo-admin/src/static/DUO.json';
import { IAddresses, IBalances, ICustodianPrices, ICustodianStates } from '../common/types';
import * as CST from './constants';
//import util from './util';

class ContractUtil {
	private web3: Web3;
	private duo: Contract;
	private custodian: Contract;
	private isReadOnly: boolean;
	public readonly custodianAddr: string;
	private readonly duoContractAddr: string;

	constructor() {
		if (typeof (window as any).web3 !== 'undefined') {
			this.isReadOnly = false;
			this.web3 = new Web3((window as any).web3.currentProvider);
		} else {
			this.web3 = new Web3(
				new Web3.providers.HttpProvider(
					(__KOVAN__ ? CST.PROVIDER_INFURA_KOVAN : CST.PROVIDER_INFURA_MAIN) +
						'/' +
						infura.token
				)
			);
			this.isReadOnly = true;
		}
		this.custodianAddr = __KOVAN__ ? CST.CUSTODIAN_ADDR_KOVAN : CST.CUSTODIAN_ADDR_MAIN;
		this.custodian = new this.web3.eth.Contract(custodianAbi.abi, this.custodianAddr);
		this.duoContractAddr = __KOVAN__ ? CST.DUO_CONTRACT_ADDR_KOVAN : CST.DUO_CONTRACT_ADDR_MAIN;
		this.duo = new this.web3.eth.Contract(duoAbi.abi, this.duoContractAddr);
	}

	public onWeb3AccountUpdate(onUpdate: (addr: string, network: number) => any) {
		const store = (this.web3.currentProvider as any).publicConfigStore;
		if (store)
			store.on('update', () => {
				onUpdate(
					store.getState().selectedAddress || '',
					Number(store.getState().networkVersion || '')
				);
			});
	}

	public convertCustodianState(rawState: string) {
		switch (rawState) {
			case CST.STATE_INCEPTION:
				return CST.CTD_INCEPTION;
			case CST.STATE_TRADING:
				return CST.CTD_TRADING;
			case CST.STATE_PRERESET:
				return CST.CTD_PRERESET;
			case CST.STATE_UP_RESET:
				return CST.CTD_UP_RESET;
			case CST.STATE_DOWN_RESET:
				return CST.CTD_DOWN_RESET;
			case CST.STATE_PERIOD_RESET:
				return CST.CTD_PERIOD_RESET;
			default:
				return CST.CTD_LOADING;
		}
	}

	public async getSystemStates(): Promise<ICustodianStates> {
		const [states, duoBalance] = await Promise.all([
			this.custodian.methods.getSystemStates().call(),
			this.getDuoBalance(this.custodianAddr)
		]);
		return {
			state: this.convertCustodianState(states[0].valueOf()),
			navA: this.fromWei(states[1]),
			navB: this.fromWei(states[2]),
			totalSupplyA: this.fromWei(states[3]),
			totalSupplyB: this.fromWei(states[4]),
			ethBalance: this.fromWei(states[5]),
			alpha: states[6].valueOf() / 10000,
			beta: this.fromWei(states[7]),
			feeAccumulated: this.fromWei(states[8]),
			periodCoupon: this.fromWei(states[9]),
			limitPeriodic: this.fromWei(states[10]),
			limitUpper: this.fromWei(states[11]),
			limitLower: this.fromWei(states[12]),
			commissionRate: states[13] / 10000,
			period: Number(states[14].valueOf()),
			iterationGasThreshold: Number(states[15].valueOf()),
			ethDuoFeeRatio: Number(states[16].valueOf()),
			preResetWaitingBlocks: Number(states[17].valueOf()),
			priceTol: Number(states[18].valueOf() / 10000),
			priceFeedTol: Number(states[19].valueOf() / 10000),
			priceFeedTimeTol: Number(states[20].valueOf()),
			priceUpdateCoolDown: Number(states[21].valueOf()),
			numOfPrices: Number(states[22].valueOf()),
			nextResetAddrIndex: Number(states[23].valueOf()),
			lastAdminTime: Number(states[24].valueOf()),
			adminCoolDown: Number(states[25]),
			usersLength: Number(states[26].valueOf()),
			addrPoolLength: Number(states[27].valueOf()),
			duoBalance: duoBalance
		};
	}

	public async getSystemAddresses(): Promise<IAddresses> {
		const addr: string[] = await this.custodian.methods.getSystemAddresses().call();
		const balances = await Promise.all(addr.map(a => this.getEthBalance(a)));
		return {
			operator: {
				address: addr[0],
				balance: balances[0]
			},
			feeCollector: {
				address: addr[1],
				balance: balances[1]
			},
			priceFeed1: {
				address: addr[2],
				balance: balances[2]
			},
			priceFeed2: {
				address: addr[3],
				balance: balances[3]
			},
			priceFeed3: {
				address: addr[4],
				balance: balances[4]
			},
			poolManager: {
				address: addr[5],
				balance: balances[5]
			}
		};
	}

	public async getSystemPrices(): Promise<ICustodianPrices> {
		const prices = await this.custodian.methods.getSystemPrices().call();
		const custodianPrices = [0, 1, 2, 3].map(i => ({
			address: prices[i * 3].valueOf(),
			price: this.fromWei(prices[1 + i * 3]),
			timestamp: prices[2 + i * 3].valueOf() * 1000
		}));

		return {
			first: custodianPrices[0],
			second: custodianPrices[1],
			reset: custodianPrices[2],
			last: custodianPrices[3]
		};
	}

	public async getBalances(address: string): Promise<IBalances> {
		if (!address)
			return {
				eth: 0,
				duo: 0,
				allowance: 0,
				tokenA: 0,
				tokenB: 0
			};

		const balances = await Promise.all([
			this.getEthBalance(address),
			this.getDuoBalance(address),
			this.getDuoAllowance(address),
			this.getTokenBalance(address, true),
			this.getTokenBalance(address, false)
		]);

		return {
			eth: balances[0],
			duo: balances[1],
			allowance: balances[2],
			tokenA: balances[3],
			tokenB: balances[4]
		};
	}

	public getUserAddress(index: number) {
		return this.custodian.methods.users(index).call();
	}

	public getPoolAddress(index: number) {
		return this.custodian.methods.addrPool(index).call();
	}

	public async getGasPrice(): Promise<number> {
		return await this.web3.eth.getGasPrice();
	}

	public async getCurrentAddress(): Promise<string> {
		return (await this.web3.eth.getAccounts())[0];
	}

	public getCurrentNetwork(): Promise<number> {
		return this.web3.eth.net.getId();
	}

	public async getEthBalance(address: string): Promise<number> {
		return this.fromWei(await this.web3.eth.getBalance(address));
	}

	private async getDuoBalance(address: string): Promise<number> {
		return this.fromWei(await this.duo.methods.balanceOf(address).call());
	}

	private async getDuoAllowance(address: string): Promise<number> {
		return this.fromWei(await this.duo.methods.allowance(address, this.custodianAddr).call());
	}

	private async getTokenBalance(address: string, isA: boolean): Promise<number> {
		return this.fromWei(await this.custodian.methods.balanceOf(isA ? 0 : 1, address).call());
	}

	public fromWei(value: string | number) {
		return Number(this.web3.utils.fromWei(value, 'ether'));
	}

	public toWei(value: string | number) {
		return this.web3.utils.toWei(value + '', 'ether');
	}

	public checkAddress(addr: string) {
		if (!addr.startsWith('0x') || addr.length !== 42) return false;
		return this.web3.utils.checkAddressChecksum(addr);
	}

	public create(
		address: string,
		value: number,
		payFeeInEth: boolean,
		onTxHash: (hash: string) => any
	) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		return this.custodian.methods
			.create(payFeeInEth)
			.send({
				from: address,
				value: this.toWei(value)
			})
			.on('transactionHash', onTxHash);
	}

	public redeem(
		address: string,
		amtA: number,
		amtB: number,
		payFeeInEth: boolean,
		onTxHash: (hash: string) => any
	) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		return this.custodian.methods
			.redeem(this.toWei(amtA), this.toWei(amtB), payFeeInEth)
			.send({
				from: address
			})
			.on('transactionHash', onTxHash);
	}

	public duoApprove(address: string, spender: string, value: number) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		return this.duo.methods.approve(spender, this.toWei(value)).send({
			from: address
		});
	}

	public duoTransfer(address: string, to: string, value: number) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		return this.duo.methods.transfer(to, this.toWei(value)).send({
			from: address
		});
	}

	public approve(address: string, spender: string, value: number, isA: boolean) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		return this.custodian.methods.approve(isA ? 0 : 1, spender, this.toWei(value)).send({
			from: address
		});
	}

	public transfer(address: string, to: string, value: number, isA: boolean) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');

		// dummy from address
		return this.custodian.methods.transfer(isA ? 0 : 1, address, to, this.toWei(value)).send({
			from: address
		});
	}

	public collectFee(address: string, amount: number) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');
		return this.custodian.methods.collectFee(this.toWei(amount)).send({
			from: address
		});
	}

	public setValue(address: string, index: number, newValue: number) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');
		return this.custodian.methods.setValue(index, newValue).send({
			from: address
		});
	}

	public addAddress(address: string, addr1: string, addr2: string) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');
		return this.custodian.methods.addAddress(addr1, addr2).send({
			from: address
		});
	}

	public removeAddress(address: string, addr: string) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');
		return this.custodian.methods.addAddress(addr).send({
			from: address
		});
	}

	public updateAddress(address: string, currentRole: string) {
		if (this.isReadOnly) return Promise.reject('Read Only Mode');
		return this.custodian.methods.addAddress(currentRole).send({
			from: address
		});
	}
}

const contractUtil = new ContractUtil();
export default contractUtil;
