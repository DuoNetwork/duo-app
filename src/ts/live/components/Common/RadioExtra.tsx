//import moment from 'moment';
import { Radio } from 'antd';
import * as React from 'react';
import { SCardRadioExtraDiv, SRadioGroup } from '../Cards/_styled';

const RadioButton = Radio.Button;

interface IProps {
	text?: string;
	onChange: () => void;
	left: string,
	right: string,
	isLeft: boolean
}

export default class RadioExtra extends React.PureComponent<IProps> {
	public render() {
		const {text, onChange, left, right, isLeft } = this.props;
		return (
			<SCardRadioExtraDiv>
				<div className="extend-extra-wrapper">
					{text ? <div className="tag-title">Fee in</div> : null}
					<SRadioGroup
						defaultValue={left}
						size="small"
						onChange={onChange}
						value={isLeft ? left : right}
					>
						<RadioButton value={left}>{left}</RadioButton>
						<RadioButton value={right}>{right}</RadioButton>
					</SRadioGroup>
				</div>
			</SCardRadioExtraDiv>
		);
	}
}
