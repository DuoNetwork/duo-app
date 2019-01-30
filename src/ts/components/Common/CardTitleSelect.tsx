import { Constants as WrapperConstants } from '@finbook/duo-contract-wrapper';
import { Select } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import { SCardTitle, SCardTitleSelector } from '../Cards/_styled';

const Option = Select.Option;

interface IProps {
	name: string;
	source: string;
	onSelect: (value: string) => any;
	onlySource?: boolean;
}

export default class CardTitleSelect extends React.Component<IProps> {
	public render() {
		const { onlySource, source } = this.props;
		return (
			<SCardTitle>
				<SDivFlexCenter horizontal noJust>
					<div>{this.props.name}</div>
					<SCardTitleSelector
						defaultValue={onlySource ? source : WrapperConstants.BEETHOVEN}
						style={{ width: 120, paddingTop: 1.5, marginLeft: 12 }}
						size="small"
						onSelect={(value: any) => this.props.onSelect(value + '')}
					>
						{onlySource ? null : (
							<Option value={WrapperConstants.BEETHOVEN}>
								{WrapperConstants.BEETHOVEN}
							</Option>
						)}
						{CST.API_LIST.map(src => (
							<Option key={src.toLowerCase()} value={src.toLowerCase()}>
								{src.toUpperCase()}
							</Option>
						))}
					</SCardTitleSelector>
				</SDivFlexCenter>
			</SCardTitle>
		);
	}
}
