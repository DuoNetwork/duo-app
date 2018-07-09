//import * as d3 from 'd3';
//import moment from 'moment';
import { Button, Radio } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil, { Wallet } from '../../common/contractUtil';
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
			value: contractUtil.wallet,
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
			contractUtil.switchToMetaMask();
			this.setState({
				value: contractUtil.wallet
			});
			this.props.refresh();
		} else if (value === Wallet.Ledger) this.setState({ visible: true });
	};

	private handleConnect = () => {
		this.setState({ msg: 'Connecting to Leger', loading: true });
		const timer = setTimeout(() => {
			this.setState({ msg: 'Failed to connect.', loading: false });
		}, 15000);
		contractUtil.switchToLedger().then(accounts => {
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
			value: contractUtil.wallet
		});
		contractUtil.accountIndex = this.state.accountIndex;
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
					onChange={e => this.handleChange(e.target.value)}
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
							{accounts.length ? CST.TH_SUBMIT : CST.TH_CONNECT}
						</Button>
					]}
				>
					{msg ? msg : null}
					{showTip ? (
						<p className="ledger-reminder">
							<b>Contract data</b> and <b>Browswe support</b> must be set to{' '}
							<b>Yes</b>
						</p>
					) : null}
					{accounts.length ? (
						<RadioGroup
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
