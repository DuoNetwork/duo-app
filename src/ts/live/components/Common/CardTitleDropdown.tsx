//import * as d3 from 'd3';
//import moment from 'moment';
import { Dropdown, Icon } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import { SDivFlexCenter } from '../_styled';
import { SCardTitle } from '../Cards/_styled';
import { SItem, SMenu } from './_styled';

interface IProps {
	name: string;
	keys: string[];
	handlePickSource: (key: string) => void;
}

interface IState {
	visible: boolean;
}

export default class CardDropdown extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			visible: false
		};
	}

	private handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};

	public render() {
		const { keys, handlePickSource } = this.props;
		const { visible } = this.state;
		const menu = (
			<SMenu multiple selectedKeys={keys} onClick={input => handlePickSource(input.key)}>
				{CST.EXCHANGES.map(src => (
					<SItem key={src}>
						<div className='picker-box'>{keys.includes(src) ? <Icon className='check-icon' type="check" /> : null}</div>
						{src}
					</SItem>
				))}
			</SMenu>
		);
		return (
			<SCardTitle>
				<SDivFlexCenter horizontal noJust>
					<div>{this.props.name}</div>
					<Dropdown
						overlay={menu}
						onVisibleChange={this.handleVisibleChange}
						visible={visible}
					>
						<div className="card-source-button">
							Source <Icon type="down" />
						</div>
					</Dropdown>
				</SDivFlexCenter>
			</SCardTitle>
		);
	}
}
