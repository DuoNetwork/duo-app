import * as React from 'react';
import * as CST from 'ts/common/constants';
import { getDualClassWrapperByTypeTenor } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SInput } from '../Cards/_styled';

interface IProps {
	custodianType: string;
	tenor: string;
	account: string;
	type: string;
	disabled?: boolean;
	index?: number;
	validateInput: (input: string) => string;
}

interface IState {
	value: string;
	valueError: string;
	value1: string;
	value1Error: string;
}

export default class AdminInputButton extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			value: '',
			valueError: '',
			value1: '',
			value1Error: ''
		};
	}

	private handleChange = (value: string, index: number = 0) => {
		if (index)
			this.setState({
				value1: value,
				value1Error: this.props.validateInput(value)
			});
		else
			this.setState({
				value: value,
				valueError: this.props.validateInput(value)
			});
	};

	private handleClick = () => {
		const {account,  type, tenor, custodianType } = this.props;
		const index =
			this.props.index === null || this.props.index === undefined ? -1 : this.props.index;
		const { value, valueError, value1Error } = this.state;
		if (valueError || value1Error) return;

		const dualClassWrapper = getDualClassWrapperByTypeTenor(custodianType, tenor);

		switch (type) {
			case CST.TH_COLLECT_FEE:
				dualClassWrapper.collectFee(account, Number(value));
				break;
			case CST.TH_SET_VALUE:
				if (index >= 0) dualClassWrapper.setValue(account, index, Number(value));
				break;
			default:
				break;
		}

		this.setState({
			value: '',
			valueError: '',
			value1: '',
			value1Error: ''
		});
	};

	public render() {
		const { type, disabled } = this.props;
		const { value, valueError, value1, value1Error } = this.state;
		return (
			<SDivFlexCenter horizontal width="100%" padding="0">
				<SInput
					className={valueError ? 'input-error' : ''}
					value={value}
					disabled={disabled}
					onChange={e => this.handleChange(e.target.value)}
					right
				/>
				{type === CST.TH_ADD_ADDR ? (
					<SInput
						className={value1Error ? 'input-error' : ''}
						value={value1}
						disabled={disabled}
						onChange={e => this.handleChange(e.target.value, 1)}
						right
					/>
				) : null}
				<button
					className="form-button"
					disabled={
						disabled ||
						!value ||
						!!valueError ||
						!!value1Error ||
						(type === CST.TH_ADD_ADDR && !value1)
					}
					onClick={this.handleClick}
				>
					{type}
				</button>
			</SDivFlexCenter>
		);
	}
}
