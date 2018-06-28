import * as React from 'react';
import contractUtil from '../../common/contractUtil';
import { SDivFlexCenter } from './../_styled';
import { SInput } from './_styled';

interface IState {
	input: string;
	output: any;
}
export default class DecodeCard extends React.PureComponent<{}, IState> {

	constructor(props?: any) {
		super(props);
		this.state = {
			input: '',
			output: ''
		};
	}

	private handleChange = (value: string) =>
		this.setState({
			input: value
		});

	private handleClick = () => {
		const { input } = this.state;
		this.setState({
			output: JSON.stringify(contractUtil.decode(input))
		});
		console.log(this.state.output);
	};

	public render() {
		// const {output} = this.state;
		return (
			<SDivFlexCenter horizontal width="100%" padding="0">
				<SInput onChange={e => this.handleChange(e.target.value)} />
				<button onClick={this.handleClick}>Decode</button>
				<div>{this.state.output}</div>
			</SDivFlexCenter>
		);
	}
}
