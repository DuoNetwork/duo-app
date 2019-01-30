//import * as d3 from 'd3';
//import moment from 'moment';
import { Wallet } from '@finbook/duo-contract-wrapper';
import { Button, Radio } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { web3Wrapper } from 'ts/common/wrappers';
import { SRadioGroup } from '../Cards/_styled';
import { SModal } from './_styled';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

interface IProps {
	refresh: () => Promise<void>;
}

interface IState {
	loading: boolean;
	accounts: string[];
	value: Wallet;
	visible: boolean;
	msg: string;
	accountIndex: number;
	showTip: boolean;
}

export default class ProviderRadio extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			loading: false,
			accounts: [],
			value: web3Wrapper.wallet,
			visible: false,
			msg: 'Please make sure Ledger is connected.',
			accountIndex: 0,
			showTip: true
		};
	}

	private handleCancel = () =>
		this.setState({
			loading: false,
			accounts: [],
			visible: false,
			msg: 'Please make sure Ledger is connected.',
			accountIndex: 0,
			showTip: true
		});

	private handleChange = (value: number) => {
		if (value === Wallet.MetaMask) {
			web3Wrapper.switchToMetaMask(window);
			this.setState({
				value: web3Wrapper.wallet
			});
			this.props.refresh();
		} else if (value === Wallet.Ledger) this.setState({ visible: true });
	};

	private handleConnect = () => {
		this.setState({ msg: 'Connecting to Leger', loading: true });
		const timer = setTimeout(() => {
			this.setState({ msg: 'Failed to connect.', loading: false });
		}, 15000);
		web3Wrapper.switchToLedger().then(accounts => {
			clearTimeout(timer);
			this.setState({
				msg: 'Select an account',
				accounts: accounts,
				loading: false,
				showTip: false
			});
		});
	};

	private handleSelect = (index: number) => this.setState({ accountIndex: index });

	private handleSubmit = async () => {
		this.setState({
			loading: true,
			value: web3Wrapper.wallet
		});
		web3Wrapper.accountIndex = this.state.accountIndex;
		await this.props.refresh();
		this.handleCancel();
	};

	public render() {
		const { accounts, loading, visible, value, msg, accountIndex, showTip } = this.state;
		return (
			<div>
				<SRadioGroup
					value={value}
					size="small"
					onChange={(e: any) => this.handleChange(e.target.value)}
				>
					<RadioButton value={Wallet.MetaMask}>{'MetaMask'}</RadioButton>
					<RadioButton value={Wallet.Ledger}>{'Ledger'}</RadioButton>
				</SRadioGroup>
				<SModal
					title="LEDGER ACCOUNT MANAGE"
					visible={visible}
					maskClosable={false}
					onCancel={this.handleCancel}
					footer={[
						<Button
							key="submit"
							type="ghost"
							loading={loading}
							onClick={accounts.length ? this.handleSubmit : this.handleConnect}
						>
							{accounts.length ? CST.TH_SUBMIT.EN : CST.TH_CONNECT}
						</Button>
					]}
				>
					{msg ? msg : null}
					<br />
					{showTip ? (
						<p className="ledger-reminder">
							<b>Contract data</b> and <b>Browser support</b> must be set to{' '}
							<b>Yes</b>
						</p>
					) : null}
					{accounts.length ? (
						<RadioGroup
							className="ledger-account-selector"
							onChange={e => this.handleSelect(e.target.value)}
							value={accountIndex}
						>
							{accounts.map((a, i) => (
								<Radio key={i} value={i}>
									{a}
								</Radio>
							))}
						</RadioGroup>
					) : null}
				</SModal>
			</div>
		);
	}
}
