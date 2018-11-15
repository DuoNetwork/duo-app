import * as React from 'react';
import * as CST from 'ts/common/constants';
import { ColorStyles } from 'ts/common/styles';
import { getBeethovenWrapperByTenor } from 'ts/common/wrappers';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardTitle, SInput } from './_styled';

interface IProps {
	tenor: string;
}

interface IState {
	input: string;
	output: any;
}
export default class DecodeCard extends React.Component<IProps, IState> {
	constructor(props: IProps) {
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
			output: JSON.stringify(
				getBeethovenWrapperByTenor(this.props.tenor).decode(input),
				null,
				4
			)
		});
	};

	public render() {
		// const {output} = this.state;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_DECODE.toUpperCase()}</SCardTitle>}
				width="1000px"
				margin="0 0 0 0"
				inlinetype="table"
			>
				<SDivFlexCenter horizontal width="100%" padding="0">
					<SInput onChange={e => this.handleChange(e.target.value)} width="760px" />
					<button className="form-button" onClick={this.handleClick}>
						{CST.TH_DECODE}
					</button>
				</SDivFlexCenter>
				<pre style={{ color: ColorStyles.TextWhiteAlpha }}>{this.state.output}</pre>
			</SCard>
		);
	}
}
