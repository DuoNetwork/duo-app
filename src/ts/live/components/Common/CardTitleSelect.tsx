//import * as d3 from 'd3';
//import moment from 'moment';
import { Select } from 'antd';
import * as React from 'react';
import * as CST from '../../common/constants';
import { SDivFlexCenter } from '../_styled';
import { SCardTitle, SCardTitleSelector } from '../Cards/_styled';

const Option = Select.Option;

interface IProps {
	name: string;
	onSelect: (value: string) => any;
}

export default class CardTitleSelect extends React.PureComponent<IProps> {
	public render() {
		return (
			<SCardTitle>
				<SDivFlexCenter horizontal noJust>
					<div>{this.props.name}</div>
					<SCardTitleSelector
						defaultValue={CST.TH_BEETHOVEN}
						style={{ width: 120, paddingTop: 1.5, marginLeft: 12 }}
						size="small"
						onSelect={value => this.props.onSelect(value + '')}
					>
						<Option value={CST.TH_BEETHOVEN}>{CST.TH_BEETHOVEN}</Option>
						{CST.EXCHANGES.map(src => (
							<Option key={src.toLowerCase()} value={src.toLowerCase()}>
								{src}
							</Option>
						))}
					</SCardTitleSelector>
				</SDivFlexCenter>
			</SCardTitle>
		);
	}
}
