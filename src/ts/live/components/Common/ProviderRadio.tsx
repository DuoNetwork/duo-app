//import * as d3 from 'd3';
//import moment from 'moment';
import { Modal, Radio } from 'antd';
import * as React from 'react';
//import * as CST from '../../common/constants';
import contractUtil, { Wallet } from '../../common/contractUtil';
import { SRadioGroup } from '../Cards/_styled';

const RadioButton = Radio.Button;

interface IProps {
	refresh: () => any;
}

interface IState {
	value: Wallet;
	visible: boolean;
}

export default class ProviderRadio extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			value: contractUtil.wallet,
			visible: false
		};
	}

	private handleCancel = () => this.setState({ visible: false });

	private handleChange = async (value: number) => {
		if (value === Wallet.MetaMask) contractUtil.switchToMetaMask();
		else if (value === Wallet.Ledger)
			await contractUtil.switchToLedger();
		this.setState({
			value: contractUtil.wallet
		})
		this.props.refresh();
	};

	public render() {
		return (
			<div>
				<SRadioGroup
					value={this.state.value}
					size="small"
					onChange={e => this.handleChange(e.target.value)}
				>
					<RadioButton value={Wallet.MetaMask}>{'MetaMask'}</RadioButton>
					<RadioButton value={Wallet.Ledger}>{'Ledger'}</RadioButton>
				</SRadioGroup>
				<Modal
					title="Select Ledger Account"
					visible={this.state.visible}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
			</div>
		);
	}
}
