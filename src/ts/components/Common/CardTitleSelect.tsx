import { Constants as DataConstants } from '@finbook/duo-market-data';
import { Select } from 'antd';
import * as React from 'react';
import { SDivFlexCenter } from '../_styled';
import { SCardTitle, SCardTitleSelector } from '../Cards/_styled';

const Option = Select.Option;

interface IProps {
	name: string;
	source: string;
	custodian: string;
	onSelect: (value: string) => any;
	onlySource?: boolean;
}

export default class CardTitleSelect extends React.Component<IProps> {
	public render() {
		const { onlySource, source, custodian } = this.props;
		return (
			<SCardTitle>
				<SDivFlexCenter horizontal noJust>
					<div>{this.props.name}</div>
					<SCardTitleSelector
						defaultValue={onlySource ? source : custodian}
						style={{ width: 120, marginLeft: 12 }}
						size="small"
						onSelect={(value: any) => this.props.onSelect(value + '')}
					>
						{onlySource ? null : <Option value={custodian}>{custodian}</Option>}
						{[
							DataConstants.API_KRAKEN,
							DataConstants.API_GEMINI,
							DataConstants.API_GDAX,
							DataConstants.API_BITSTAMP
						].map(src => (
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
