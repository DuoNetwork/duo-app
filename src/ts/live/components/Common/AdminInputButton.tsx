import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { SDivFlexCenter } from '../_styled';
import { SInput } from '../Cards/_styled';

interface IProps {
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

export default class AdminInputButton extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			value: '',
			valueError: '',
			value1: '',
			value1Error: ''
		};
	}

	private handleChange = (value: string, index: number = 0) =>
		index
			? this.setState({
					value1: value,
					value1Error: this.props.validateInput(value)
			})
			: this.setState({
					value: value,
					valueError: this.props.validateInput(value)
			});

	private handleClick = () => {
		const { account, type } = this.props;
		const index = this.props.index || -1;
		const { value, valueError, value1, value1Error } = this.state;
		if (valueError || value1Error) return;

		switch (type) {
			case CST.TH_COLLLECT_FEE:
				return contractUtil.collectFee(account, Number(value));
			case CST.TH_SET_VALUE:
				return index >= 0 && contractUtil.setValue(account, index, Number(value));
			case CST.TH_ADD_ADDR:
				return contractUtil.addAddress(account, value, value1);
			default:
				return;
		}
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
