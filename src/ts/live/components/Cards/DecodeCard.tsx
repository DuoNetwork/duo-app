import * as React from 'react';
import * as CST from '../../common/constants';
import contractUtil from '../../common/contractUtil';
import { ColorStyles } from '../../common/styles';
import { SDivFlexCenter } from './../_styled';
import { SCard, SCardTitle, SInput } from './_styled';

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
			output: JSON.stringify(contractUtil.decode(input), null, 4)
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
				<SInput onChange={e => this.handleChange(e.target.value)} width='760px'/>
				<button className="form-button" onClick={this.handleClick}>
					{CST.TH_DECODE}
				</button>
			</SDivFlexCenter>
			<pre style={{color: ColorStyles.TextWhiteAlpha}}>{this.state.output}</pre>
			</SCard>
		);
	}
}
